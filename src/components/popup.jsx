import React, { useState } from "react";
import "../Popup.css";
import { title } from "process";
import { BiCopy ,BiCheckDouble} from "react-icons/bi";
export const Popup = ({ title,text, closePopup,copy = true }) => {
    let [copyed,setCopyed] = useState(false)
    let copyToClipboard = ()=>{
        navigator.clipboard.writeText(text)
    }
  return (
    <div className="popup-container">
        <div className="popup-background" onClick={closePopup}></div>
     <div className="popup-body">
        {
            title&&<h1 style={{fontSize:'40px',fontWeight:'800',marginBottom:'40px'}}>{title}</h1>
        }
                {
            text&&<span>{text}</span>
        }
      <button style={{position:'absolute',bottom:'-12px',right:"1%"}} onClick={closePopup}>Close</button>
      <button style={{position:'absolute',bottom:'-12px',left:"1%"}} onClick={()=>{copyToClipboard();setCopyed(true)}}>{copyed?<BiCheckDouble/>:<BiCopy/>}</button>

     </div>
    </div>
  );
};