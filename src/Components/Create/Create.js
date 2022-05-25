import React, { Fragment, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import {  getStorage,ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { app as firebaseDB } from "../../Firebase/config";
import { useContext } from "react";
import { authContext } from "../../stores/Context";
import { collection, addDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";

const Create = () => {
  const {user} = useContext(authContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [categry, setCategry] = useState("");
  const [price, setprice] = useState("");
  const [img, setImg] = useState(false);
  const handleClick = () => {
    const storage = getStorage();
    const storageRef = ref(storage, `/images/${img.name}`);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, img).then((snapshot) => {
     // console.log(snapshot);
     getDownloadURL(snapshot.ref).then((downloadURL) => {
    //  console.log('File available at', downloadURL);
    addDoc(collection(firebaseDB, "products"), {
      name:name,
      category:categry,
      price:price,
      url:downloadURL,
      userId:user.uid,
      createdAt:new Date().toDateString()
    });
    history.push('/home');
    });
    })
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="categry">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="categry"
            name="category"
            value={categry}
            onChange={(e) => setCategry(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="Price"
            type="number"
            id="Price"
            name="Price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />

          <br />

          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={img ? URL.createObjectURL(img) : ""}
          ></img>

          <br />
          <input type="file" onChange={(e) => setImg(e.target.files[0])} />
          <br />
          <button className="uploadBtn" onClick={handleClick}>
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
