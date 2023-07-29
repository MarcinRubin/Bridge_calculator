import React from 'react'
import { useState, useEffect } from 'react'

const Results = ({participants}) => {
  const [orderedWinners, setOrderedWinners] = useState([])
  useEffect(() =>{
    const temp = Object.values(participants).map((item, idx) =>{
      return [item.name, Object.values(item.points).reduce((partialSum, a) => partialSum + Number(a), 0)]
    })
    temp.sort((a,b) => (b[1]-a[1]))
    const temp2 = temp.filter(item => item[0] !== 'DUMMY')
    console.log(temp2)
    setOrderedWinners(orderedWinners => temp2)
  }, [])


  return (
    <div>
        <table>
        <thead>
        <tr>
                <td>GRACZ</td>
                <td>PUNKTY</td>
            </tr>
        </thead>
        <tbody>
        {orderedWinners.map((item, idx) => (
          <React.Fragment key={idx}>
          <tr>
              <td>{item[0]} </td> 
              <td>{item[1]}</td>
          </tr>
          </React.Fragment>
        ))}
        </tbody>
        </table>
    </div>
  )
}

export default Results