import React, { useState, useEffect } from "react"
import UserTable from "./usersTable"
import Pagination from "./pagination"
import { paginate } from "../utils/paginate"
import PropTypes from "prop-types"
import GroupList from "./goupList"
import api from "../api"
import SearchStatus from "./searchStatus"
import _ from "lodash"

const Users = () => {
    const pageSize = 8
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" })

    const [users, setUsers] = useState()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    })
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark }
                }
                return user
            })
        )
    }

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
    const handleSort = (item) => {
        setSortBy(item)
    }
    if (users) {
        let filteredUsers = null
        if (selectedProf) {
            filteredUsers = users.filter(
                (user) =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
            )
        } else filteredUsers = users
        // const filteredUsers = selectedProf
        //     ? (filteredUsers = users.filter(
        //           (user) =>
        //               JSON.stringify(user.profession) ===
        //               JSON.stringify(selectedProf)
        //       ))
        //     : users

        const count = filteredUsers.length
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        )
        const userCrop = paginate(sortedUsers, currentPage, pageSize)

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
                        <UserTable
                            users={userCrop}
                            selectedSort={sortBy}
                            onSort={handleSort}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
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
    return "Loading ..."
}

Users.propTypes = {
    users: PropTypes.array
}
export default Users
