import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Tasks.css"

export const TaskDetails = () => {

    const { taskId } = useParams()
    const [assignments, updateAssignments] = useState({
        task: "",
    })

    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/assignments?_expand=user&_expand=task&taskId=${taskId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleTask = data[0]
                    updateAssignments(singleTask)
                })
        },
        [taskId]
    )

    //This module will display instruction and/or descriptions of the task assigned. 
    //It will link to the current task link clicked to display the task details as mentioned above...



    return <>
        <section>
            <h2>Task Details</h2>
            <h4>Instructions</h4>
            <div className="done__assignment">{assignments.task.instructions} </div>
            <button onClick={() => navigate("/tasks")}>Return to Task List</button>
            <button>Done</button>
        </section>
    </>
}

/* <section className="tasks">
    <header className="task__header">{task?.user?.fullName}</header>

    <div>Email: {employee?.user?.email}</div>
    <div>Specialty: {employee.specialty}</div>
    <div>Rate: {employee.rate}</div>

    <footer className="employee__footer">Currently working on {employee?.employeeTickets?.length} tickets</footer>

</section> */