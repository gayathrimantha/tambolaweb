"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

export default function NumberGenerator() {
  //   const [numbers, setNumbers] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [generatedNumber, setGeneratedNumber] = useState<number | null>(null);

  // Load selected numbers from local storage on component mount
  useEffect(() => {
    const storedNumbers = localStorage.getItem("selectedNumbers");
    if (storedNumbers) {
      const parsedNumbers = JSON.parse(storedNumbers);
      setSelectedNumbers(parsedNumbers);
    }
  }, []);

  // Generate random number and update selectedNumbers
  const generateNumber = () => {
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
  };

  // Create an array of numbers from 1 to 90
  const numbers = Array.from({ length: 90 }, (_, index) => index + 1);

  // Reset selected numbers and local storage
  const resetNumbers = () => {
    setSelectedNumbers([]);
    localStorage.removeItem("selectedNumbers");
    setGeneratedNumber(null);
  };

  return (
    <div>
      {/* <div>
        <button onClick={generateNumber}>Generate Number</button>
        <button onClick={resetNumbers}>New Game</button>
      </div> */}
      <div className="flex flex-row w-full flex-wrap ">
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
            className="border-x-2 border-y-2 w-16 h-16 items-center flex justify-center mx-3 my-3"
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
}
