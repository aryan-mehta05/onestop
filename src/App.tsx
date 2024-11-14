import { HashRouter, Routes } from 'react-router-dom';
import Navigation from './Navigation/index';
import "./styles.css"

function App() {
  return (
    <HashRouter>
      <div className="wd-onestop">
        <Navigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
