import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {

    const navigate = useNavigate()

    //get done_user object from local Storage
    const localDoneUser = localStorage.getItem("done_user")
    const doneUserObject = JSON.parse(localDoneUser)

    doneUserObject.admin
        ? <AdminNav />
        : <UserNav />
}
