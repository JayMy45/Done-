import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"


export const CreateTaskTypes = () => {

    const navigate = useNavigate()

    const [locations, setLocations] = useState([])
    const [types, setTypes] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/types?_sort=name`)
                .then(response => response.json())
                .then((typesArray) => {
                    setTypes(typesArray)

                    fetch(`http://localhost:8088/locations`)
                        .then(response => response.json())
                        .then((locationsArray) => {
                            setLocations(locationsArray)
                        }
                        )
                })


        },
        []
    )

    // This module will create a new task by updating/POST to database directly

    /*
        types: [
            {
                name: "Clean Kitchen",
                locationId: 2
            },

    */

    //initial state of newTasks will provide the following information:
    const [newTypes, setNewTypes] = useState({
        name: "",
        locationId: 0
    })


    const createNewTaskType = (event) => {
        event.preventDefault()

        const newTypeDatabase = {
            name: newTypes.name,
            locationId: parseInt(newTypes.locationId),
        }


        fetch(`http://localhost:8088/types`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTypeDatabase)
        })
            .then(response => response.json())
            .then((newTaskObject) => {
                navigate("/tasks")

            }
            )
    }

    return (
        <Container id="type__container" className="d-grid h-100">

            <Form id="type__form" className="tasks__new-task w-100" noValidate>
                <h2 className="task__form-title text-center mb-3 fs-2">Create a New Task Type</h2>
                <Form.Group controlId="type-name-input">
                    <div className="form-group">
                        <Form.Label><strong>Name Task Type:</strong></Form.Label>

                        <Form.Control
                            required
                            type="text"
                            className="form-control mb-2"
                            placeholder="Type Name"
                            value={newTypes.name}
                            onChange={(evt) => {
                                const copy = { ...newTypes }
                                copy.name = evt.target.value
                                setNewTypes(copy)
                            }
                            } />
                    </div>
                </Form.Group>
                <Form.Group controlId="assign-location-dropdown">
                    <Form.Label><strong>Choose a Location:</strong></Form.Label>
                    <Form.Select className="form-group mb-3"
                        onChange={
                            (evt) => {
                                const copy = { ...newTypes }
                                copy.locationId = evt.target.value
                                setNewTypes(copy)
                            }
                        }>
                        <option value={0}>Assign a Location</option>
                        {locations.map(
                            (location) => {
                                return <option
                                    name="location"
                                    className="form-control dropdown"
                                    value={location.id}
                                    key={`locations--${location.id}`}
                                >{location.location}</option>
                            }
                        )}
                    </Form.Select>

                </Form.Group>
                <div className="d-grid mb-2"><Button variant="success" type="submit" className="btn__new-task" onClick={(ClickEvent) => createNewTaskType(ClickEvent)}>Create New Task</Button></div>
                <div className="d-grid"><Button type="button" onClick={() => navigate("/tasks")}>Return to Task List</Button></div>
            </Form >

        </Container>
    )
}

