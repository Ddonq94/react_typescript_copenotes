import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Click to sign up for copenotes/i);
  expect(linkElement).toBeInTheDocument();
});
