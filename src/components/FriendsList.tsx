import { useEatNSplit } from "../context/EatNSplitContext";
import FriendItem from "./FriendItem";

function FriendsList() {
  const { friends } = useEatNSplit();

  if (friends?.length === 0)
    return <p>No friends found, start adding friends</p>;

  return (
    <ul>
      {friends?.map((friend) => (
        <FriendItem key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}

export default FriendsList;
