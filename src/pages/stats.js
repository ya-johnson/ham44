import useStore from '../store'
import StatsCharts from '../componets/statsChart'

const Stats = () => {
  
  const ham = useStore(state => state.ham)
  const { about, stats, overall, results } = ham

  return (

    <div className="stats">
      <div className="container">
        
        <div className="about">
          <h3>{`${about.firstName} ${about.lastName}`}</h3>

          <div className="wrraper">
            <div>
              <span>{`Birth: ${about.birth}`}</span>
              <span>{`Nationality: ${about.nationality}`}</span>
              <span>{`Number: ${about.number}`}</span>
              <span>{`Code: ${about.code}`}</span>
            </div>
            <div>
              <span>{`Seasons: ${stats[0].season} - ${stats[stats.length - 1].season}(current)`}</span>
              <span>{`Constructors: ${stats[0].constructor}, ${stats[stats.length - 1].constructor}`}</span>
              <span>{`F1 Championships: ${overall.championships.length}`}</span>
              <span>{`Races: ${results.length}`}</span>
            </div>
            <div>
              <span>{`Wins: ${overall.wins.length}`}</span>
              <span>{`Podiums: ${overall.podiums.length}`}</span>
              <span>{`Poles: ${overall.poles.length}`}</span>
              <span>{`Front Row Starts: ${overall.frontRow.length}`}</span>
            </div>

          </div>
        </div>

        <div className="overall">
          <h4>Overall Stats</h4>
          <table>
            <thead>
              <tr>
                <th>Season</th>
                <th>Constructor</th>
                <th>Races</th>
                <th>Wins</th>
                <th>Podiums</th>
                <th>Poles</th>
                <th>Points</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
            {stats.map(year => {
              return (
                <tr>
                  <td key='season'>{year.season}</td>
                  <td key='constructor'>{year.constructor}</td>
                  <td key='races'>{year.races.length}</td>
                  <td key='wins'>{year.wins}</td>
                  <td key='podiums'>{year.podiums}</td>
                  <td key='poles'>{year.poles}</td>
                  <td key='points'>{year.points}</td>
                  <td key='rank'>{year.rank}</td>
                </tr>
              )
            })}
            </tbody>
          </table>

        </div>

        <div className="season-stats">
          <h4>Stats per season</h4>
          <p>For each Race: quali + result</p>
          <StatsCharts />
        </div>
        


      </div>
    </div>
    
  )
}

export default Stats