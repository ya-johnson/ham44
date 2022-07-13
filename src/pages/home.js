import { useState, useEffect } from 'react'
import useStore from '../store'
import axios from 'axios'
import configHam from '../utils/configHam'

const Home = () => {

  const ready = useStore(state => state.ready)
  const setReady = useStore(state => state.setReady)
  const ham = useStore(state => state.ham)
  const setHam = useStore(state => state.setHam)

  useEffect(() => {

    const getHam = async () => {

      const ham = {
        about: null,
        seasons: null,
        results: null
      }
    
      try {

        const getInfo = await axios .get('https://ergast.com/api/f1/drivers/hamilton.json')
        const [driverInfo] = getInfo.data.MRData.DriverTable.Drivers

        const info = {
          code: driverInfo.code,
          firstName: driverInfo.givenName,
          lastName: driverInfo.familyName,
          birth: driverInfo.dateOfBirth,
          nationality: driverInfo.nationality,
          number: driverInfo.permanentNumber,
          wiki: driverInfo.url 
        }

        ham.about = info
    
        const getStandings = await axios .get('https://ergast.com/api/f1/drivers/hamilton/driverStandings.json')
        const standtingsData = getStandings.data.MRData.StandingsTable.StandingsLists

        const standings = standtingsData.map((season) => {
          const [driver] = season.DriverStandings
          const [constructor] = driver.Constructors
    
          return {
            season: season.season,
            rounds: season.round,
            constructor: constructor.name,
            points: driver.points,
            position: driver.position,
            wins: driver.wins
          }
        })

        ham.seasons = standings
    
        const getResults = await axios .get('https://ergast.com/api/f1/drivers/hamilton/results.json?limit=500')
        const resultsData = getResults.data.MRData.RaceTable.Races
        
        const races = resultsData.map((race) => {
          const [result] = race.Results
    
          return {
            season: race.season,
            round: race.round,
            date: race.date,
            raceName: race.raceName,
            circuit: race.Circuit.circuitName,
            raceTime: race.time,
            constructor: result.Constructor.name,
            quali: result.grid,
            result: result.position,
            status: result.status,
            points: result.points,
          }
        })
        
        ham.results = races
        
        const hamStats = configHam(ham)
        setHam(hamStats)
        setReady(true)

      } catch (err) { console.log(err) }
    }

    const storage = JSON.parse(localStorage.getItem('ham'))

    if (storage.state.ham == null) {
      getHam()
    }

  }, [])

  if (!ready) {
    return (
      <div className="loader">Loading ...</div>
    )
  } else {
    return (
      <>
        <div className="home">
          <div className="container">
  
            <h2>Get in there Lewis</h2>
            <p>All about the 7 times World Champion</p>
            
          </div>
        </div>
  
        <div className="about">
          <div className="container">
  
            <h4>Lewis Hamilton</h4>
              <p>
              {`Sir Lewis Carl Davidson Hamilton (born 7 January 1985) is a British racing driver 
                currently competing in Formula One for Mercedes. In Formula One, Hamilton has won a 
                joint-record seven World Drivers' Championship titles (tied with Michael Schumacher), 
                and holds the records for the most wins (103), pole positions (103), and podium 
                finishes (185), among others. 
                Born and raised in Stevenage, Hertfordshire, Hamilton joined the McLaren young 
                driver programme in 1998. This led to a Formula One drive with McLaren from 2007 
                to 2012, making Hamilton the first, and so far only, black driver to race in the 
                series. In his inaugural season, Hamilton set numerous records as he finished 
                runner-up to Kimi Räikkönen by one point. The following season, he won his maiden 
                title in dramatic fashion—making a crucial overtake on the last lap of the last 
                race of the season—to become the then-youngest Formula One World Champion in history. 
                After six years with McLaren, Hamilton signed with Mercedes in 2013. 
                Changes to the regulations for 2014 mandating the use of turbo-hybrid engines saw 
                the start of a highly successful period for Hamilton, during which he has won six 
                further drivers' titles. Consecutive titles came in 2014 and 2015 during an intense 
                rivalry with teammate Nico Rosberg. Following Rosberg's retirement, Ferrari's 
                Sebastian Vettel became Hamilton's closest rival in two intense championship battles, 
                in which Hamilton twice overturned mid-season point deficits to claim consecutive 
                titles again in 2017 and 2018. His third and fourth consecutive titles followed in 
                2019 and 2020 to equal Schumacher's record of seven drivers' titles. 
                Hamilton has been credited with furthering Formula One's global following by appealing 
                to a broader audience outside the sport, in part due to his high-profile lifestyle, 
                environmental and social activism, and exploits in music and fashion. He has also 
                become a prominent advocate in support of activism to combat racism and push for 
                increased diversity in motorsport. Hamilton was listed in the 2020 issue of Time 
                as one of the 100 most influential people globally, and was knighted in the 2021 New Year Honours.`} 
              </p>
              <a href={ham.about.wiki} className="read-more" target="_blank">Read More</a>
            
          </div>
        </div>
      </>
    )
  }


}

export default Home
