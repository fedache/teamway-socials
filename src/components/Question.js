function Options(props) {
  let { options, selectOption, selectedOption } = props;
  console.log(selectedOption)
  return (
    <div className="qOptions">
      {options.map((option, index) => (
        <button
          onClick={(e) => selectOption(e.target.dataset.value)}
          data-value={index}
          key={index}
          className={`qOption ${(selectedOption == index) ? "active" : ""}`}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}
export default Options;
