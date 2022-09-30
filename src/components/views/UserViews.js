import { Outlet, Route, Routes } from "react-router-dom"
import { TaskDetails } from "../tasks/TaskDetails"
// import { UserLists } from "../users/UserLists"
import { TaskList } from "../tasks/TaskList"
import { UserCreateTasks } from "../create/UserCreateTasks"
import { User } from "../users/User"
import userLogo from "/Users/jeremymyers/workspace/done-capstone/src/doneUser.sm.png"

export const UserViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>

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