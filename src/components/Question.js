import Options from "./Options";
function Question(props) {
  const { questionNo, question, selectOption, selectedOption } = props;
  return (
    <div>
      <p className="questionCounter">Question {questionNo}</p>
      <p className="question">{question.question}</p>
      <Options
        options={question.options}
        selectOption={selectOption}
        selectedOption={selectedOption}
      />
    </div>
  );
}

export default Question;
