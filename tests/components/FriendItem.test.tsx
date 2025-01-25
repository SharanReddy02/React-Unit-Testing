import { render, screen } from "../test-utils";
import FriendItem from "../../src/components/FriendItem";
import { Friend } from "../../src/models/Friend";

const friend: Friend = {
  id: 1,
  name: "Sharan",
  image: "https://picsum.photos/200/300",
  balance: 200,
};

describe("Friend Item", () => {
  const renderComponent = () => {
    render(<FriendItem friend={friend} />);

    return {
      heading: screen.getByRole("heading"),
      balanceText: screen.getByRole("paragraph"),
    };
  };

  // 1)
  it("should render Friend Item component", () => {
    const { heading } = renderComponent();

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(friend.name)).toBeInTheDocument();
    expect(heading).toHaveTextContent(friend.name);
  });

  // 2)
  it("should render friend item with owes you text when balance < 0", () => {
    friend.balance = -50;

    const { balanceText } = renderComponent();

    expect(balanceText).toHaveTextContent(
      `You owe ${friend.name} $ ${Math.abs(friend.balance)}`
    );
    expect(balanceText).toHaveClass("red");
  });

  // 3)
  it("should render friend item with owes you text when balance > 0", () => {
    friend.balance = 50;

    const { balanceText } = renderComponent();

    expect(balanceText).toHaveTextContent(
      `${friend.name} owes you $${Math.abs(friend.balance)}`
    );
    expect(balanceText).toHaveClass("green");
  });

  // 4)
  it("should render friend item with owes you text when balance is 0", () => {
    friend.balance = 0;

    const { balanceText } = renderComponent();

    expect(balanceText).toHaveTextContent(`You and ${friend.name} are even`);
  });
});
