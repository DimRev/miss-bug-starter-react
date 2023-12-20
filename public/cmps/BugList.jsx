const { Link } = ReactRouterDOM

import { BugPreview } from './BugPreview.jsx'
import { userService } from '../services/user.service.js'

const user = userService.getLoggedinUser()
export function BugList({ bugs, onRemoveBug, onEditBug }) {
  if (!bugs) return <div>Loading...</div>
  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          {user._id === bug.submittedBy._id && (
            <div>
              <button onClick={() => onRemoveBug(bug._id)}>x</button>
              <button onClick={() => onEditBug(bug)}>Edit</button>
            </div>
          )}
          <Link to={`/bug/${bug._id}`}>Details</Link>
        </li>
      ))}
    </ul>
  )
}
