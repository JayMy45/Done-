import { AdminViews } from "./AdminViews"
import { UserViews } from "./UserViews"


export const ApplicationViews = () => {

	const localDoneUser = localStorage.getItem("done_user")
	const doneUserObject = JSON.parse(localDoneUser)


	if (doneUserObject.admin) {
		//Return employee views
		return <AdminViews />
	} else {
		return <UserViews />
	}

}

/* <Route path="tasks/details" element={<TaskDetails />} /> */
