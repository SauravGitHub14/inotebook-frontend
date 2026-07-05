import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import Notes from "./components/Notes"
// import Logout from './components/Logout';
import { useState } from "react";
import { Toaster } from 'react-hot-toast'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './Context/notes/NoteState';


const App = () => {
  const [isLoggedIn] = useState(true);
  // const isLoggedIn = !!localStorage.getItem("token");
  return (
    <div className="App">
      <div>
        <Toaster />
      </div>
      <NoteState>
        <Router>
          <Navbar isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path='/home' element={<Home />}></Route>
            {/* <Route  path="/dashboard"  element={ localStorage.getItem("token")  ? <Dashboard />  : <Login />  }/> */}
            <Route  path="/dashboard"  element={ <ProtectedRoute>   <Dashboard />   </ProtectedRoute>  }/>
            <Route path="/notes" element={<ProtectedRoute>  <Notes /> </ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute>  <Profile /> </ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/signup' element={<Signup />}></Route>
            <Route path="*" element={<NotFound />} />
            {/* <Route exact path='/about' element ={<Logout/>}></Route> */}
          </Routes>
        </Router>
      </NoteState>

    </div>
  );
}

export default App;
