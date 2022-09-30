import { useEffect, useState } from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "./NavBar.css"
// import logoLight from './DoneLight.png'
export const UserNav = () => {

    const navigate = useNavigate()


    return (
        <>
            <Navbar bg="dark" expand="sm" variant="dark">
                <Container>

                    <Navbar.Brand href="/">
                        {/* <img src="logoLight" /> */}
                        DONE<span>&#8253;</span>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="mr__right">
                            <Nav.Link href="/tasks">Tasks</Nav.Link>
                            <Nav.Link href="/tasks/user/create">Create</Nav.Link>
                        </Nav>
                        <Nav className="margin-left">

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
