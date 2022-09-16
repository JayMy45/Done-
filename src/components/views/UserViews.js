import { Outlet, Route, Routes } from "react-router-dom"
// import { UserTaskContainer } from "../tasks/UserTaskContainer"
import { TaskDetails } from "../tasks/TaskDetails"
import { UserLists } from "../users/UserLists"
// import { UserCreateTasks } from "../create/UserCreateTask"
import { TaskList } from "../tasks/TaskList"
import { CreateTasks } from "../create/CreateTasks"

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
                <Route path="tasks/create" element={<CreateTasks />} />
                <Route path="tasks/:taskId" element={<TaskDetails />} />
                <Route path="/tasks/users" element={<UserLists />} />


            </Route>
        </Routes>
    )
}

/* <Route path="tasks/details" element={<TaskDetails />} /> */