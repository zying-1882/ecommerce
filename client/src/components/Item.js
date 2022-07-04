import React, { useState } from "react"
import {Card, Button, InputGroup} from "react-bootstrap"
import { Link } from "react-router-dom"
import { SERVER_URL } from "../config.json"
import Swal from "sweetalert2"
import EditItem from "./forms/EditItem"


const Item = ({data, getItems}) => {
	const userData = JSON.parse(localStorage.getItem('userData'))
	// console.log(userData)
	const token = localStorage.getItem("token")
	const [editing, setEditing] = useState(false)
	const [items, setCartItem] = useState([]);
	const [cart, setCart] = useState({
        itemId: data._id,
        quantity: ""
    })

    const addToCartHandler = () => {
	        fetch (`${SERVER_URL}carts`, {
	            method:'POST',
	            headers: {
	                "Content-Type": "application/json",
	                "x-auth-token": token
	            },
	            body: JSON.stringify(cart)
	        })
	            .then(res => res.json())
	            .then(data => {
	                console.log(data)
	            })
	    }

	    const onChangeHandler = (e) => {
        setCart({
            ...cart,
            [e.target.name]: e.target.value
        })
    }


	const URL = `./${data._id}`

	const deleteHandler = (e) => {
		Swal.fire({
		  title: 'Are you sure?',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.isConfirmed) {
			fetch(`${SERVER_URL}items/${data._id}`, {
				method: "DELETE",
				headers: {
					"x-auth-token": token
				}
			})
			.then(res => res.json())
			.then(data => {
				Swal.fire(
					'Deleted',
					data.msg,
					'success'
				)
				getItems()
			})
		  }
		})
	}

	return(
		<Card className="m-4" style={{ width: '18rem'}}>
			{
				editing ? <EditItem data={data} getItems={getItems} setEditing={setEditing}/> :
				<Card.Body>
					<Card.Img variant="top" encType="multipart/public" src={SERVER_URL + data.image} />
					<React.Fragment><a href={URL}>{data.name}</a></React.Fragment>
					<Card.Text>{data.description}</Card.Text>
					<Card.Text>{data.category}</Card.Text>
					<Card.Text>{data.price}</Card.Text>
				</Card.Body>
			}

			{
	                userData !== null && userData.user.isAdmin === true ?
	               <React.Fragment>
					<Button variant="warning" onClick={() => setEditing(!editing)}>
						{editing ? "Cancel" : "Edit"} 
					</Button>
					<Button variant="danger" onClick={deleteHandler} >Delete</Button>
				</React.Fragment>
	                :
					<React.Fragment>
							<Card.Footer>
	                        <div className="mx-1">
	                            <InputGroup className="mb-3 mx-auto">
	                                <InputGroup.Append>
	                                <Button variant="success" onClick={() => addToCartHandler(data._id)} >Add To Cart</Button>

	                                </InputGroup.Append>
	                                <input
	                                  placeholder="Quantity"
	                                  type="number"
	                                  name="quantity"
	                                  className="quantityInput"
	                                  onChange={onChangeHandler}
	                                />
	                              </InputGroup>
	                        </div>
	                        </Card.Footer>
	                    </React.Fragment>
	            }
			

		</Card>
	)
}

export default Item

