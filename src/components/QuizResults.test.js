import { render, screen } from "@testing-library/react";

import QuizResults from "./QuizResults";

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

const extrovertResult = "an extrovert";
const introvertResult = "an introvert";
const mixedResult = "a public introvert and private extrovert";

test("extrovert options were choosen", async () => {
  const choosenOptions = {
    0: 1,
    1: 0,
  };
  render(
    <QuizResults
      questions={testDat1}
      choosenOptions={choosenOptions}
      retakeQuestion={() => console.log("retake")}
    />
  );
  expect(await screen.findByText(extrovertResult)).toBeInTheDocument();
});

test("introvert options were choosen", async () => {
  const choosenOptions = {
    0: 0,
    1: 1,
  };
  render(
    <QuizResults
      questions={testDat1}
      choosenOptions={choosenOptions}
      retakeQuestion={() => console.log("retake")}
    />
  );
  expect(await screen.findByText(introvertResult)).toBeInTheDocument();
});

test("mixed options were choosen", async () => {
  const choosenOptions = {
    0: 0,
    1: 0,
  };
  render(
    <QuizResults
      questions={testDat1}
      choosenOptions={choosenOptions}
      retakeQuestion={() => console.log("retake")}
    />
  );
  expect(await screen.findByText(mixedResult)).toBeInTheDocument();
});
