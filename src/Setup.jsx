import Competitors from "./Competitors"

const Setup = ({gamers, setGamers, setRounds, setPunctation, setSetup, setDeals}) => {
    
    const handleRounds = (ev) => {
      setRounds(rounds => ev.target.value);
    }

    const handleDeals = (ev) =>{
      setDeals(deals => ev.target.value);
    }
    
    const handlePunctation = (ev) => {
      setPunctation(punctation => ev.target.value)
    }

    const handleGenerate = () => {
        setSetup(false)
    }

    return (
      <div className="setup_wrapper">
        <Competitors
          gamers = {gamers}
          setGamers = {setGamers}
        />
  
      <form action="#">
        <label>Liczba Rund</label>
        <select name="languages" id="lang" onClick={handleRounds}>
          {gamers.length % 2 &&  gamers.map( (item, idx) =>(
            <option key={idx} value={idx + 1}>{idx + 1}</option>
          ))
          } 
          {!(gamers.length % 2) &&  gamers.slice(0,-1).map( (item, idx) =>(
            <option key={idx} value={idx + 1}>{idx + 1}</option>
          ))
          }
        </select>
      </form>
  
      <form action="#">
        <label>Liczba rozdań w turze</label>
        <select name="languages" id="lang" onClick={handleDeals}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </form>
  
      <form action="#">
        <label>Punktacja</label>
        <select name="languages" id="lang" onClick={handlePunctation}>
          <option value="IMP">IMP</option>
          <option value="MAX">MAX</option>
          <option value="CUSTOM">CUSTOM</option>
        </select>
      </form>
  
      <button onClick = {handleGenerate}>Generate</button>
      <button>Load</button>
      </div>
    )
}

export default Setup