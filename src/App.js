import React, { useEffect, useState } from "react";
import Die from "./Die";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App(){
    const [dice, setDice] = useState(allNewDice())
    const [start, setStart] = useState(false)
    const [tenzies, setTenzies] = useState(false)
    const [timer,setTimer] = useState(0)
    const [timeron, setTimeron] = useState(false)
    const [recordTime, setRecordtime] = useState(() => fetchPrevioustime());
    
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice =[]
        for (let i = 0; i < 10; i++) {
          newDice.push(generateNewDie())
       }
        return newDice
    }

    function fetchPrevioustime(){
        const recordedTime = localStorage.getItem(("recordTime"))
        //console.log(recordedTime + "")
        //const recordedTimesc = localStorage.getItem(("recordTimesc"))
       if(recordedTime !== null){
            return{
                mn: recordedTime.mn,
                sc: recordedTime.sc
            }
        }
    }

    function rollDice() {
        if(!tenzies) {
            setStart(true)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setTimeron(true)
        } else {
            setStart(false)
            setTenzies(false)
            setDice(allNewDice())
            setTimer(0)
            setTimeron(false)
        }
    }

    function buttonText(){
        if(!tenzies & start) {
            return "Roll"
    } else if(!tenzies & !start){
        return "Start"
    }else{
        return "New Game"
    }
}

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
   
    const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setTimeron(false)
        }
    }, [dice])

    useEffect(() => {
        let interval = null;
        if(timeron){
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 10)
            },10)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    },[timeron])

    
    useEffect(() => {
        //fetchPrevioustime()
            if(tenzies){
               let temp1 = [{
                mn: mn,
                sc: sc
            }]
            localStorage.setItem("recordTime", JSON.stringify(temp1))
            //setRecordtime(temp1)
            setRecordtime((localStorage.getItem("recordTime")))
        }    
    },[tenzies]
    )

    const stylesWon = {
        display: tenzies ? "block" : "none"
    }
    const stylesTimer = {
        display: tenzies ? "none" : "block"
    }

    const mn = ("0" + Math.floor((timer / 60000) % 60)).slice(-2)
    const sc = ("0" + Math.floor((timer / 1000) % 60)).slice(-2)
    const mlsc = ("0" + ((timer / 10) % 100)).slice(-2)
   //const timeArray = recordTime.sc
    
    return (
        <main>
            <h1 className="title">Tenzies</h1> 
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            {tenzies && <div className= "congrats" style={stylesWon}>Congrats! You have won the game. <br></br>
            You took {mn > 0 && `${mn}minutes and ` } {sc}  seconds.
           Your best time is {recordTime && recordTime.map((val) => <h1>{val.sc}</h1>)}
           {console.log(recordTime+"main")}
            </div>}
            <div className="display" style={stylesTimer}>
                <span>{mn}:</span>
                <span>{sc}:</span>
                <span>{mlsc}</span>
            </div><br></br>
            <div className="dice-container">
                {diceElements}
            </div>
            {/*<button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>*/}
            <button className="roll-dice" onClick={rollDice}>{buttonText()}</button>
            {tenzies && <Confetti />}
            
        </main>
    )
}