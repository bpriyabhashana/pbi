import React, { useState, useRef } from "react";
import IntroPage from "./IntroPage";
import ConsentPage from "./ConsentPage";
import DemographicPage from "./DemographicPage";
import QuestionPage from "./QuestionPage";
import ResultPage from "./ResultPage";
import questions from "../../data/questions";
import { incrementCompletionCount } from "../../utils/completionCounter";

function AssessmentApp() {
  const [currentStep, setCurrentStep] = useState("intro"); // "intro", "consent", "demographic", "question", "result"
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // store Likert scale responses as object
  const [demographicData, setDemographicData] = useState({}); // store demographic information
  const [cameFromDemographic, setCameFromDemographic] = useState(false); // track if user went through demographic flow
  const [demographicStep, setDemographicStep] = useState(0); // track current demographic step
  const hasIncrementedCount = useRef(false); // Prevent multiple increments per session

  // When user clicks "Start Assessment" on intro page
  const handleStart = () => {
    setCurrentStep("consent");
  };

  // When user chooses to share demographics
  const handleSkipToDemographic = () => {
    setCurrentStep("demographic");
  };

  // When user chooses to skip to assessment
  const handleSkipToAssessment = () => {
    setCameFromDemographic(false);
    setCurrentStep("question");
  };

  // When user declines and goes back to intro
  const handleConsentDecline = () => {
    setCurrentStep("intro");
  };

  // When user completes demographic form
  const handleDemographicNext = (data) => {
    setDemographicData(data);
    setCameFromDemographic(true);
    setCurrentStep("question");
  };

  // When user goes back from demographic page
  const handleDemographicBack = () => {
    if (cameFromDemographic && demographicStep === 5) {
      // If we're on family status step and came from first question, go back to questions
      setCurrentStep("question");
    } else {
      // Otherwise go back to consent
      setCurrentStep("consent");
    }
  };

  // When user answers a question and clicks "Next"
  const handleNext = (answer) => {
    const questionNumber = currentQuestionIndex + 1;
    setAnswers(prev => ({ ...prev, [questionNumber]: answer }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Assessment completed - increment counter and go to results
      setCurrentStep("result");
      
      // Increment completion count only once per session
      if (!hasIncrementedCount.current) {
        incrementCompletionCount();
        hasIncrementedCount.current = true;
      }
    }
  };

  // When user clicks "Back"
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (cameFromDemographic) {
      // If on first question and came from demographic, go back to family status step (step 5)
      setDemographicStep(5);
      setCurrentStep("demographic");
    } else {
      // If on first question and skipped demographic, go back to consent page
      setCurrentStep("consent");
    }
  };

  // When user clicks on a specific question number
  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestionIndex(questionNumber - 1);
  };

  // Handle answer submission (compatible with QuestionPage)
  const handleAnswer = (answer) => {
    handleNext(answer);
  };

  return (
    <div>
      {currentStep === "intro" && (
        <IntroPage onStart={handleStart} />
      )}
      {currentStep === "consent" && (
        <ConsentPage 
          onSkipToDemographic={handleSkipToDemographic}
          onSkipToAssessment={handleSkipToAssessment}
          onDecline={handleConsentDecline} 
        />
      )}
      {currentStep === "demographic" && (
        <DemographicPage 
          onNext={handleDemographicNext}
          onBack={handleDemographicBack}
          initialStep={demographicStep}
          initialData={demographicData}
        />
      )}
      {currentStep === "question" && (
        <QuestionPage 
          question={questions[currentQuestionIndex]} 
          questionNumber={currentQuestionIndex + 1}
          total={questions.length}
          onNext={handleAnswer}
          onBack={handleBack}
          onQuestionSelect={handleQuestionSelect}
          answers={answers}
          questionCategory={questions[currentQuestionIndex]?.category}
          cameFromDemographic={cameFromDemographic}
        />
      )}
      {currentStep === "result" && (
        <ResultPage answers={answers} questions={questions} demographicData={demographicData} />
      )}
    </div>
  );
}

export default AssessmentApp;