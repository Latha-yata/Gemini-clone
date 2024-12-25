import React, { useContext } from 'react'
import './main.css';
import { Context } from '../context/context';
// import geminiLogo from './gemini-logo.png'; // Your path to the logo image
import { FaGem } from 'react-icons/fa'; // Gem icon (from Font Awesome)



const Main1 = () => {

  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context);

  return (
    <div className='main'>
      <div className="nav">
        <h1>Gemini</h1>
        <i className="bi bi-person fs-1"></i>
      </div>
          {/* for main container having greet text and 4 cards */}
      <div className="main-container">

      { !showResult ?
      <>
      <div className="greet">
          <p><span>Hello,Latha</span> <br />
          how can i help you today ?</p>
        </div>

        <div className="cards-container">
          <div className="card">
            <p>Suggest beautiful places to see on an upcoming road trip</p>
            <i className="bi bi-compass"></i>
          </div>

          <div className="card">
          <p>Briefly summarize this concept:urban planning</p>
          <i className="bi bi-lightbulb"></i>
            </div>

          <div className="card">
          <p>Brainstorm team bonding activities for our work retreat</p>
          <i className="bi bi-chat"></i>
            </div>

          <div className="card">
          <p>Improve the readability of following code</p>
          <i className="bi bi-code"></i>
            </div>

        </div>
      </> : <div className="result">
        <div className="result-title">
        <i className="bi bi-person-circle"></i>
          <p>{recentPrompt}</p>
        </div>

        <div className="result-data">
        <FaGem size={50} color="purple" /> {/* Gem icon */}

        {/* in below if response late it show loading icon..if response on time then it will show output */}
        {/* if loading is true it execute .loader div function otherwise p tag should excute */}
        {
          loading ? <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                   </div>:
                   <p dangerouslySetInnerHTML={{ __html: resultData }}></p>

        }

        </div>

      </div>

      }
      {/* cards section ending */}
  
       <div className="main-bottom">
        <div className="search-box">
          <input type="text" placeholder='Enter a prompt here' 
          onChange={(event)=>setInput(event.target.value)} value={input}/>

          <div className='icons'>
          <i className="bi bi-images"></i>
          <i className="bi bi-mic"></i>
          {/* initially searchbox that is input field is empty so if empty then send button wont show this is our condition.
          thats y we are putting this condition in ternary..if empty it wont display send icon,if any text there it visible */}
           <i className="bi bi-send" onClick={()=>onSent()}></i>

          </div>
        </div>
        <div className="bottom-info">
        {/* <img src={geminiLogo} alt="Gemini Logo" width={100} height={100} /> */}
            <p>Gemini may display inaccurate info,including about people,so double-chcek its responses.Your Privacy and Gemini Apps.</p>
        </div>
       </div>

      </div>
    </div>
  )
}

export default Main1
