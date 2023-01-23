import { useState } from "react";
import Question from "./Question";

function QuizResults(props) {
  const { questions, choosenOptions, retakeQuestion } = props;
  let [showAnswers, setShowAnswers] = useState(false);
  let explanations = [];
  let introvertCount = 0;

  // reduce options choosen to trait
  for (let i = 0; i < questions.length; i++) {
    let question = questions[i];
    let optionIndex = choosenOptions[i];
    console.log(question.options[optionIndex]);
    let { explain, trait } = question.options[optionIndex];
    explanations.push(explain);
    if (trait == "introvert") {
      introvertCount++;
    }
  }

  let trait = <p>Unknown</p>;
  const halfSize = questions.length / 2;
  if (introvertCount === halfSize) {
    trait = <span>a public introvert and private extrovert</span>;
  } else if (introvertCount > halfSize) {
    trait = <span>an extrovert</span>;
  } else {
    trait = <span>an introvert</span>;
  }

  return (
    <div className="questionContainer">
      <h1 className="h1">Your Result</h1>
      <h2>You are more of {trait}</h2>
      {explanations.map((explain, index) => (
        <p key={`result-${index}`}>{explain}</p>
      ))}

      <div className="navContainer">
        <button className="navQuestion" onClick={() => retakeQuestion()}>
          Retake Question
        </button>
        <button
          className="navQuestion"
          onClick={(e) => setShowAnswers(!showAnswers)}
        >
          {showAnswers ? "Hide my answers" : "Show my answers"}
        </button>
      </div>
      {showAnswers &&
        questions.map((question, index) => {
          return (
            <div className="questionInList">
              <Question
                questionNo={`${index + 1}/${questions.length}`}
                key={`question-result-${index}`}
                question={question}
                selectOption={() => {}}
                selectedOption={choosenOptions[index]}
              />
              <hr />
            </div>
          );
        })}
    </div>
  );
}
export default QuizResults;
