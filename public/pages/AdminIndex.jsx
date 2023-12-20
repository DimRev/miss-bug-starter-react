const { useEffect, useState } = React

import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

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
    userService
      .remove(userId)
      .then(() => {
        console.log('Deleted Successfully!')
        const usersToUpdate = users.filter((user) => user._id !== userId)
        setUsers(usersToUpdate)
        showSuccessMsg('user removed')
      })
      .catch((err) => {
        console.log('Error from onRemoveUser ->', err)
        showErrorMsg('Cannot remove user')
      })
  }

  function onEditUser(user) {
    const isAdmin = confirm('Add admin permission to user')
    const userToSave = { ...user, isAdmin }
    userService
      .save(userToSave)
      .then((savedUser) => {
        console.log('Updated User:', savedUser)
        const UsersToUpdate = users.map((currUser) =>
          currUser._id === savedUser._id ? savedUser : currUser
        )
        setUsers(UsersToUpdate)
        showSuccessMsg('User updated')
      })
      .catch((err) => {
        console.log('Error from onEditUser ->', err)
        showErrorMsg('Cannot update user')
      })
  }

  return (
    <section className="admin-index-section main-section">
      <UserList
        users={users}
        onRemoveUser={onRemoveUser}
        onEditUser={onEditUser}
      />
    </section>
  )
}
