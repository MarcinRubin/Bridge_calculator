import DealTableItem from "./DealTableItem";
import { useState, useContext, useEffect } from "react"
import {userContext} from "./Game";

const DealTable = ({dealNumber, deal, actualRound, punctation}) => {
  const {handleSingleDeal, changeVulnerability} = useContext(userContext);

  const changeDealVulnerability = (item) =>{
    let vul = [...deal.vulnerable]
    vul[item] = !vul[item]
    changeVulnerability(actualRound, dealNumber, vul)
  }


const subdeals = Object.keys(deal)
subdeals.pop()
  return (
    <div className="deals_table">
    <table>
        <thead>
            <tr>
                <td rowSpan={2} className={deal.vulnerable[0] ? "vulnerable" : "plain"} onClick={() =>changeDealVulnerability(0)}>NS</td>
                <td rowSpan={2} className={deal.vulnerable[1] ? "vulnerable" : "plain"} onClick={() =>changeDealVulnerability(1)}>EW</td>
                <td rowSpan={2}>Kontrakt</td>
                <td rowSpan={2}>Rg.</td>
                <td rowSpan={2}>Lew</td>
                <td colSpan = {2}>Zapis</td>
                <td colSpan = {2}>Wynik</td>
            </tr>
            <tr>
                <td>NS</td>
                <td>EW</td>
                <td>NS</td>
                <td>EW</td>
            </tr>
        </thead>
        <tbody>
        {
          subdeals.map( (item, idx) =>(
            <DealTableItem
              key = {idx}
              actualRound = {actualRound}
              dealNumber = {dealNumber}
              subdeal_number = {idx}
              subdeal = {deal[idx]}
              vul = {deal.vulnerable}
            />
          ))
        }


          
        </tbody>
    </table>
</div>
  )
}

export default DealTable