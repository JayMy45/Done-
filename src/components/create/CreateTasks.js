import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logoAdminLg from "/Users/jeremymyers/workspace/done-capstone/src/Done.Admin.lg.ppt.png"
import poweredByDone from "/Users/jeremymyers/workspace/done-capstone/src/PoweredbyDone.admin.png"



export const CreateTasks = () => {

  const navigate = useNavigate()

  const [users, setUsers] = useState([])
  const [types, setTypes] = useState([])



  useEffect(
    () => {
      fetch(`http://localhost:8088/types?_sort=name`)
        .then(response => response.json())
        .then((typesArray) => {
          setTypes(typesArray)
        })


    },
    []
  )

  useEffect(
    () => {
      fetch(`http://localhost:8088/users?_sort=fullName`)
        .then(response => response.json())
        .then((usersArray) => {
          setUsers(usersArray)
        })


    },
    []
  )

  // This module will create a new task by updating/POST to database directly

  /*
    assignments: [
      {
        id: int,
        userId: int,
        taskId: int
      }
    ],

     tasks: [
      {

        userId: int,
        completion: boolean,
        instructions: "",
        typeId: int
      }
    ]
  */

  //initial state of newTasks will provide the following information:
  const [newTasks, setNewTasks] = useState({
    userId: 0,
    completion: false,
    instructions: "",
    typeId: 0
  })


  const createNewTasks = (event) => {
    event.preventDefault()

    const newTaskDatabase = {
      userId: parseInt(newTasks.userId),
      completion: false,
      instructions: newTasks.instructions,
      typeId: parseInt(newTasks.typeId)
    }

    const newAssignmentDatabase = {
      userId: parseInt(newTasks.userId),
      //only need userId here.  taskId will be added in first POST.
    }


    fetch(`http://localhost:8088/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTaskDatabase)
    })
      .then(response => response.json())
      .then((newTaskObject) => {
        //update updatedHire State...
        newAssignmentDatabase.taskId = newTaskObject.id //add taskId to newAssignmentDatabase

        fetch(`http://localhost:8088/assignments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newAssignmentDatabase)
        })
          .then(response => response.json())
          .then((newAssignmentUpdate) => {
            navigate("/tasks")
          }
          )
      }
      )
  }

  return (
    <Container id="type__container" className="d-grid h-25 w-50">
      <Form className="tasks__new-task jumbotron">
        <Row>
          <Row className="mb-3">
            <h2 className="task__form-title">Assign New Task</h2>
          </Row>
          <Col md={6}>

            <Row>
              <Form.Group>
                <div className="form-group mb-3">
                  <Form.Label htmlFor="instructions"><strong>Enter Instructions Here:</strong></Form.Label>
                  <Form.Control
                    required autoFocus
                    as="textarea"
                    style={{ height: "10rem" }}
                    className="form-control"
                    placeholder="Enter Instructions..."
                    value={newTasks.instructions}
                    onChange={(evt) => {
                      const copy = { ...newTasks }
                      copy.instructions = evt.target.value
                      setNewTasks(copy)
                    }
                    } />
                </div>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group className="mb-3">
                <div><Form.Label><strong>Choose a Team Member:</strong></Form.Label></div>
                <Form.Select className="form-group"
                  onChange={
                    (evt) => {
                      const copy = { ...newTasks }
                      copy.userId = evt.target.value
                      setNewTasks(copy)
                    }
                  }>
                  <option value={0}>Assign a Team Member</option>
                  {users.map(
                    (user) => {
                      return <option
                        name="location"
                        className="form-control dropdown"
                        value={user.id}
                        key={`user--${user.id}`}
                      >{user.fullName}</option>
                    }
                  )}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group className="" id="done__task--type">
                <div><Form.Label><strong>Choose a Task Type</strong></Form.Label></div>
                <Form.Select className="form-group"
                  onChange={
                    (evt) => {
                      const copy = { ...newTasks }
                      copy.typeId = evt.target.value
                      setNewTasks(copy)
                    }
                  }>
                  <option value={0}>Tasks...</option>
                  {types.map(
                    (type) => {
                      return <option
                        name="type"
                        className="form-control dropdown"
                        value={type.id}
                        key={`type--${type.id}`}
                      >{type.name}</option>
                    }
                  )}
                </Form.Select>
              </Form.Group>
            </Row>
          </Col>

          <Col md={6}>
            <Row className="">
              <Form.Group className="mb-4">
                <div>
                  <img src={logoAdminLg} className="img__admin--lg-create" width="240" height="200" alt="Done Logo" />
                </div>
              </Form.Group>
            </Row>

            <Row className="done__btn-row">
              <Button className="btn_return-taskList mb-4" variant="info" id="btn_rtn" type="button" onClick={() => navigate("/tasks")}>Return to Task List</Button>
              <Button className="btn_create-task" variant="success" onClick={(ClickEvent) => createNewTasks(ClickEvent)}>Create New Task</Button>
            </Row>
          </Col>

        </Row>
      </Form >

      <Row>
        <Form.Label className="powered__by-bottom">
          <h6 className="powered-by">Powered by  <img src={poweredByDone} className="" width="55" height="50" alt="Powered By Done Logo" /></h6>
        </Form.Label>
      </Row>

    </Container>
  )
}

