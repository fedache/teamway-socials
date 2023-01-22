import "./App.css";
import getQuestionsRequest from "./getQuestionsRequest";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Are you an introvert or an extrovert?</h1>
        <div>
          <h4>Question</h4>
        </div>
        <Questions />
      </div>
    </QueryClientProvider>
  );
}

function Questions() {
  const { data, error, isLoading } = useQuery(
    "getQuestions",
    getQuestionsRequest
  );
  if (isLoading) {
    console.log("Loading...");
  }
  if (error) {
    console.log(error);
  }
  console.log(data);
}

export default App;
