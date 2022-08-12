import React from "react";
import { cleanup, render } from "@testing-library/react";
import AppView from "./AppView";

afterEach(() => {
  cleanup();
});

test("renders component", () => {
  const TestFn = () => {
    return <AppView testID="AppView" />;
  };

  const { getByTestId } = render(<TestFn />);
  const content = getByTestId("AppView");
  expect(content).toBeDefined();
  expect(content).toBeInTheDocument();
  expect(content).toBeDefined();
  expect(content).toBeEnabled();
  expect(content).not.toBeEmptyDOMElement();
});
