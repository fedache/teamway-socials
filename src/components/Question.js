function Options(props) {
  let { options, selectOption } = props;
  return (
    <select
      size="4"
      onChange={(e) => selectOption(e.target.value)}>
      {options.map((option, index) => (
        <option value={index} key={index}>
          {option.text}
        </option>
      ))}
    </select>
  );
}
export default Options;
