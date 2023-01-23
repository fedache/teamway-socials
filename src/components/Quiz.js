import getQuestionsRequest from "../api/getQuestionsRequest";
import { useState } from "react";
import Question from "./Question";
import QuizResults from "./QuizResults";
import { useQuery } from "react-query";

function Quiz() {
  const { isLoading, error, data } = useQuery("questions", getQuestionsRequest);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [optionChoosen, setOptionChoosen] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error...{error.message}</p>;
  }
  const question = data[questionIndex];

  const nextQuestion = (e) => {
    if (optionChoosen[questionIndex] === undefined) {
      return;
    }
    if (hasNextQuestion()) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const prevQuestion = (e) => {
    if (hasPrevQuestion()) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  function chooseIndex(index) {
    let updatedValue = {};
    updatedValue[questionIndex] = index;
    setOptionChoosen((choosen) => ({
      ...choosen,
      ...updatedValue,
    }));
  }

  function hasPrevQuestion() {
    return questionIndex - 1 >= 0;
  }

  function hasNextQuestion() {
    return questionIndex + 1 < data.length;
  }

  function showFinishTest() {
    return questionIndex + 1 === data.length;
  }

  function finishTest() {
    if (optionChoosen[questionIndex] === undefined) {
      return;
    }
    setShowResults(true);
  }

  function resetQuiz() {
    setShowResults(false);
    setQuestionIndex(0);
    setOptionChoosen({});
  }

  return (
    <div>
      {showResults && (
        <QuizResults
          questions={data}
          choosenOptions={optionChoosen}
          retakeQuestion={() => resetQuiz()}
        />
      )}

      {!showResults && (
        <div className="questionContainer">
          <img
            alt="hero"
            src="https://www.psychologies.co.uk/wp-content/uploads/sites/3/2018/05/introvert_or_extrovert-1-scaled.jpg?w=1080"
            className="heroImage"
          />
          <Question
            questionNo={`${questionIndex + 1}/${data.length}`}
            question={question}
            selectOption={(index) => chooseIndex(index)}
            selectedOption={optionChoosen[questionIndex]}
          />
          <div className="navContainer">
            <button
              className={`navQuestion ${hasPrevQuestion() ? "show" : "hide"}`}
              onClick={(e) => prevQuestion()}
            >
              Previous Question
            </button>
            <button
              className={`navQuestion ${hasNextQuestion() ? "show" : "hide"}`}
              onClick={(e) => nextQuestion()}
            >
              Next Question
            </button>
            <button
              className={`navQuestion ${showFinishTest() ? "show" : "hide"}`}
              onClick={(e) => finishTest()}
            >
              Finish Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
