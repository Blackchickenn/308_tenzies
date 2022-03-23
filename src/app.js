import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "./node_modules/react-confetti"
// import Confetti from "./confetti_module/react-confetti"



export default function App(){
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
       const allHeld = dice.every(die => die.isHeld)
       const firstDie = dice[0].value 
       const allSame = dice.every(die => die.value === firstDie)
       if (allHeld && allSame){
           setTenzies(true)

       }
    },[dice])

    function generatesNewDie(){
        return {
            value: Math.ceil(Math.random() * 6), 
            isHeld: false,
            id:nanoid()
         }
    }

    function allNewDice(){
        const newDice = []
        for (let i = 0; i < 10; i++){
           newDice.push(generatesNewDie()) 
        }
        return newDice
    }
    
    function rollDice(){
        if (!tenzies){
            setDice(oldDice => oldDice.map(die =>{
            return die.isHeld ?
            die :
            generatesNewDie()
        }))
    } else {
        setTenzies(false)
        setDice(allNewDice())
    }
    }

    function holdDice(id){ 
        setDice(oldDice => oldDice.map(die =>{
            return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
        }))
    }

    const diceElement = dice.map(die => <Die value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

     return (
     <main>
         {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="die--block">
            {diceElement}
        </div>
        <button className="roll--btn" 
                onClick={rollDice}>
                {tenzies === true ? "New Game" : "Roll"}
        </button>
    </main>
     )}