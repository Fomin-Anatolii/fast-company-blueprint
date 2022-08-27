import React, { useState, useEffect } from "react"
import UserTable from "./usersTable"
import Pagination from "./pagination"
import { paginate } from "../utils/paginate"
import PropTypes from "prop-types"
import GroupList from "./goupList"
import api from "../api"
import SearchStatus from "./searchStatus"

const Users = ({ users, ...rest }) => {
    console.log(users)
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
    const handleSort = (item) => {
        console.log(item)
    }

    let filteredUsers = null
    if (selectedProf) {
        filteredUsers = users.filter(
            (user) =>
                JSON.stringify(user.profession) === JSON.stringify(selectedProf)
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
                    <UserTable users={userCrop} onSort={handleSort} {...rest} />
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
