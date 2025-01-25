import { render, screen, within } from "@testing-library/react";
import {
  EatNSplitContext,
  EatNSplitContextType,
} from "../../src/context/EatNSplitContext";
import FriendsList from "../../src/components/FriendsList";

const mockContextValue = {
  friends: [
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
  ],
};

const renderWithContext = (
  contextValue: EatNSplitContextType = mockContextValue
) => {
  return render(
    <EatNSplitContext.Provider value={contextValue}>
      <FriendsList />
    </EatNSplitContext.Provider>
  );
};

describe("Friends List", () => {
  // 1)
  it("should render no friends text, when friends array is empty", () => {
    const mockContextValue = { friends: [] };

    renderWithContext(mockContextValue);

    expect(screen.getByText(/no friends/i)).toBeInTheDocument();
  });

  // 2)
  it("should render friends list", () => {
    renderWithContext();

    expect(screen.getAllByRole("listitem")).toHaveLength(
      mockContextValue.friends.length
    );

    mockContextValue.friends.forEach((friend) => {
      expect(screen.getByText(friend.name)).toBeInTheDocument();
    });
  });

  // 3)
  it("should render the content inside each list correctly", () => {
    renderWithContext();

    const friendlistitems = screen.getAllByRole("listitem");

    friendlistitems.forEach((friend) => {
      expect(within(friend).getByRole("button")).toBeInTheDocument();
      expect(within(friend).getByRole("button")).toHaveTextContent(/select/i);
    });
  });
});
