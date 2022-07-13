

const configHam = (ham) => {

  const { about, seasons, results } = ham

  const overall = {
    championships: seasons.filter(season => season.position == 1),
    wins: results.filter(result => result.result == 1),
    podiums: results.filter(result => result.result <= 3),
    poles: results.filter(result => result.quali == 1),
    frontRow: results.filter(result => result.quali <= 2),
  }

  const setStats = () => {
    let stats = []
    let year = seasons[0].season

    for (let i = 0; i < seasons.length; i++) {
      let seasonStats = {
        season: `${year}`,
        constructor: seasons[i].constructor,
        rounds: seasons.rounds,
        rank: seasons[i].position,
        points: seasons[i].points,
        wins: seasons[i].wins,
        races: results.filter(result => result.season == year)
      }
      stats.push(seasonStats)
      year++
    }

    stats = stats.map((season) => {
      return {
        ...season,
        podiums: season.races.filter(result => result.result <= 3).length,
        poles: season.races.filter(result => result.quali == 1).length
      }
    })
    
    return stats
  }

  const stats = setStats()

  const constructors = {
    mclaren: stats.filter(season => season.constructor == 'McLaren'),
    mercedes: stats.filter(season => season.constructor == 'Mercedes')
  }

  const newHam = {
    about: about,
    overall: overall,
    stats: stats,
    constructors: constructors,
    results: results
  }

  return newHam
}

export default configHam