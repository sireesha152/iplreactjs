import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {details} = props
  const {name, id, teamImageUrl} = details
  return (
    <li className="team-container">
      <Link to={`/team-matches/${id}`} className="link">
        <img
          src={teamImageUrl}
          alt="home component structure"
          className="teamlogo"
        />
        <h1 className="team-heading">{name}</h1>
      </Link>
    </li>
  )
}
export default TeamCard
