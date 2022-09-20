import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

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
        <form className="tasks__new-task">
            <h2 className="task__form-title">Create a New Task Type</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="instructions"><strong>Name Task Type Here:</strong></label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter Name..."
                        value={newTypes.name}
                        onChange={(evt) => {
                            const copy = { ...newTypes }
                            copy.name = evt.target.value
                            setNewTypes(copy)
                        }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div><h3>Choose a Location: </h3></div>
                <select className="form-group"
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
                </select>
            </fieldset>

            <button className="btn__new-task" onClick={(ClickEvent) => createNewTaskType(ClickEvent)}>Create New Task</button>
            <button onClick={() => navigate("/tasks")}>Return to Task List</button>
        </form >
    )
}

