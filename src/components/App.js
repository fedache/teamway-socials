import "../css/App.css";
import Quiz from "./Quiz";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1 className="h1">Are you an introvert or an extrovert?</h1>
        <Quiz />
      </div>
    </QueryClientProvider>
  );
}

export default App;
