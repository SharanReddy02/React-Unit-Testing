import { useState } from "react";
import Button from "./Button";
import { useEatNSplit } from "../context/EatNSplitContext";

function SplitBillForm() {
  const { friends, selectedFriendId, dispatch } = useEatNSplit();
  const selectedFriend = friends?.find(
    (friend) => friend.id === selectedFriendId
  );

  const [bill, setBill] = useState<number | string>("");
  const [paidByUser, setPaidByUser] = useState<number | string>("");
  const paidByFrnd =
    typeof bill === "number" && typeof paidByUser === "number"
      ? bill - paidByUser
      : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    dispatch!({
      type: "onSplitBill",
      payload:
        whoIsPaying === "user" ? Number(paidByFrnd) : Number(-paidByUser),
    });

    setBill("");
    setPaidByUser("");
    setWhoIsPaying("user");
  }

  if (!selectedFriend) return null;

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend?.name}</h2>

      <label>💰Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🕴️Your Expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > (typeof bill === "number" ? bill : 0)
              ? paidByUser
              : Number(e.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑{selectedFriend?.name}'s Expense</label>
      <input type="text" disabled value={paidByFrnd} />

      <label>🤑Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend?.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}

export default SplitBillForm;
