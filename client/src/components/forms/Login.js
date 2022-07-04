import React, {useState} from "react"
import { Form, Button } from "react-bootstrap"
import { SERVER_URL } from "../../config.json"
import Swal from "sweetalert2"
import { useHistory } from "react-router-dom"

const Login = ({handleLogin}) => {
	const history = useHistory()
	const [user, setUser] = useState({
		email: "",
		password: ""
	})

	const onChangeHandler = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		fetch(`${SERVER_URL}users/login`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		})
		.then(res => res.json())
		.then(token => {
			handleLogin(token)
			history.push("/")
		})
        .catch(e => {
            Swal.fire(
                'not successful',
                e.msg,
                'error'
            )
        })
	}

	return(
		<div className="col-md-6 mx-auto">
			<h2 className="text-center"> Login Page </h2>
			<Form onSubmit={onSubmitHandler} method="POST">
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control type="text" name="email" value={user.email} onChange={onChangeHandler}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" value={user.password} onChange={onChangeHandler}/>
				</Form.Group>
				<Button variant="success" type="submit">Login</Button>
			</Form>
		</div>
	)
}

export default Login