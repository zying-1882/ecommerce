import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { SERVER_URL } from "../../config.json"
import Swal from "sweetalert2"

const Register = () => {
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: "",
        password2: ""
    })

    const onChangeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        if(user.password < 8) return Swal.fire("Error", "Password must be greater than 8 characters", "error")

        if(user.password !== user.password2) return Swal.fire("Error", "Password and confirm password must match", 'error')

        fetch(`${SERVER_URL}users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire(
                'Success!',
                data.message,
                'success'
            )
            setUser({
                fullname: "",
                email: "",
                password: "",
                password2: ""
            })
        })
        .catch(e => {
            Swal.fire(
                'Error',
                e.message,
                'error'
            )
        })
    }

    return(
        <div className="col-md-6 mx-auto">
            <h2 className="text-center"> Register Form</h2>
            <Form onSubmit={onSubmitHandler} method="POST">
                <Form.Group>
                    <Form.Label>Full name</Form.Label>
                    <Form.Control type="text" name="fullname" value={user.fullname} onChange={onChangeHandler}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" value={user.email} onChange={onChangeHandler}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={user.password} onChange={onChangeHandler}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="password2" value={user.password2} onChange={onChangeHandler}/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default Register