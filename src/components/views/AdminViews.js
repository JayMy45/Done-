import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { CreateTasks } from "../create/CreateTasks"
import { CreateTaskTypes } from "../create/CreateTaskTypes"
import { DeleteTasks } from "../tasks/DeleteTask"
import { TaskDetails } from "../tasks/TaskDetails"
import { TaskList } from "../tasks/TaskList"
import { UpdateTasks } from "../update/UpdateTasks"
import { UserLists } from "../users/UserLists"
import smLogo from "/Users/jeremymyers/workspace/done-capstone/src/Done.admin.RootImage.png"



export const AdminViews = () => {

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

                        <div id="margin-right" className="mt-5 pt-4">
                            {
                                users.map(
                                    (user) => {
                                        if (doneUserObject.id === user.id)
                                            return <label className="font-size-AdminNav" key={`user--${user.id}`}
                                            ><span className="fw-lighter fs-6">Welcome:</span> <span className="fw-bold fs-6"><em>{user.fullName}</em></span></label>
                                    })
                            }
                        </div>
                    }

                    <img src={smLogo} width="200" className="img_Logo m-4" alt="Done Logo" />

                    <Outlet />

                </>
            }>

                <Route path="/" element={<DeleteTasks />} />
                <Route path="tasks" element={<TaskList />} />
                <Route path="tasks/create" element={<CreateTasks />} />
                <Route path="tasks/update/:taskId" element={<UpdateTasks />} />
                <Route path="tasks/:taskId" element={<TaskDetails />} />
                <Route path="type/create" element={<CreateTaskTypes />} />
                <Route path="tasks/users" element={<UserLists />} />


            </Route>
        </Routes>
    )
}

/* <Route path="tasks/details" element={<TaskDetails />} /> */