const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function BugDetails() {
  const [bug, setBug] = useState(null)
  const { bugId } = useParams()

  useEffect(() => {
    bugService
      .getById(bugId)
      .then((bug) => {
        setBug(bug)
      })
      .catch((err) => {
        showErrorMsg('Cannot load bug')
      })
  }, [])

  if (!bug) return <h1>loadings....</h1>
  return (
    bug && (
      <section className="bug-details-section main-section">
        <img
          src={`https://api.dicebear.com/7.x/rings/svg?seed=${bug.title}`}
          alt="bug img"
        />
        <h4>{bug.title}</h4>
        <p>{bug.description}</p>
        <p>
          Severity: <span>{bug.severity}</span>
        </p>
        <Link to="/bug">Back to List</Link>
      </section>
    )
  )
}
