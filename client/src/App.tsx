import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/index";
import SignIn from './SignIn/index';
import SignUp from './SignUp/index';
import SignOut from './SignOut';
import Search from './Search/index';
import Profile from './Profile/index';
import SearchDetails from './Search/Details/index';
import SearchBarResults from './Search/SearchBarResults/index';
import { Provider } from 'react-redux';
import store from './store';
import CreatePost from './CreatePost/index';
import ProtectedRoute from './SignIn/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin/" element={<SignIn />} />
          <Route path="/signup/" element={<SignUp />} />
          <Route path="/signout/" element={<SignOut />} />
          <Route path="/search/:query" element={<ProtectedRoute><SearchBarResults /></ProtectedRoute>} />
          <Route path="/search/" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/details/:airportCode" element={<SearchDetails />} />
          <Route path="/profile/" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/createPost/" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        </Routes>
      </Router>
    </Provider>

  );
}

export default App;
