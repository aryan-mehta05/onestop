import { useAuth } from "../Auth/AuthContext";

const Feed = () => {
  const auth = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl">Welcome to the Feed, {auth.user?.username}!</h1>
      {/* Add feed content here */}
      <button
        onClick={() => auth.signOut()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Feed;
