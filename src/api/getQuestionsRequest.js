const getQuestionsRequest = async () => {
  var url = `${window.location.protocol}//${window.location.host}/api/questions.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`fetch not ok`);
  }
  return res.json();
};
export default getQuestionsRequest;
