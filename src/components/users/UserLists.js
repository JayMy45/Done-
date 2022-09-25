import { useEffect, useState } from "react"
import { User } from "./User"


export const UserLists = () => {

    //this module will export User information using props.
    //it will useState and useEffects specifically to iterate through users in database.
    //initially this is for creating functionality in drop down for assigning users to a task.

    const [users, setUsers] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/users?_sort=fullName`) //go get all tickets
                .then(response => response.json()) //get response back from server
                .then((userArray) => {
                    setUsers(userArray)  //setTickets is deconstructed above...a function...
                })

            // console.log("Initial state of tickets", tickets) //view the initial state of tickets  (one is a string the other a parameter from deconstructed variable above)
        },
        []
    )
    console.log(users)
    return <article className="user">

        {
            users.map((user) => <User key={`user--${user.id}`}
                id={user.id}
                fullName={user?.fullName}
                email={user.email} />)
        }


    </article>

}