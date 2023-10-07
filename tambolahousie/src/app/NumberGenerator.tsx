"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

export default function NumberGenerator() {
  //   const [numbers, setNumbers] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [generatedNumber, setGeneratedNumber] = useState<number | null>(null);

  const numbers = Array.from({ length: 90 }, (_, index) => index + 1);

  // Load selected numbers from local storage on component mount
  useEffect(() => {
    const storedNumbers = localStorage.getItem("selectedNumbers");
    if (storedNumbers) {
      const parsedNumbers = JSON.parse(storedNumbers);
      setSelectedNumbers(parsedNumbers);
    }
    console.log("WORKINGG");
  }, []);

  // Generate random number and update selectedNumbers
  const generateNumber = () => {
    console.log("cllicked");
    const availableNumbers = numbers.filter(
      (num) => !selectedNumbers.includes(num)
    );
    if (availableNumbers.length === 0) {
      alert("All numbers have been selected!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const selectedNumber = availableNumbers[randomIndex];

    const updatedSelectedNumbers = [...selectedNumbers, selectedNumber];
    setSelectedNumbers(updatedSelectedNumbers);
    setGeneratedNumber(selectedNumber);

    // Store selectedNumbers in local storage
    localStorage.setItem(
      "selectedNumbers",
      JSON.stringify(updatedSelectedNumbers)
    );
    console.log(updatedSelectedNumbers, "updatedSelectedNumbers");
  };

  // Call the function to generate and store the random number

  // Create an array of numbers from 1 to 90

  // Reset selected numbers and local storage
  const resetNumbers = () => {
    setSelectedNumbers([]);
    localStorage.removeItem("selectedNumbers");
    setGeneratedNumber(null);
  };

  return (
    <div>
      <div
        className="mb-[-5rem]"
        style={{ marginLeft: "70px", marginTop: "20px" }}
      >
        <div
          onClick={resetNumbers}
          className="h-10 w-36 bg-slate-900  text-white items-center flex cursor-pointer rounded-lg hover:bg-slate-600"
          style={{ padding: "10px" }}
        >
          <div className="ml-6 ">New Game</div>
        </div>
        <div
          onClick={generateNumber}
          className="h-10 w-36 bg-slate-900 text-white mt-4 items-center flex cursor-pointer rounded-lg hover:bg-slate-600"
        >
          <div className="ml-2 ">Generate Number</div>
        </div>
      </div>
      <div className="flex flex-row  flex-wrap ml-96 mr-2 mt-[-6rem]">
        {numbers.map((number) => (
          <div
            key={uuid()} // Use a unique key for each number element
            style={{
              backgroundColor:
                generatedNumber === number
                  ? "blue" // Color for the generated number
                  : selectedNumbers.includes(number)
                  ? "green" // Color for selected numbers
                  : "white", // Default color
            }}
            className="border-x-2 border-y-2 w-20 h-20 items-center flex justify-center mx-5 my-1 p-5"
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
}
