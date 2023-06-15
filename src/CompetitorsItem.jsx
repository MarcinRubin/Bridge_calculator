const CompetitorsItem = ({idx, name, handleChange}) => {
  return (
    <div>
      <label className="competitor_label">{idx + 1}</label>
        <input onChange={ev => handleChange(ev, idx)}></input>
    </div>
  )
}

export default CompetitorsItem