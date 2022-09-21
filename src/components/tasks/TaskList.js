import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import "./Tasks.css"
import Button from 'react-bootstrap/Button';


export const TaskList = () => {


    const [tasks, setTasks] = useState([])
    const [users, setUsers] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])
    const [buttonFilter, setButtonFilter] = useState(false)
    const [completeButtonFilter, setCompleteButtonFilter] = useState(false)


    const navigate = useNavigate()


    //get done_user object from local Storage
    const localDoneUser = localStorage.getItem("done_user")
    const doneUserObject = JSON.parse(localDoneUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/users?_sort=fullName`)
                .then(response => response.json())
                .then((usersArray) => {
                    setUsers(usersArray)
                })


        },
        []
    )

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


    //? observe buttonFilter state
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


    //* observe completeButtonFilter state
    useEffect(
        () => {
            if (completeButtonFilter === true) {
                const myFilteredTask = tasks.filter(task => task.completion === true)
                setFilteredTasks(myFilteredTask)
            } else {
                setFilteredTasks(tasks)
            }

        },
        [completeButtonFilter]
    )

    const unCheckButton = () => {

        if (completeButtonFilter === true && doneUserObject.admin === true) {
            setCompleteButtonFilter(false)
        } else if (completeButtonFilter === false && doneUserObject.admin === true) {
            setCompleteButtonFilter(true)
        }
    }
    const unCheckUserButton = () => {

        if (!doneUserObject.admin && completeButtonFilter === false) {
            const myCompleteButtonFilterTask = tasks.filter(task => task.completion === doneUserObject.id)
            setCompleteButtonFilter(true)
        } else if (!doneUserObject.admin && completeButtonFilter === true) {
            const myCompleteButtonFilterTask = tasks.filter(task => task.completion === doneUserObject.id)
            setCompleteButtonFilter(false)
        }
    }



    //~ observes state of tasks and displays task according to login...
    useEffect(
        () => {
            //employees
            if (doneUserObject.admin) {
                setFilteredTasks(tasks)

            } else {
                //customers
                const myTasks = tasks.filter(task => task.userId === doneUserObject.id || task.userId === 0)
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

    //~ isDone is a function that will be invoked within the button code and handle the state of signaling a task as done.
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
            <div className="btn__btn--section1">
                <>
                    {
                        doneUserObject.admin
                            ? <>
                                <Button className="btn btn__tasks" onClick={() => setButtonFilter(false)}>All Tasks</Button>
                                <Button className="btn btn__tasks" onClick={() => setButtonFilter(true)}>My Tasks</Button>
                            </> : <></>
                    }
                </>
            </div>
            <div className="btn__btn--div2">
                <>
                    {
                        doneUserObject.admin
                            ? <>
                                <Button variant="secondary" className="btn btn__create" onClick={() => navigate("/tasks/create")}>Create New Task</Button>
                                <Button variant="dark" className="btn btn__create--type" onClick={() => navigate("/type/create")}>Create Type</Button>
                            </> : <>
                                <Button variant="secondary" className="btn btn__create" onClick={() => navigate("/tasks/user/create")}>User Create</Button>
                            </>
                    }
                </>
            </div>
        </section>
        <section>
            <div className="user__dropdown">
                <>
                    {
                        <>
                            <fieldset>
                                {
                                    doneUserObject.admin
                                        ? <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={completeButtonFilter}
                                                    onChange={unCheckButton} />
                                                Completed
                                            </label>
                                        </div>
                                        : <></>
                                }
                            </fieldset>
                        </>
                    }
                </>
            </div>
        </section>
        {
            <article className="tasks">
                {
                    filteredTasks.map(
                        (task) => {
                            return <section className="task" key={`task--${task.id}`}>
                                <div className="task__manager">
                                    <fieldset className="task__manage--userName">
                                        <div className="task__user-assigned"><header><strong>Assigned to:</strong></header></div>
                                        <div className="task__user-fullName">
                                            <footer>{task?.user?.fullName}</footer>
                                        </div>
                                    </fieldset>
                                    <div className="user__detail">
                                        <h4>click link for details:</h4>
                                        <Link className="user__detail--link" to={`/tasks/${task.id}`}><strong>{task.type.name}</strong></Link>
                                    </div>

                                    <div className="btn__div">
                                        <>
                                            {
                                                doneUserObject.admin
                                                    ? <>
                                                        <Button variant="primary" size="sm" className="btn btn__ticketList btn__update" onClick={() => navigate(`/tasks/update/${task.id}`)}>UPDATE</Button>
                                                        <Button variant="danger" size="sm" className="btn btn__ticketList btn__delete" onClick={(clickEvent) => deleteTaskButton(clickEvent, task)}>DELETE</Button>

                                                    </> : <></>
                                            }
                                        </>
                                        {
                                            task.completion
                                                ? <div className="done__task--complete">Completed!</div>
                                                : <Button variant="success" className="btn btn btn__done" onClick={(clickEvent) => closeTask(clickEvent, task)}><strong><em>un</em>DONE<span>&#8253;</span></strong></Button>
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



{/* <div><h3>Jump To: </h3></div>
<select className="form-group"
    onChange={(evt) => {
        if (evt.target.value === tasks.userId) {
            const myFilteredJumpToTask = tasks.filter(task => task.userId === evt.target.value)
            setFilteredTasks(myFilteredJumpToTask)
        }
    }}
>
    <option value={0}>Choose a Team Member</option>
    {users.map(
        (user) => {
            return <option
                name="location"
                className="form-control dropdown"
                value={user.id}
                key={`user--${user.id}`}
            >{user.fullName}</option>
        }
    )}
</select> */}
