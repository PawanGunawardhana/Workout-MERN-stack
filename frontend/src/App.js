import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages and components
import Home from "./pages/Home"; //importing Home page
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const { user } = useAuthContext();
  return (
    // Register Routes
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home />: <Navigate to="/login"/>} />
            <Route path="/signup" element={!user?<Signup />:<Navigate to="/"/>} />
            <Route path="/login" element={!user?<Login />:<Navigate to="/"/> } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
