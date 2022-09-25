import { Outlet, Route, Routes } from "react-router-dom"
import { CreateTasks } from "../create/CreateTasks"
import { CreateTaskTypes } from "../create/CreateTaskTypes"
import { DeleteTasks } from "../tasks/DeleteTask"
import { TaskDetails } from "../tasks/TaskDetails"
import { TaskList } from "../tasks/TaskList"
import { UpdateTasks } from "../update/UpdateTasks"
import { UserLists } from "../users/UserLists"
import smLogo from "/Users/jeremymyers/workspace/done-capstone/src/doneAdmin.sm.png"

// import logo from "/Users/jeremymyers/workspace/done-capstone/src/doneAdmin.lg.png"


export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    {

                    }
                    <img src={smLogo} width="300" alt="Done Logo" />
                    {/* <img src={logo} width="500" alt="Done Logo" /> */}


                    <Outlet />
                </>
            }>

                <Route path="tasks" element={<TaskList />} />
                <Route path="tasks/create" element={<CreateTasks />} />
                <Route path="tasks/delete" element={<DeleteTasks />} />
                <Route path="tasks/update/:taskId" element={<UpdateTasks />} />
                <Route path="tasks/:taskId" element={<TaskDetails />} />
                <Route path="type/create" element={<CreateTaskTypes />} />
                <Route path="tasks/users" element={<UserLists />} />


            </Route>
        </Routes>
    )
}

/* <Route path="tasks/details" element={<TaskDetails />} /> */