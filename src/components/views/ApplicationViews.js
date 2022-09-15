import { Outlet, Route, Routes } from "react-router-dom"
import { CreateTasks } from "../create/CreateTasks"
import { DeleteTasks } from "../tasks/DeleteTask"
import { TaskDetails } from "../tasks/TaskDetails"
import { TaskList } from "../tasks/TaskList"
import { UpdateTasks } from "../update/UpdateTasks"
import { UserLists } from "../users/UserLists"

export const ApplicationViews = () => {
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
				<Route path="tasks/delete" element={<DeleteTasks />} />
				<Route path="tasks/update/:taskId" element={<UpdateTasks />} />

				<Route path="tasks/:taskId" element={<TaskDetails />} />
				<Route path="/tasks/users" element={<UserLists />} />


			</Route>
		</Routes>
	)
}

/* <Route path="tasks/details" element={<TaskDetails />} /> */
