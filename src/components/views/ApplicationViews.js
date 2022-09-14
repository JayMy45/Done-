import { Outlet, Route, Routes } from "react-router-dom"
import { CreateTasks } from "../create/CreateAssignment"
import { DeleteTasks } from "../tasks/DeleteTask"
import { TaskList } from "../tasks/TaskList"
import { UpdateTasks } from "../tasks/UpdateTasks"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>DONE<span>&#8253;</span></h1>
					<div>Your one-stop shop for repairing your tech</div>

					<Outlet />
				</>
			}>

				<Route path="tasks" element={<TaskList />} />
				<Route path="tasks/create" element={<CreateTasks />} />
				<Route path="tasks/delete" element={<DeleteTasks />} />
				<Route path="tasks/update" element={<UpdateTasks />} />


			</Route>
		</Routes>
	)
}


