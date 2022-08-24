import React, { useState } from "react"
import api from "../api"

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
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

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1))
    if (number > 4 && number < 15) return "человек тусанут"
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут"
    if (lastOne === 1) return "человек тусанёт"
    return "человек тусанут"
  }
  return (
    <>
      <h2>
        <span className={"badge bg-" + (users.length > 0 ? "primary" : "danger")}>
          {users.length > 0
            ? `${users.length + " " + renderPhrase(users.length)} с тобой сегодня`
            : "Никто с тобой сегодня не тусанёт"}
        </span>
      </h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>{headerItems()}</tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((item) => (
                    <span key={item._id} className={"badge m-2 bg-" + item.color}>
                      {item.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate + "/5"}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users
