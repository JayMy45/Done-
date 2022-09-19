import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Tasks.css"

export const TaskList = ({ }) => {


    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])
    const [buttonFilter, setButtonFilter] = useState(false)

    const navigate = useNavigate()


    //get done_user object from local Storage
    const localDoneUser = localStorage.getItem("done_user")
    const doneUserObject = JSON.parse(localDoneUser)

    //~ initial tasks state set to task with expanded types and user from database
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


    //?observe buttonFilter state
    useEffect(
        () => {
            if (buttonFilter === true) {
                const myFilteredTask = tasks.filter(task => task.userId === doneUserObject.id)
                setFilteredTasks(myFilteredTask)
            } else {
                setFilteredTasks(tasks)
            }

        },
        [buttonFilter]
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
    const deleteTaskButton = (event, task) => {
        //needed to add task as a parameter (along with the clickEvent) in order to capture the task Object being chosen
        return fetch(`http://localhost:8088/tasks/${task.id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8088/tasks?_expand=type&_expand=user`)
                    .then(response => response.json())
                    .then((taskArray) => {
                        setTasks(taskArray)
                    })
            },
                []
            )

    }

    //isDone is a function that will be invoked within the code and handle the state of signaling a task as done.
    const closeTask = (event, task) => {

        const toBeSavedToAPI = {
            userId: task.userId,
            completion: true,
            instructions: task.instructions,
            typeId: task.typeId
        }
        return fetch(`http://localhost:8088/tasks/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toBeSavedToAPI)
        })
            .then(response => response.json())
            .then(() => {
                fetch(`http://localhost:8088/tasks?_expand=type&_expand=user`)
                    .then(response => response.json())
                    .then((taskArray) => {
                        setTasks(taskArray)
                    })
            },
                []
            )

    }

    return <><h2>List of Tasks</h2>
        <section className="btn__btn--section">
            <div>
                <>
                    {
                        doneUserObject.admin
                            ? <>
                                <button className="btn btn__tasks" onClick={() => setButtonFilter(false)}>All Tasks</button>
                                <button className="btn btn__tasks" onClick={() => setButtonFilter(true)}>My Tasks</button>
                            </> : <></>
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
                                                        <button className="btn btn__ticketList btn__delete" onClick={(clickEvent) => deleteTaskButton(clickEvent, task)}>DELETE</button>

                                                    </> : <></>
                                            }
                                        </>
                                        {
                                            task.completion
                                                ? <div className="done__task--complete">Completed!</div>
                                                : <button className="btn btn btn__done" onClick={(clickEvent) => closeTask(clickEvent, task)}><strong><em>un</em>DONE<span>&#8253;</span></strong></button>
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

