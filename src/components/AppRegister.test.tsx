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

  const contentForm = getByTestId("AppRegisterForm");
  expect(contentForm).toBeDefined();
  expect(contentForm).toBeInTheDocument();
  expect(contentForm).toBeDefined();
  expect(contentForm).toBeEnabled();
  expect(contentForm).not.toBeEmptyDOMElement();

  const contentCountry = getByTestId("AppRegistercountry");
  expect(contentCountry).toBeDefined();
  expect(contentCountry).toBeInTheDocument();
  expect(contentCountry).toBeDefined();
  expect(contentCountry).toBeEnabled();
  expect(contentCountry).not.toBeEmptyDOMElement();
});
