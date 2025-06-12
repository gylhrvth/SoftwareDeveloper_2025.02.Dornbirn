import { useState } from 'react'
import './App.css'

interface AnswerListProps {
    awnsers: string[];
    question?: string; // Optional, used for radio button grouping
}

export default function App() {

    const q1Awnsers = ["Paris", "London", "Berlin", "Madrid"];
    const q2Awnsers = ["Earth", "Jupiter", "Saturn", "Mars"];
    const q3Awnsers = ["H2O", "CO2", "O2", "NaCl"];

  return (
    <>
      <h1>Quiz App</h1>
        <div className="quiz-container">
            <h2>Question 1</h2>
            <p>What is the capital of France?</p>
            <ListAwnser
                awnsers={q1Awnsers}
                question="q1"
            />
            <h2>Question 2</h2>
            <p>What is the largest planet in our solar system?</p>
            <ListAwnser awnsers={q2Awnsers}
                        question="q2"
            />
            <h2>Question 3</h2>
            <p>What is the chemical symbol for water?</p>
            <ListAwnser awnsers={q3Awnsers}
                        question="q3"
            />
            <button onClick={CheckAwnsers} type="submit">Submit</button>
        </div>
    </>
  )
}

function ListAwnser({ awnsers, question }: AnswerListProps) {
  return (
    <ul>
        {awnsers.map((answer, index) => (
            <li key={index}>
            <input type="radio" name={question} value={answer} /> {answer}
            </li>
        ))}
    </ul>
  )
}

function CheckAwnsers() {
    // This function will handle the logic to check the answers


}