import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Tasks.css"

export const TaskList = ({ }) => {

    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])

    const localDoneUser = localStorage.getItem("done_user")
    const doneUserObject = JSON.parse(localDoneUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/tasks?_expand=type&_expand=user`) //go get all tickets
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
            //employees
            if (doneUserObject.admin) {
                setFilteredTasks(tasks)

            } else {
                //customers
                const myTasks = tasks.filter(task => task.userId === doneUserObject.id)
                setFilteredTasks(myTasks)
            }
        },
        [tasks]
    )

    const deleteTaskButton = (task) => {
        return fetch(`http://localhost:8088/tasks/${task.id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8088/tasks?_expand=type`) //go get all tickets
                    .then(response => response.json()) //get response back from server
                    .then((taskArray) => {
                        setTasks(taskArray)  //setTickets is deconstructed above...a function...
                    })
            })
    }



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
                                        <div className="task__user-assigned"><header><strong>Assigned to:</strong></header></div>
                                        <div className="task__user-fullName">
                                            <footer>{task?.user?.fullName}</footer>
                                        </div>
                                    </fieldset>

                                    <Link className="navbar__link" to={`/tasks/${task.id}`}><strong>{task.type.name}</strong></Link>
                                    <button className="btn btn__ticketList btn__update" onClick={() => navigate(`/tasks/update/${task.id}`)}>UPDATE</button>
                                    <button className="btn btn__ticketList btn__delete" onClick={() => deleteTaskButton(task)}>DELETE</button>
                                    <button className="btn btn btn__done"><strong>DONE<span>&#8253;</span></strong></button>



                                </div>
                            </section>
                        }
                    )
                }
            </article >
        }
    </>
}

