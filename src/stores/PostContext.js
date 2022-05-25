import react,{createContext,useState} from "react";
//import {  } from "react/cjs/react.production.min";


export const postContext = createContext(null);


function Post({children}){
   const [postDetails,setPostDetails] = useState();

    return(
        <postContext.Provider value={{postDetails,setPostDetails}}>
            {children}
        </postContext.Provider>
    )
}

export default Post;