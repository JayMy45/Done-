import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import "./Tasks.css"


/*
    This module will display instruction and/or descriptions of the task assigned. 
    It will link to the current task link clicked to display the task details as mentioned above...
*/

export const TaskDetails = () => {

    const { taskId } = useParams()
    const [assignments, updateAssignments] = useState({
        task: "",
    })
    const localDoneUser = localStorage.getItem("done_user")
    const doneUserObject = JSON.parse(localDoneUser)

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
    return <>
        <Container>
            <section>
                <h2 className="mb-3"> Task Details</h2>
                <Form.Label>Instructions</Form.Label>
                <div className="done__assignment">{assignments.task.instructions} </div>
                <Button onClick={() => navigate("/tasks")}>Return to Task List</Button>
                {
                    doneUserObject.admin
                        ? <Button className="btn btn__ticketList btn__update" onClick={() => navigate(`/tasks/update/${taskId}`)}>UPDATE</Button>
                        : <></>
                }
            </section>
        </Container>
    </>
}
