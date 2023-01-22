import "../css/App.css";
import getQuestionsRequest from "../api/getQuestionsRequest";
import { useState } from "react";
import Options from "./Question";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1 className="h1">Are you an introvert or an extrovert?</h1>
        <Questions />
      </div>
    </QueryClientProvider>
  );
}

function Questions() {
  const { isLoading, error, data } = useQuery("questions", getQuestionsRequest);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [optionChoosen, setOptionChoosen] = useState({});

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
    return (questionIndex + 1) === data.length
  }

  return (
    <div className="questionContainer">
      <p className="questionCounter">
        Question {questionIndex + 1}/{data.length}
      </p>
      <img
        alt="hero"
        src="https://www.psychologies.co.uk/wp-content/uploads/sites/3/2018/05/introvert_or_extrovert-1-scaled.jpg?w=1080"
        className="heroImage"
      />
      <p className="question">{question.question}</p>
      <Options
        options={question.options}
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
          onClick={(e) => nextQuestion()}>
          Next Question
        </button>
        <button
          className={`navQuestion ${showFinishTest() ? "show" : "hide"}`}
          onClick={(e) => nextQuestion()}>
          Finish Test
        </button>
      </div>
    </div>
  );
}

export default App;
