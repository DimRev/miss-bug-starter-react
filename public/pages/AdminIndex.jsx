const { useEffect, useState } = React

import { userService } from '../services/user.service.js'

import { UserList } from '../cmps/UserList.jsx'

export function AdminIndex() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [])

  function loadUsers() {
    return userService.query().then((users) => setUsers(users))
  }

  function onRemoveUser(userId) {

  }

  function onEditUser(user) {

  }

  return (
    <section className="admin-index-section">
      <UserList users={users} onRemoveUser={onRemoveUser} onEditUser={onEditUser} />
    </section>
  )
}
