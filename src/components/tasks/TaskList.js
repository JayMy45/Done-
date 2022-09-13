import { useEffect, useState } from "react"

export const TaskList = () => {

    const [tasks, setTasks] = useState([])

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

    return <><h2>List of Tasks</h2>
        <button>All Tasks</button>
        <button>My Tasks</button>
    </>
}

