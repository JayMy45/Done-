import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("jnmyers09@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("done_user", JSON.stringify({
                        id: user.id,
                        admin: user.isAdmin
                    }))

                    navigate("/tasks")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">

            <Container >
                <Form className="form--login mb-3" onSubmit={handleLogin}>
                    <h1>DONE<span>&#8253;</span></h1>
                    <h2>Please sign in</h2>
                    <div className="jumbotron">
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputEmail"> Email address </Form.Label>
                            <Form.Control type="email"
                                value={email}
                                onChange={evt => set(evt.target.value)}
                                className="form-control"
                                placeholder="Email address"
                                required autoFocus />
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Button variant='success' type="submit">
                                Sign in
                            </Button>
                        </Form.Group>

                        <section className="link--register">
                            <Link to="/register">Not a member yet?</Link>
                        </section>
                    </div>
                </Form>
            </Container>

        </main >
    )
}

