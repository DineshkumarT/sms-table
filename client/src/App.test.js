import { render, screen } from "@testing-library/react";
import App from "./App";

test("check whether table rendered", () => {
  render(<App />);
  const tableElement = screen.getByRole("table");
  expect(tableElement).toBeInTheDocument();
});
