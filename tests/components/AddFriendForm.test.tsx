import { fireEvent, render, screen } from "../test-utils";
import userEvent from "@testing-library/user-event";

import AddFriendForm from "../../src/components/AddFriendForm";

describe("Add Friend", () => {
  const renderComponent = () => {
    render(<AddFriendForm />);
  };

  const showForm = async () => {
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("form")).toBeInTheDocument();
  };

  // 1)
  it("should render add friend form", () => {
    renderComponent();

    expect(screen.queryByRole("form")).toBeNull();

    expect(screen.getByRole("button")).toHaveTextContent(/add/i);
  });

  // 2)
  it("should show form on clicking of add", async () => {
    renderComponent();

    await showForm();

    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  // 3)
  it("should hide form on clicking toggle button twice", async () => {
    renderComponent();

    await userEvent.click(screen.getByRole("button"));

    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(screen.queryByRole("form")).toBeNull();

    expect(
      screen.queryByRole("button", { name: /close/i })
    ).not.toBeInTheDocument();
  });

  // 4)
  it("should show form on clicking of add and render form correctly", async () => {
    renderComponent();

    await showForm();

    expect(screen.getByLabelText(/friend/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image/i)).toBeInTheDocument();
  });

  // 5)
  it("should show form on clicking of add", async () => {
    renderComponent();

    await showForm();

    fireEvent.change(screen.getByLabelText(/friend/i), {
      target: { value: "Sharan" },
    });
    fireEvent.change(screen.getByLabelText(/image/i), {
      target: { value: "Sharan/img" },
    });

    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
