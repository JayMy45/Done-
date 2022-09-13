import { Outlet, Route, Routes } from "react-router-dom"
import { TaskList } from "../tasks/TaskList"

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


			</Route>
		</Routes>
	)
}


