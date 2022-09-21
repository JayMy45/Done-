import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
// import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()



    return (
        <>
            <Navbar bg="success" expand="sm" variant="">
                <Container>
                    <Nav>
                        <Navbar.Brand href="/">DONE<span>&#8253;</span></Navbar.Brand>
                        <Nav.Link href="/tasks">Tasks</Nav.Link>
                        <NavDropdown title="Create">
                            <NavDropdown.Item href='/tasks/create'>New Task</NavDropdown.Item>
                            <NavDropdown.Item href='/type/create'>New Type</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav.Link href="" onClick={() => {
                        localStorage.removeItem("done_user")
                        navigate("/", { replace: true })
                    }}>Logout</Nav.Link>
                </Container>
            </Navbar>
        </>

    )
}



        // <ul className="navbar">
        //     <li className="navbar__item active">
        //         <Link className="navbar__link" to="/tasks">Tasks</Link>
        //     </li>
        //     {
        //         localStorage.getItem("honey_user")
        //             ? <li className="navbar__item navbar__logout">
        //                 <Link className="navbar__link" to="" onClick={() => {
        //                     localStorage.removeItem("honey_user")
        //                     navigate("/", { replace: true })
        //                 }}>Logout</Link>
        //             </li>
        //             : ""
        //     }
        // </ul>