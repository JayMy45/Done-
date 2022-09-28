import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "./Login.css"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: "",
        isAdmin: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("done_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isAdmin
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = { ...customer }
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main>
            <Container id="type__container" className="d-grid h-25 w-50">
                <Form className="form--login tasks__new-task w-100  jumbotron" id="type__form" onSubmit={handleRegister}>
                    <Row className="mb-2">
                        <h1 id="done__register" className="h3 mb-4 font-weight-normal">Please Register for DONE<span>&#8253;</span></h1>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label htmlFor="fullName"> Full Name </Form.Label>
                            <Form.Control onChange={updateCustomer}
                                type="text" id="fullName" className="form-control mb-3"
                                placeholder="Enter your name" required autoFocus />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="email"> Email address </Form.Label>
                            <Form.Control onChange={updateCustomer}
                                type="email" id="email" className="form-control mb-3"
                                placeholder="Email address" required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="phoneNumber"> Phone Number </Form.Label>
                            <Form.Control onChange={updateCustomer}
                                type="tel" id="phoneNumber" className="form-control mb-3"
                                placeholder="Phone Number" maxLength={10} required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Check onChange={(evt) => {
                                const copy = { ...customer }
                                copy.isAdmin = evt.target.checked
                                setCustomer(copy)
                            }}
                                type="checkbox" id="isAdmin" label="Parent" />
                        </Form.Group>

                    </Row>
                    <Row>

                        <Col>
                            <Button id="btn_btn-Register" variant="success" type="submit"> Register </Button>
                        </Col>
                        <Col>
                            <Button id="btn_btn-Register" type="button" onClick={() => navigate("/")}> Back to Login </Button>
                        </Col>

                    </Row>
                </Form>
            </Container>
        </main >
    )
}

