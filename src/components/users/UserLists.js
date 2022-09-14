import { useEffect, useState } from "react"

export const UserLists = () => {

    //this module will export User information using props.
    //it will useState and useEffects specifically to iterate through users in database.
    //initially this is for creating functionality in drop down for assigning users to a task.

    const [users, setUsers] = useState([])


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
    return <>
        {
            <fieldset>
                <div className="form-group">
                    <label htmlFor="doneUser">Product type:</label>
                    <select id="doneUser" value={users.id}

                        onChange={(evt) => {
                            const copy = { ...users }
                            copy.productTypeId = evt.target.value
                            setUsers(copy)
                        }}
                    >
                        <option value={0}>Please choose a type...</option>
                        {
                            users.map(user => {
                                return <option value={user.id}>{user.fullName}</option>
                            })
                        }
                    </select>

                </div>
            </fieldset>

        }
    </>

}