import { createContext, useContext, useReducer } from "react";
import { Friend } from "../models/Friend";

type EatNSplitProps = {
  children: React.ReactNode;
};

export type EatNSplitContextType = {
  friends?: Friend[];
  selectedFriendId?: number | string | null;
  dispatch?: React.Dispatch<Actions>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const EatNSplitContext = createContext<EatNSplitContextType | undefined>(
  undefined
);

const initialState = {
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
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ],
  selectedFriendId: null,
};

type Actions =
  | { type: "addFriend"; payload: Friend }
  | { type: "selectedFriend"; payload: number | string }
  | { type: "onSplitBill"; payload: number }
  | { type: "resetSelectedFrnd" };

function reducer(
  state: { friends: Friend[]; selectedFriendId: number | string | null },
  action: Actions
) {
  switch (action.type) {
    case "addFriend":
      return { ...state, friends: [...state.friends, action.payload] };
    case "selectedFriend":
      return { ...state, selectedFriendId: action.payload };
    case "onSplitBill": {
      const updatedFrnds = state.friends.map((friend) =>
        friend.id === state.selectedFriendId
          ? { ...friend, balance: friend.balance + action.payload }
          : friend
      );
      return { ...state, friends: updatedFrnds, selectedFriendId: null };
    }
    case "resetSelectedFrnd":
      return { ...state, selectedFriendId: null };
    default:
      return state;
  }
}

function EatNSplitProvider({ children }: EatNSplitProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { friends, selectedFriendId } = state;

  return (
    <EatNSplitContext.Provider value={{ friends, dispatch, selectedFriendId }}>
      {children}
    </EatNSplitContext.Provider>
  );
}

function useEatNSplit() {
  const context = useContext(EatNSplitContext);
  if (!context) {
    throw new Error("useEatNSplit must be used within a EatNSplitProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { EatNSplitProvider, useEatNSplit };
