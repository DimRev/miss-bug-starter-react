const { Link } = ReactRouterDOM

import { BugPreview } from './BugPreview.jsx'
import { userService } from '../services/user.service.js'

export function BugList({ bugs, onRemoveBug, onEditBug }) {
  const user = userService.getLoggedinUser()

  if (!bugs) return <div>Loading...</div>
  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          {user && (user._id === bug.submittedBy._id || user.isAdmin) && (
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
