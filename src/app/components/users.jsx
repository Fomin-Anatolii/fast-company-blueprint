import React, { useState, useEffect } from "react"
import User from "./user"
import Pagination from "./pagination"
import { paginate } from "../utils/paginate"
import PropTypes from "prop-types"
import GroupList from "./goupList"
import api from "../api"
import SearchStatus from "./searchStatus"

const Users = ({ users, ...rest }) => {
    const pageSize = 2
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    })

    useEffect(() => setCurrentPage(1), [selectedProf])

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    let filteredUsers = null
    if (selectedProf) {
        filteredUsers = users.filter(
            (user) =>
                JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
    } else filteredUsers = users

    const count = filteredUsers.length
    const userCrop = paginate(filteredUsers, currentPage, pageSize)

    const clearFilter = () => {
        setSelectedProf()
    }
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Clear
                    </button>
                </div>
            )}

            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User key={user._id} {...rest} {...user} />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    )
}

Users.propTypes = {
    users: PropTypes.array
}
export default Users
