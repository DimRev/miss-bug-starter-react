import { UserPreview } from './UserPreview.jsx'

export function UserList({ users, onRemoveUser, onEditUser }) {
  if (!users) return <div>Loading...</div>
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li className="bug-preview" key={user._id}>
          <UserPreview user={user} />
          <div>
            <button onClick={() => onRemoveUser(user._id)}>x</button>
            <button onClick={() => onEditUser(user)}>Edit</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
