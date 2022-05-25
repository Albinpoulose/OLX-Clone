import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "../src/Components/Signup/Signup";
import Home from "./Pages/Home";
import { Route } from "react-router-dom";
import Login from "./Pages/Login";
import { authContext } from "./stores/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import Post from "./stores/PostContext";

function App() {
  const { setUser } = useContext(authContext);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("User is Signed out");
      }
    });
  }, []);

  return (
    <div>
      <Post>
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/viewpost">
            <View />
          </Route>
        </Router>
      </Post>
    </div>
  );
}

export default App;
