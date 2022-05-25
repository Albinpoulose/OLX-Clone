import React from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { useState, useContext } from "react";
import { FirebaseContext } from "../../stores/Context";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useHistory } from "react-router-dom";
import { app as firebaseDB } from "../../Firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function Signup() {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, { displayName: userName }).then(() => {
          setError(null);
          addDoc(collection(firebaseDB, "users"), {
            id: userCredential.user.uid,
            username: userName,
            phone: phone,
          }).then((data) => {
            // console.log(data.id);
            history.push("/login");
          });
        });
      })
      .catch((error) => {
        setError(error.message);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorCode);
        // console.log(errorMessage);
      });
  };
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {error && <div className="errorMessage">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            placeholder="username"
            className="input"
            type="text"
            id="fname"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />

          <input
            placeholder="email"
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <input
            placeholder="phone"
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />

          <input
            placeholder="password"
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
