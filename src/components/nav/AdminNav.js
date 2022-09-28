import { useNavigate } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import "./NavBar.css"

export const AdminNav = () => {
    const navigate = useNavigate()



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
