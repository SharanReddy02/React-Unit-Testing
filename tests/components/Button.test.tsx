import { render, screen } from "@testing-library/react";

import Button from "../../src/components/Button";

describe("Button renders correctly", () => {
  it("should render a button with the text provided", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Click Me/i);
    expect(button).toHaveClass("button");
  });
});
