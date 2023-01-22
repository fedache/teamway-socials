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
        <h1>Are you an introvert or an extrovert?</h1>
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
    const nextIndex = questionIndex + 1;
    if (nextIndex < data.length) {
      setQuestionIndex(nextIndex);
    }
  };

  const prevQuestion = (e) => {
    const prevIndex = questionIndex - 1;
    if (prevIndex >= 0) {
      setQuestionIndex(prevIndex);
    }
  };

  function chooseIndex(index) {
    optionChoosen[questionIndex] = index;
    setOptionChoosen(optionChoosen);
  }

  return (
    <div>
      <h4>
        Question {questionIndex + 1} / {data.length}
      </h4>
      <img alt="hero" src="https://www.psychologies.co.uk/wp-content/uploads/sites/3/2018/05/introvert_or_extrovert-1-scaled.jpg?w=1080" className="heroImage"/>
      <p>{question.question}</p>
      <Options
        options={question.options}
        selectOption={(index) => chooseIndex(index)}
      />
      <button onClick={(e) => prevQuestion()}>Previous Question</button>
      <button onClick={(e) => nextQuestion()}>Next Question</button>
    </div>
  );
}

export default App;
