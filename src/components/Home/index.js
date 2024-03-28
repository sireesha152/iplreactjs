// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {isLoading: true, teamlist: []}

  componentDidMount() {
    this.getteamList()
  }

  getteamList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedList = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))
    this.setState({teamlist: updatedList, isLoading: false})
  }

  render() {
    const {isLoading, teamlist} = this.state
    return (
      <div className="bg-container">
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="logo"
          />
          <h1 className="ipl-heading">IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <ul className="matches-container">
            {teamlist.map(eachItem => (
              <TeamCard key={eachItem.id} details={eachItem} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default Home
