import React from "react"
import User from "./user"

const Users = ({ users, ...rest }) => {
  const headerItems = () => {
    return (
      <>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th />
      </>
    )
  }

  return (
    <>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>{headerItems()}</tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User key={user._id} {...rest} {...user} />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users
