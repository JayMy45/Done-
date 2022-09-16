import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./Tasks.css"

export const TaskList = ({ }) => {

    const navigate = useNavigate()
    const { taskId } = useParams()

    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])
    const [updates, setUpdates] = useState({
        completion: ""
    })

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

    const localDoneUser = localStorage.getItem("done_user")
    const doneUserObject = JSON.parse(localDoneUser)

    //& initial tasks state set to task with expanded types and user from database
    useEffect(
        () => {
            fetch(`http://localhost:8088/tasks?_expand=type&_expand=user`)
                .then(response => response.json())
                .then((taskArray) => {
                    setTasks(taskArray)
                })


        },
        []
    )

    //~ observes state of tasks and displays task according to login...
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

    //! function runs when delete button is clicked...Deleting the task from API
    const deleteTaskButton = (task) => {
        return fetch(`http://localhost:8088/tasks/${task.id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8088/tasks?_expand=type`) //go get all tickets
                    .then(response => response.json()) //get response back from server
                    .then((taskArray) => {
                        setTasks(taskArray)  //setTickets is deconstructed above...a function...
                        navigate(`/tasks`)
                    })
            })
    }

    //isDone is a function that will be invoked within the code and handle the state of signalling a task as done.



    const closeTask = () => {

        const toBeSavedToAPI = {
            userId: updates.userId,
            completion: true,
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
                navigate("/tasks")
            })
    }


    return <><h2>List of Tasks</h2>
        <section className="btn__btn--section">
            <div>
                <>
                    {
                        doneUserObject.admin
                            ? <>

                                <button className="btn btn__tasks" onClick={() => navigate("/tasks")}>All Tasks</button>
                                <button className="btn btn__tasks" onClick={() => {
                                    if (doneUserObject.id === filteredTasks.userId) {
                                        const myTask = tasks.filter(task => doneUserObject.id === task.userId)
                                        setFilteredTasks(myTask)

                                    }
                                }}>My Tasks</button>

                            </>
                            : <></>

                    }
                </>
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
                                    <div className="btn__div">
                                        <>
                                            {
                                                doneUserObject.admin
                                                    ? <>
                                                        <button className="btn btn__ticketList btn__update" onClick={() => navigate(`/tasks/update/${task.id}`)}>UPDATE</button>
                                                        <button className="btn btn__ticketList btn__delete" onClick={() => deleteTaskButton(task)}>DELETE</button>

                                                    </>
                                                    : <></>

                                            }
                                        </>

                                        {
                                            task.completion
                                                ? ""
                                                : <button className="btn btn btn__done" onClick={closeTask}><strong>DONE<span>&#8253;</span></strong></button>
                                        }
                                    </div>


                                </div>
                            </section>
                        }
                    )
                }
            </article >
        }
    </>
}

