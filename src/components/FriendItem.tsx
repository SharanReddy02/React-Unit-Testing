import { useEatNSplit } from "../context/EatNSplitContext";
import { Friend } from "../models/Friend";
import Button from "./Button";

type FriendItemProps = {
  friend: Friend;
};

function FriendItem({ friend }: FriendItemProps) {
  const { dispatch, selectedFriendId } = useEatNSplit();
  const isSelected = friend.id === selectedFriendId;

  return (
    <li className={`${isSelected ? "selected" : ""}`}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} $ {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button
        onClick={() =>
          dispatch!({ type: "selectedFriend", payload: friend.id })
        }
      >
        Select
      </Button>
    </li>
  );
}

export default FriendItem;
