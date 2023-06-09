import React from "react";
import { cleanup, render } from "@testing-library/react";
import AppRegister from "./AppRegister";

afterEach(() => {
  cleanup();
});

test("renders component", () => {
  const TestFn = () => {
    return <AppRegister testID="AppRegister" />;
  };

  const { getByTestId } = render(<TestFn />);
  const content = getByTestId("AppRegister");
  expect(content).toBeDefined();
  expect(content).toBeInTheDocument();
  expect(content).toBeDefined();
  expect(content).toBeEnabled();
  expect(content).not.toBeEmptyDOMElement();
});
