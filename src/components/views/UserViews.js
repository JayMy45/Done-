import { Outlet, Route, Routes } from "react-router-dom"
import { TaskDetails } from "../tasks/TaskDetails"
// import { UserLists } from "../users/UserLists"
import { TaskList } from "../tasks/TaskList"
import { UserCreateTasks } from "../create/UserCreateTasks"
import { User } from "../users/User"

export const UserViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>DONE<span>&#8253;</span></h1>
                    <div>Get Er' DONE<span>&#8253;</span></div>

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