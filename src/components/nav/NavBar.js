import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { AdminNav } from "./AdminNav"
import "./NavBar.css"
import { UserNav } from "./UserNav"

export const NavBar = () => {
    const navigate = useNavigate()

    const localDoneUser = localStorage.getItem("done_user")
    const doneUserObject = JSON.parse(localDoneUser)

    if (doneUserObject.admin) {
        return <AdminNav />
    } else {
        return <UserNav />
    }

}