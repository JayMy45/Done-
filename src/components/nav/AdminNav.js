import { useNavigate } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { useEffect, useState } from "react"
import "./NavBar.css"

export const AdminNav = () => {
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const localDoneUser = localStorage.getItem("done_user")
    const doneUserObject = JSON.parse(localDoneUser)

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

    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">

                <Container>
                    <Navbar.Brand href="/">
                        <span id="done__text-Nav">DONE<span>&#8253;</span></span> <span className="admin-text">Admin</span>
                    </Navbar.Brand>


                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="mr__right">
                            <Nav.Link href="/tasks">Tasks</Nav.Link>
                            <NavDropdown title="Create">
                                <NavDropdown.Item href='/tasks/create'>New Task</NavDropdown.Item>
                                <NavDropdown.Item href='/type/create'>New Type</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="margin-left">
                            <div className="">
                                {
                                    users.map(
                                        (user) => {
                                            if (doneUserObject.id === user.id)
                                                return <label className="font-size-AdminNav" key={`user--${user.id}`}
                                                >Welcome: <strong>{user.fullName}</strong></label>
                                        })
                                }
                            </div>
                        </Nav>
                        <Nav className="mr__left">
                            <Nav.Link href="" onClick={() => {
                                localStorage.removeItem("done_user")
                                navigate("/", { replace: true })
                            }}>Logout</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>


                </Container>
            </Navbar>
        </>

    )
}
