import useStore from '../store'

const Results = () => {

  const ham = useStore(state => state.ham)
  const results = ham.results

  return (

    <div className="results">
      <div className="container">

        <h3>All Races</h3>

        <div>
          <table>
            <thead>
              <tr>
                <th>Season</th>
                <th>Race N.</th>
                <th>Date</th>
                <th>Circuit</th>
                <th>Constructor</th>
                <th>Qualified</th>
                <th>Finished</th>
              </tr>
            </thead>
            <tbody>
              {results.map((race) => {
                return (
                  <tr>
                    <td>{race.season}</td>
                    <td>{race.round}</td>
                    <td>{race.date}</td>
                    <td>{race.circuit}</td>
                    <td>{race.constructor}</td>
                    <td>{race.quali}</td>
                    <td>{race.result}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
    
  )
}

export default Results