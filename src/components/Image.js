import React from "react";

function Image(props){
    return(
        <span>
            <img 
            src={props.src} 
            alt= {props.alt} 
            id={props.id} 
            key={props.id} 
            onClick={()=>props.clickme(props.id)}
            />
        </span>
    )
}
export default Image;