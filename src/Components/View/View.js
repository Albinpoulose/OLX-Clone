import React, { useEffect, useState, useContext } from "react";
import { postContext } from "../../stores/PostContext";
import "./View.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { app as firebaseDB } from "../../Firebase/config";
import { async } from "react";

function View() {
  const [useDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(postContext);
  useEffect(async () => {
    const { userId } = postDetails;
    // console.log(userID);
    const q = query(collection(firebaseDB, "users"), where("id", "==", userId));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      setUserDetails(doc.data());
    });
  }, []);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {useDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{useDetails.username}</p>
            <p>{useDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
