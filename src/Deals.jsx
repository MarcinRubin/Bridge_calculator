import DealTable from "./DealTable";

const Deals = ({deal, dealsNumber, actualRound}) => {
  const deals_iterator = [...Array(Number(dealsNumber)).keys()]
  return (
    <div>
      {deals_iterator.map( ( iterator ) =>(
      <DealTable
        key = {iterator}
        dealNumber = {iterator}
        deal = {deal[iterator]}
        actualRound = {actualRound}
      />
    ) )}
    </div>
  )
}

export default Deals

