import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { SERVER_URL } from "../../config.json"
import Swal from "sweetalert2"
import axios from "axios"

const AddItem = ({getItems}) => {
	const userData = JSON.parse(localStorage.getItem('userData'))
	const token = localStorage.getItem('token')
	const [item, setItem] = useState({
		name: "",
		description: "",
		category: "",
		price: "",
		image: "",
	})

	const onChangeHandler = (e) => {
		setItem({
			...item,
			[e.target.name]: e.target.value
		})
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		const formData = new FormData();
        formData.append('image', item.image);
        formData.append('name', item.name);
        formData.append('category', item.category);
        formData.append('description', item.description);
        formData.append('price', item.price);
		axios({
		method: 'POST',
		url: `${SERVER_URL}items`,
		data: formData,
		headers: {
			"Content-Type": "multipart/form-data",
			"x-auth-token": token
		}
	})
	.then(res => {


		Swal.fire("success",res.data.msg,"success")
		getItems()
	})
	.catch(e => console.error(e))

	}

	const handlePhoto = (e) =>{
		setItem({...item,image:e.target.files[0]})
	}


	return(
		<div className="col-md-6 mx-auto">
			<Form onSubmit={onSubmitHandler} method="POST" encType="multipart/form-data">
			<Form.Group>
					<Form.Label>Image</Form.Label>
					<Form.Control type="file" accept=".png, .jpg, .jpeg" name="image" onChange={handlePhoto}/>
			</Form.Group>
			<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control type="text" name="name" value={item.name} onChange={onChangeHandler}/>
			</Form.Group>
			<Form.Group>
					<Form.Label>Description</Form.Label>
					<Form.Control type="text" name="description" value={item.description} onChange={onChangeHandler}/>
			</Form.Group>
			<Form.Group>
					<Form.Label>Category</Form.Label>
					<Form.Control type="text" name="category" value={item.category} onChange={onChangeHandler}/>
			</Form.Group>
			<Form.Group>
					<Form.Label>Price</Form.Label>
					<Form.Control type="number" name="price" value={item.price} onChange={onChangeHandler}/>
			</Form.Group>
				<Button variant="success" type="submit">Add Item</Button>
			</Form>
		</div>
	)
}

export default AddItem