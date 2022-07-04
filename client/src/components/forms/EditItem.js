import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { SERVER_URL } from "../../config.json"
import Swal from "sweetalert2"
import axios from "axios"

const EditItem = ({data, getItems, setEditing}) => {
	const [updatedItem, setUpdatedItem] = useState({
		name: data.name,
		description: data.description,
		category: data.category,
		price: data.price,
		image: data.image
	})
	console.log(updatedItem.image)

	const onChangeHandler = (e) => {
		setUpdatedItem({
			...updatedItem,
			[e.target.name]: e.target.value
		})
	}

	const token = localStorage.getItem('token')

	const onSubmitHandler = (e) => {
		e.preventDefault()
		const formData = new FormData();
        formData.append('image', updatedItem.image);
        formData.append('name', updatedItem.name);
        formData.append('category', updatedItem.category);
        formData.append('description', updatedItem.description);
        formData.append('price', updatedItem.price);
		axios({
		method: 'PUT',
		url: `${SERVER_URL}items/${data._id}`,
		data: formData,
		headers: {
			"Content-Type": "multipart/form-data",
			"x-auth-token": token
		}
	})
	.then(res => {
		Swal.fire("success",res.data.msg,"success")
		setEditing(false)
		getItems()
	})
	.catch(e => console.error(e))

	}

	const handlePhoto = (e) =>{
		setUpdatedItem({...updatedItem,image:e.target.files[0]})
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
					<Form.Control type="text" name="name" value={updatedItem.name} onChange={onChangeHandler}/>
			</Form.Group>
			<Form.Group>
					<Form.Label>Description</Form.Label>
					<Form.Control type="text" name="description" value={updatedItem.description} onChange={onChangeHandler}/>
			</Form.Group>
			<Form.Group>
					<Form.Label>Category</Form.Label>
					<Form.Control type="text" name="category" value={updatedItem.category} onChange={onChangeHandler}/>
			</Form.Group>
			<Form.Group>
					<Form.Label>Price</Form.Label>
					<Form.Control type="number" name="price" value={updatedItem.price} onChange={onChangeHandler}/>
			</Form.Group>
				<Button variant="success" type="submit">Update</Button>
			</Form>
		</div>
	)
}

export default EditItem