import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import useStore from '../store'

const StatsCharts = () => {

  const ham = useStore(state => state.ham)

  const seasons = ham.stats.map(season => {
    return {
      season: season.season,
      races: season.races.map(round => {
        return {
          round: round.round,
          raceName: round.raceName,
          quali: round.quali,
          result: round.result,
          points: round.points,
          status: round.status
        }
      })
    }
  })

  const grid = {
    2007: 22,
    2008: 22,
    2009: 20,
    2010: 24,
    2011: 24,
    2012: 24,
    2013: 22,
    2014: 22,
    2015: 20,
    2016: 22,
    2017: 20,
    2018: 20,
    2019: 20,
    2020: 20,
    2021: 20,
  }


  return (
    <>
    {seasons.map(season => {

      return (
        <div className='charts'>
          <h5 key={season.season}>{`Season ${season.season}`}</h5>
          <p>{`Grid: ${grid[`${season.season}`]} | Races: ${season.races.length}`}</p>
          <ResponsiveContainer key={`season ${season.season}`} width='100%' aspect={3}>
            <LineChart 
            width={800}
            height={800}
            data={season.races}
            margin={{ left: -30, right: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="round" interval={0} angle={0} margin={{bottom: 20}} />
              <YAxis tickCount={5} reversed={true} type="number" domain={[0, grid[`${season.season}`]]} />
              <Tooltip contentStyle={{ backgroundColor: '#0c0f0a' }} />
              <Legend />
              <Line type="monotone" dataKey="quali" stroke="#E86CC5" activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="result" stroke="#4fa5e3" activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )
    })}
    </>
  )
}

export default StatsCharts