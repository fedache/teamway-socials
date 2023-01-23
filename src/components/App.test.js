import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

const testDat1 = [
  {
    question: "Q1",
    options: [
      {
        text: "Op1",
        trait: "introvert",
        explain: "Q1Explain1",
      },
      {
        text: "Op2",
        trait: "extrovert",
        explain: "Q1Explain2",
      },
    ],
  },
  {
    question: "Q2",
    options: [
      {
        text: "Op2",
        trait: "extrovert",
        explain: "Q2Explain1",
      },
      {
        text: "Op2",
        trait: "introvert",
        explain: "Q2Explain2",
      },
    ],
  },
];

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("initial question shows", async () => {
  render(<App />);
  expect(await screen.findByText(testDat1[0].question)).toBeInTheDocument();
  expect(await screen.findByText("Question 1/2")).toBeInTheDocument();
});

test("nav button", async () => {
  render(<App />);

  await screen.findByText(testDat1[0].question);
  expect(screen.queryByText("Previous Question")).toHaveClass("hide");

  // no option choosen
  userEvent.click(screen.getByText("Next Question"));
  expect(await screen.findByText("Question 1/2")).toBeInTheDocument();

  // option 1 choosen
  userEvent.click(screen.getByText("Op1"));
  userEvent.click(screen.getByText("Next Question"));
  expect(await screen.findByText("Question 2/2")).toBeInTheDocument();
  expect(screen.queryByText("Previous Question")).toHaveClass("show");
});

async function mockFetch(_) {
  return {
    ok: true,
    status: 200,
    json: async () => {
      return testDat1;
    },
  };
}
