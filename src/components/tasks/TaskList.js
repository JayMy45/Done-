import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Tasks.css"

export const TaskList = ({ }) => {

    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])
    const [users, setUsers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/tasks?_expand=type`) //go get all tickets
                .then(response => response.json()) //get response back from server
                .then((taskArray) => {
                    setTasks(taskArray)  //setTickets is deconstructed above...a function...
                })

            // console.log("Initial state of tickets", tickets) //view the initial state of tickets  (one is a string the other a parameter from deconstructed variable above)
        },
        []
    ) // 

    useEffect(
        () => {
            setFilteredTasks(tasks)
        },
        [tasks]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
                .then(response => response.json())
                .then((userArray) => {
                    setUsers(userArray)
                })

            // console.log("Initial state of tickets", tickets) //view the initial state of tickets  (one is a string the other a parameter from deconstructed variable above)
        },
        []
    )


    return <><h2>List of Tasks</h2>
        <section className="btn__btn--section">
            <div>
                <button className="btn btn__tasks" onClick={() => navigate("/tasks/users")}>All Tasks</button>
                <button className="btn btn__tasks">My Tasks</button>
            </div>
            <div className="btn__btn--div2">
                <button className="btn btn__create" onClick={() => navigate("/tasks/create")}>Create</button>
            </div>
        </section>

        {
            <article className="tasks">
                <h3>Task List</h3>
                {
                    filteredTasks.map(
                        (task) => {
                            return <section className="task" key={`task--${task.id}`}>
                                <div className="task__manager">

                                    <fieldset>
                                        <div className="form-group">
                                            <label htmlFor="doneUser"></label>
                                            <select id="doneUser" value={users.id}

                                                onChange={(evt) => {
                                                    const copy = { ...users }
                                                    copy.productTypeId = evt.target.value
                                                    setUsers(copy)
                                                }}
                                            >
                                                <option value={0}>Assign a User</option>
                                                {
                                                    users.map(user => {
                                                        return <option value={user.id} key={`user--${user.id}`}>{user.fullName}</option>
                                                    })
                                                }
                                            </select>

                                        </div>
                                    </fieldset>

                                    <Link className="navbar__link" to={`/tasks/${task.id}`}><strong>{task.type.name}</strong></Link>
                                    <button className="btn btn__update" onClick={() => navigate("/tasks/update")}>UPDATE</button>
                                    <button className="btn btn__delete" onClick={() => navigate("/tasks/delete")}>DELETE</button>


                                </div>
                            </section>
                        }
                    )
                }
            </article >
        }
    </>
}

