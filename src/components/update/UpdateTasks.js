import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

export const UpdateTasks = () => {

    const { taskId } = useParams()

    // TODO: Provide initial state for profile
    const [updates, setUpdates] = useState({
        instructions: ""
    })

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/assignments?_expand=user&_expand=task&taskId=${taskId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleUpdate = data[0]
                    setUpdates(singleUpdate)
                })


        },
        [taskId]
    )

    const handleCreateNewTasks = (event) => {
        event.preventDefault()

        const toBeSavedToAPI = {
            userId: updates.userId,
            completion: updates.task.completion,
            instructions: updates.task.instructions,
            typeId: updates.task.typeId
        }

        return fetch(`http://localhost:8088/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toBeSavedToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/tasks/${taskId}`)
            })

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
    }
    //initial state of newTasks will provide the following information:
    const [newTasks, setNewTasks] = useState({
        userId: 0,
        completion: false,
        instructions: "",
        typeId: 0
    })

    return (
        <Container>
            <form className="tasks__new-task">
                <h2 className="task__form-title">Update Tasks</h2>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="instructions"><strong>Enter Instructions Here:</strong></label>
                        <textarea
                            required autoFocus
                            className="form-control"
                            placeholder="Enter Instructions..."
                            style={{ height: "10rem" }}

                            value={updates?.task?.instructions}
                            onChange={(evt) => {
                                const copy = { ...updates }
                                copy.task.instructions = evt.target.value
                                setNewTasks(copy)
                            }
                            } />
                    </div>
                </fieldset>

                <button className="btn__new-task" onClick={(ClickEvent) => handleCreateNewTasks(ClickEvent)}>Update Task</button>
                <button type="button" onClick={() => navigate(`/tasks/${taskId}`)}>Return to Task Details</button>
                <button type="button" onClick={() => navigate("/tasks")}>Return to Task List</button>
            </form >
        </Container>
    )
}
