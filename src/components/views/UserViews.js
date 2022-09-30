import { Outlet, Route, Routes } from "react-router-dom"
import { TaskDetails } from "../tasks/TaskDetails"
// import { UserLists } from "../users/UserLists"
import { TaskList } from "../tasks/TaskList"
import { UserCreateTasks } from "../create/UserCreateTasks"
import { User } from "../users/User"
import userLogo from "/Users/jeremymyers/workspace/done-capstone/src/doneUser.sm.png"
import { useEffect, useState } from "react"

export const UserViews = () => {
    const [users, setUsers] = useState([])
    const localDoneUser = localStorage.getItem("done_user")
    const doneUserObject = JSON.parse(localDoneUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?_sort=fullName`) //go get all tickets
                .then(response => response.json()) //get response back from server
                .then((userArray) => {
                    setUsers(userArray)  //setTickets is deconstructed above...a function...
                })

            // console.log("Initial state of tickets", tickets) //view the initial state of tickets  (one is a string the other a parameter from deconstructed variable above)
        },
        []
    )


    return (
        <Routes>
            <Route path="/" element={
                <>
                    {

                        <div id="margin-right">
                            {
                                users.map(
                                    (user) => {
                                        if (doneUserObject.id === user.id)
                                            return <label className="font-size-AdminNav" key={`user--${user.id}`}
                                            ><span class="fw-lighter fs-6">Welcome:</span> <span className="fw-bold fs-6"><em>{user.fullName}</em></span></label>
                                    })
                            }
                        </div>
                    }
                    <img src={userLogo} width="200" className="m-5" alt="Done Logo" />


                    <Outlet />
                </>
            }>

                <Route path="tasks" element={<TaskList />} />
                <Route path="tasks/user/create" element={<UserCreateTasks />} />
                <Route path="tasks/:taskId" element={<TaskDetails />} />
                <Route path="/tasks/users" element={<User />} />


            </Route>
        </Routes>
    )
}

/* <Route path="tasks/details" element={<TaskDetails />} /> */