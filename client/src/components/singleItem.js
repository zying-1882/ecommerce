import React, { useState } from "react"
import {Card, Button} from "react-bootstrap"
import { SERVER_URL } from "../config.json"
import Swal from "sweetalert2"
import EditItem from "./forms/EditItem"

const SingleItem = ({data}) => {
	const userData = JSON.parse(localStorage.getItem('userData'))
	// console.log(userData)
	const token = localStorage.getItem("token")
	const [editing, setEditing] = useState(false)

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
			})
		  }
		})
	}

	return(
		<Card className="m-4" style={{ width: '18rem'}}>
			{
				editing ? <EditItem data={data}/> :
				<Card.Body>
					<Card.Img variant="top" encType="multipart/public" src={SERVER_URL + data.image} />
					<Card.Text>{data.name}</Card.Text>
					<Card.Text>{data.description}</Card.Text>
					<Card.Text>{data.category}</Card.Text>
					<Card.Text>{data.price}</Card.Text>
				</Card.Body>
			}

              {
              	<div>
                 <button className="btn btn-sm btn-success float-right" 
                    onClick="submit">Add to cart</button>
                 <input type="number" value="" name="quantity" 
                   /* onChange={handleInputChange}*/ className="float-left" 
                    style={{ width: "100px", marginLeft: "10px", borderRadius: "1px"}}/>
              </div> 
              }

			{
				//userData !== null && userData.user.id === data.user && userData.user.isAdmin === true ? 
				<React.Fragment>
					<Button variant="warning" onClick={() => setEditing(!editing)}>
						{editing ? "Cancel" : "Edit"} 
					</Button>
					<Button variant="danger" onClick={deleteHandler}>Delete</Button>
				</React.Fragment> //: null
			}

		</Card>
	)
}

export default SingleItem

