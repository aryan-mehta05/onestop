import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Feed from "./Feed";
import Home from "./Home";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import { AuthProvider } from "./Auth/AuthContext";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
import Search from "./Search";
import SearchDetails from "./Search/Details"
import SearchBarResults from "./Search/SearchBarResults";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search/:query" element={<SearchBarResults />} />
          <Route path="/search" element={<Search />} />
          <Route path="/details/:airportCode" element={<SearchDetails />} />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
