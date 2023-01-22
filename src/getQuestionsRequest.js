const getQuestionsRequest = async () => {
  var url = `${window.location.protocol}//${window.location.host}/api/questions.json`;
  const res = await fetch(url);
  return res.json();
};
export default getQuestionsRequest;
