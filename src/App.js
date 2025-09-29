// src/App.jsx
import React, { useState } from "react";
import IntroPage from "./components/IntroPage";
import QuestionPage from "./components/QuestionPage";
import ResultPage from "./components/ResultPage";
import questions from "./data/questions";
import "./index.css"; // Your global styles


function App() {
  const [currentStep, setCurrentStep] = useState("intro"); // "intro", "question", "result"
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // store Likert scale responses as object

  // When user clicks "Start Test"
  const handleStart = () => {
    setCurrentStep("question");
  };

  // When user answers a question and clicks "Next"
  const handleNext = (answer) => {
    const questionNumber = currentQuestionIndex + 1;
    setAnswers(prev => ({ ...prev, [questionNumber]: answer }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStep("result");
    }
  };

  // When user clicks "Back"
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // When user clicks on a specific question number
  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestionIndex(questionNumber - 1);
  };



  return (
    <div className="App">
      {currentStep === "intro" && <IntroPage onStart={handleStart} />}
      {currentStep === "question" && (
        <QuestionPage
          question={questions[currentQuestionIndex].question}
          questionNumber={currentQuestionIndex + 1}
          total={questions.length}
          onNext={handleNext}
          onBack={handleBack}
          onQuestionSelect={handleQuestionSelect}
          answers={answers}
          questionCategory={questions[currentQuestionIndex].category}
        />
      )}
      {currentStep === "result" && <ResultPage answers={answers} questions={questions} />}
    </div>
  );
}

export default App;
