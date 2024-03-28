// Write your code here
import './index.css'

const MatchCard = props => {
  const {details} = props

  const {result, competingTeam, competingTeamLogo, matchStatus} = details

  return (
    <li>
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className=""
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p>{matchStatus}</p>
    </li>
  )
}
export default MatchCard
