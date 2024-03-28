// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {isLoading: true, data: {}}

  componentDidMount() {
    this.getdata()
  }

  formattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getdata = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const reqdata = await response.json()
    const updatedData = {
      teamBannerUrl: reqdata.team_banner_url,
      latestMatchDetails: this.formattedData(reqdata.latest_match_details),
      recentMatches: this.formattedData(reqdata.recent_matches),
    }
    console.log(updatedData)
    console.log(updatedData.teamBannerUrl)
    this.setState({data: updatedData, isLoading: false})
  }

  render() {
    const {isLoading, data} = this.state

    const {teamBannerUrl, latestMatchDetails, recentMatches} = data

    return (
      <div className="bg-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader
              type="Oval"
              testid="loader"
              color="#ffffff"
              height={50}
              width={50}
            />
          </div>
        ) : (
          <div className="container">
            <img src={teamBannerUrl} alt="team banner" className="teampic" />
            <h1 className="latest-heading">Latest Matches</h1>
            <div className="details">
              <div className="left-details">
                <h1 className="capitals">{latestMatchDetails.competingTeam}</h1>
                <p className="date">{latestMatchDetails.date}</p>
                <p className="date">{latestMatchDetails.venue}</p>
                <p className="date">{latestMatchDetails.result}</p>
              </div>
              <img
                src={latestMatchDetails.competingTeamLogo}
                alt={`latest match ${latestMatchDetails.competingTeam}`}
                className="logo"
              />
              <div className="right-details">
                <h1 className="date">First Innings</h1>
                <p className="date">{latestMatchDetails.firstInnings}</p>
                <h1 className="date">Second Innings</h1>
                <p className="date">{latestMatchDetails.secondInnings}</p>
                <h1 className="date">Man Of The Match</h1>
                <p className="date">{latestMatchDetails.manOfTheMatch}</p>
                <h1 className="date">Umpires</h1>
                <p className="date">{latestMatchDetails.umpires}</p>
              </div>
            </div>
            <div>
              {recentMatches.map(eachItem => (
                <MatchCard details={eachItem} key={eachItem.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default TeamMatches
