import CompetitorsItem from "./CompetitorsItem"
import { useState } from "react"

const Competitors = ({gamers, setGamers}) => {

  const handleAdd = () =>{
    const new_gamers = [...gamers, '']
    setGamers(arr => new_gamers)
  }

  const handleRemove = () => {
    if(gamers.length > 4){
      const new_gamers = [...gamers]
      new_gamers.pop()
      setGamers(arr => new_gamers)
    }
  }

  const handleChange = (ev, idx) => {
    const new_gamers = [...gamers]
    new_gamers[idx] = ev.target.value
    setGamers(arr => new_gamers)
  }

  
  return (
    <div className="competitors_wrapper">
      <p>Gracze</p>
      {gamers.map((item, idx) => (
        <CompetitorsItem
          key = {idx}
          idx = {idx}
          name = {item}
          handleChange = {handleChange}
        />
    ))}
    <button onClick={handleAdd}>+</button>
    <button onClick={handleRemove}>-</button>
    </div>
  )
}

export default Competitors