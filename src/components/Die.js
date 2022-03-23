import React from "react"

export default function Die (props){
    const style = {
        backgroundColor : props.isHeld ? "#59E391" : "white"
    }

    return (
        <div onClick={props.holdDice} className="die--component" style={style}>
            <h2>{props.value}</h2>
        </div>
    )
}