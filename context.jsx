import { createContext, useState } from "react";
import run from "../apiconfig/geminiapi";
// create context
export const Context=createContext();

const ContextProvider=(props)=>{
    const [input,setInput]=useState(""); // store input data
    const [recentPrompt,setRecentPrompt]=useState(""); // store recent prompt
    const [prevPrompts,setPrevPrompts]=useState([]);  // store prev prompts
    const [showResult, setShowResult] = useState(false); // Store whether to show the result    
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState(""); // store result data from the API 


    // creating a function
    const delayPara=(index,nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }

      // Function to handle sending prompt to the API
    const onSent=async (prompt)=>{

        setResultData("");          // clear previous result data
        setLoading(true);           //Set loading state to true
        setShowResult(true);        // show result

        let response;
        if(prompt !== undefined)
        {   
            response=await run(prompt);
            setRecentPrompt(prompt);
        }
        else{    
            setPrevPrompts(prev=>[...prev,input])  // whenver we call above 4 functions that input will be store here
            setRecentPrompt(input)
            response = await run(input);             // assuming run returns data

        }

        try{
       let responseArray=response.split("**");       // it store response data
       let newResponse='';                             // Initialize newResponse to an empty string


       for(let i=0;i<responseArray.length;i++)
       {
        if(i===0 ||  i%2  !==1)
        {
            newResponse+=responseArray[i];  // append normal text
        }
    
        else{
            newResponse+="<b>"+responseArray[i] +"</b>";
        }
       }

       let newResponse2=newResponse.split("*").join("</br>")
       let newResponseArray=newResponse2.split(" ");

       for(let i=0;i<newResponseArray.length;i++)
       { 
         const nextWord=newResponseArray[i];
         delayPara(i,nextWord + " ")  // conact with space character

       }

     }      catch(error)
     {
        console.error("error fetching data:",error);
        setResultData("error fetching result"); // handle any errors
     } 
     finally{                
       setLoading(false) ;    //Set loading state to false after getting the response
       setInput("");         // resetting input field

    }
};

    // Context value to be shared across components


    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        newChat,
    };

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};
export default ContextProvider;












// import { createContext, useState, useEffect } from "react";
// import run from "../apiconfig/geminiapi";

// // Creating the Context
// export const Context = createContext();

// // Creating the ContextProvider component
// const ContextProvider = (props) => {
//   const [contextData, setContextData] = useState(null); // Storing API response

//   // Function to handle sending the prompt to the API
//   const onSent = async (prompt) => {
//     try {
//       const response = await run(prompt); // Assuming `run` returns a promise with data
//       setContextData(response); // Update context data
//     } catch (error) {
//       console.error("Error sending prompt:", error); // Handle any errors from the API call
//     }
//   };

//   // UseEffect to call onSent once when the component mounts
//   useEffect(() => {
//     onSent("what is react js"); // Initial prompt to be sent when the component mounts
//   }, []); // Empty dependency array ensures this runs only once when the component mounts

//   // Context value to provide to the rest of the app
//   const contextValue = {
//     contextData,
//     onSent, // Allow other components to send prompts
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children} {/* Render children components */}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;
