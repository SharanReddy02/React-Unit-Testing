import { useState } from "react";
import Button from "./Button";
import { useEatNSplit } from "../context/EatNSplitContext";

function AddFriendForm() {
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const { dispatch } = useEatNSplit();

  function handleAddFriend() {
    setShowAddFriendForm((show) => !show);
    dispatch!({ type: "resetSelectedFrnd" });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    dispatch!({ type: "addFriend", payload: newFriend });
    setShowAddFriendForm(false);
  }

  return (
    <div>
      <Button onClick={handleAddFriend}>
        {!showAddFriendForm ? "Add Friend" : "Close"}
      </Button>
      {showAddFriendForm && (
        <form className="form-add-friend" role="form" onSubmit={handleSubmit}>
          <label htmlFor="name">🧑‍🤝‍🧑Friend</label>
          <input
            type="text"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="image">📸Image URL</label>
          <input
            type="text"
            value={image}
            id="image"
            onChange={(e) => setImage(e.target.value)}
          />

          <Button>Add</Button>
        </form>
      )}
    </div>
  );
}

export default AddFriendForm;
