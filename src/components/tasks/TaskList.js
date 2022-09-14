import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Tasks.css"

export const TaskList = () => {

    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])
    const [users, setUsers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/tasks`) //go get all tickets
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
            fetch(`http://localhost:8088/users`) //go get all tickets
                .then(response => response.json()) //get response back from server
                .then((userArray) => {
                    setUsers(userArray)  //setTickets is deconstructed above...a function...
                })

            // console.log("Initial state of tickets", tickets) //view the initial state of tickets  (one is a string the other a parameter from deconstructed variable above)
        },
        []
    )


    useEffect(
        () => {
            setFilteredTasks(tasks)
        },
        [tasks]
    )



    return <><h2>List of Tasks</h2>
        <section className="btn__btn--section">
            <div>
                <button className="btn btn__tasks">All Tasks</button>
                <button className="btn btn__tasks">My Tasks</button>
            </div>
            <div className="btn__btn--div2">
                <button className="btn btn__create" onClick={() => navigate("/tasks/create")}>Create</button>
            </div>
        </section>

        {
            <article className="tasks">
                <h2>LIST OF TASKS</h2>
                {
                    filteredTasks.map(
                        (task) => {
                            return <section className="task" key={`task--${task.id}`}>
                                <div className="task__manager">
                                    <button className="btn btn__assign">Assign a Task</button>
                                    <Link className="navbar__link" to="/tasks/details"><strong>Task Name</strong></Link>
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

