export function UserPreview({ user }) {
  return (
    <article className="user-preview">
      <h4>{user.fullname}</h4>
      <img
        src={`https://robohash.org/${user.fullname}?set=set4&size=200x200`}
        alt=""
      />
      <p>Username:{user.username}</p>
      <p>
        Id: <span>{user._id}</span>
      </p>
      <p>
        Authorization: <span>{user.isAdmin ? 'Admin' : 'User'}</span>
      </p>
    </article>
  )
}
