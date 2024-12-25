import React, { useContext, useState } from 'react'
import './sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Context } from '../context/context';


const Sidebar1 = () => {
  const[state,setState]=useState(false);
  const {onSent,prevPrompts,setRecentPrompt,newChat}=useContext(Context)

  const loadPrompt=async (prompt)=>{
    setRecentPrompt(prompt)
    onSent(prompt)
  }

  // Toggles the state (collapse/expand the menu)

  const menuList=()=>{
    setState(prevstate=>!prevstate)
  };
// here we are created one function that is menuList for collapsing menu icon..initially state value is false..
// so if we click menu icon it will expand..again if we click then it will closse so thats why we mentioned in function
//  that is if value is a referance variable..initially value=false(that means menu function in collapse mode)
// so if we click then it will expand means value =true..again we click value is false means it will collapse mode
// value=>!value..

  return (
   <div className="sidebar">
    <div className="top">
    <i className="bi bi-list" onClick={menuList}></i>

    <div className="new-chat" onClick={()=>newChat()}>
    <i className="bi bi-plus"></i> 
   {/* Only show New Chat text if state is true */}

    {
     state?<p>New Chat</p>:null     //(ternanry condition) here intitially state value id false..so here null will be shown.. means nothing will shown
    }            
    </div>

{/* recent also 1st not visisble if we do any opeartions then only its visible,,thats y we writed this entite condition in 
ternary condtion..initially state value is null..so thats y it wont display anything
condition?expr1:expr2;
here condition is state=null, so 
null ? exprsn1:null */}

     {/* Conditionally render Recent section */}
 
    {
      state ?
      <div className="recent">
      <div className="recent-title">Recent</div>
      {
        prevPrompts.map((item,index)=>{
          return(
            <div className="recent-entry" onClick={()=>loadPrompt(item)}>
            <i className="bi bi-chat"></i>
              <p>{item}</p>
            </div>
        
          ) })}

    </div>:null
    }
    </div>



    <div className="bottom">
        {/* Render Help, History, and Settings only when state is true */}

      <div className="bottom-item recent-entry">
      <i className="bi bi-question-circle"></i>

      { state ? <p>Help</p> : null }
      </div>

      <div className="bottom-item recent-entry">
      <i className="bi bi-clock-history"></i>

      { state ? <p>History</p> : null }
      </div>

      <div className="bottom-item recent-entry">
      <i className="bi bi-gear"></i>
      {
        state ? <p>Settings</p> : null

      }
      </div>

    </div>
   </div>
  );
};

export default Sidebar1
