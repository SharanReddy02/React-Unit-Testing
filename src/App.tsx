import AddFriendForm from "./components/AddFriendForm";
import FriendsList from "./components/FriendsList";
import SplitBillForm from "./components/SplitBillForm";
import { EatNSplitProvider } from "./context/EatNSplitContext";

function App() {
  return (
    <EatNSplitProvider>
      <div className="app">
        <div className="sidebar">
          <FriendsList />
          <AddFriendForm />
        </div>

        <SplitBillForm />
      </div>
    </EatNSplitProvider>
  );
}

export default App;
