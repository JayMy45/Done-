import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import poweredByDone from "/Users/jeremymyers/workspace/done-capstone/src/Done.Power.png"
import "./Update.css"

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
        <Container id="type__container" className="d-grid h-25 w-50">
            <Form className="tasks__new-task jumbotron">
                <Row>
                    <h2 id="done__update-task" className="task__form-title mb-3">Update Tasks</h2>


                    <Form.Group>
                        <div className="form-group mb-4">
                            <Form.Label htmlFor="instructions"><strong>Update Instructions Here:</strong></Form.Label>
                            <Form.Control
                                required autoFocus
                                as="textarea"
                                className="form-control mb-3"
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
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button className="btn__new-task w-100" onClick={(ClickEvent) => handleCreateNewTasks(ClickEvent)}>Update Task</Button>
                        </Col>

                        <Col>
                            <Button type="button" variant="dark" className="w-100" onClick={() => navigate(`/tasks/${taskId}`)}>Details</Button>
                        </Col>

                        <Col>
                            <Button type="button" variant="info" className="w-100" onClick={() => navigate("/tasks")}>Task List</Button>
                        </Col>

                    </Row>
                </Row>
            </Form >
            <Row>
                <Form.Label className="powered__by-bottom">
                    <h6 className="powered-by">Powered by  <img src={poweredByDone} className="" width="55" height="50" alt="Powered By Done Logo" /></h6>

                </Form.Label>

            </Row>

        </Container >
    )
}
