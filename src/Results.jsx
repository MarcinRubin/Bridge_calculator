import React from 'react'

const Results = ({participants}) => {

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
        {Object.values(participants).map((item, idx) =>(
            <React.Fragment key={idx}>
            <tr>
                <td>{item.name} </td> 
                <td>{Object.values(item.points).reduce((partialSum, a) => partialSum + Number(a), 0)}</td>
            </tr>
            </React.Fragment>
        ))}
        </tbody>
        </table>
    </div>
  )
}

export default Results