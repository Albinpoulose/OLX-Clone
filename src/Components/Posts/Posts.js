import React, { useContext, useState, useEffect } from "react";
import Heart from "../../assets/Heart";
import "./Post.css";
//import {FirebaseContext} from '../../stores/Context';
import { collection, getDocs } from "firebase/firestore";
import { app as firebase } from "../../Firebase/config";
import { useHistory } from "react-router-dom";
import { postContext } from "../../stores/PostContext";

function Posts() {
  //const {firebase} = useContext(FirebaseContext);
 const history= useHistory();
  const [product, setProduct] = useState([]);
  const {setPostDetails} = useContext(postContext);
  useEffect(async () => {
    const querySnapshot = await getDocs(collection(firebase, "products"));
    //  let allPost=[];

    //  allPost = querySnapshot.forEach((doc,index,arr) => {
    //     // doc.data() is never undefined for query doc snapshots
    //    //console.log(doc.id, " => ", doc.data());
    //              return doc.data()
    //   });
    const allPosts = querySnapshot.docs.map((products) => {
      return {
        ...products.data(),
        id: product.id,
      };
    });
    setProduct(allPosts);
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {

          product.map((product,key) => {
            return <div 
            key={key}
             className="card"
             onClick={()=>{
              setPostDetails(product)
              history.push('/viewpost')
              }}
             >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>;
          })
          
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
