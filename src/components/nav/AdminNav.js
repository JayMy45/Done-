import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "./NavBar.css"

export const AdminNav = () => {
    const navigate = useNavigate()



    return (
        <>
            <Navbar bg="dark" expand="sm" variant="dark">
                <Container>

                    <Navbar.Brand href="/">DONE<span>&#8253;</span></Navbar.Brand>


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
