import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "./NavBar.css"

export const UserNav = () => {

    const navigate = useNavigate()

    return (
        <>
            <Navbar bg="dark" expand="sm" variant="dark">
                <Container>

                    <Navbar.Brand href="/">DONE<span>&#8253;</span></Navbar.Brand>

                    <Nav className="mr__right">
                        <Nav.Link href="/tasks">Tasks</Nav.Link>
                    </Nav>
                    <Nav className="mr__left">
                        <Nav.Link href="" onClick={() => {
                            localStorage.removeItem("done_user")
                            navigate("/", { replace: true })
                        }}>Logout</Nav.Link>

                    </Nav>

                </Container>
            </Navbar>

        </>

    )
}
