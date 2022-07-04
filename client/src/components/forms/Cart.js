import React from "react"
import { Table, Button } from "react-bootstrap"
import Swal from "sweetalert2"
import { SERVER_URL } from '../../config.json'
// import Item from "./Item"

const Cart = ({ data, getItem }) => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const token = localStorage.getItem("token")

    const checkoutHandler = () => {
        Swal.fire({
            title: "You sure you wanna checkout?",
            text: "Please say yes, I need money",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "CheckOut!"
        })  
        .then((result) => {
            if (result.isConfirmed) {
                fetch(`${SERVER_URL}/orders`, {
                    method: 'POST',
                    headers: {
                        "x-auth-token": localStorage.getItem("token")
                    }
                })
                .then(res => res.json())
                .then(data => {
                    Swal.fire({
                        title: "Checkout successful!",
                        text: "You did it!",
                        icon: 'success'
                    })
                    getItem()
                })
            }
        })
    }

    const deleteHandler = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`${SERVER_URL}carts/${data.items_id}`, {
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
                //getItems()
            })
          }
        })
    }
        
    return (
        <div className='container' >
            <h2 className='text-center mt-5'>Your Cart</h2>
            <Table className='cartTable'>
                <thead>
                    <tr>
                        <th><b>Name</b></th>
                        <th><b>Quantity</b></th>
                        <th><b>Price</b></th>
                        <th><b>Subtotal</b></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(cart => {
                        return (
                            <>
                            <tr key={cart._id} >
                                <td><h5>{cart.name}</h5></td>
                                <td><h5>{cart.quantity}</h5></td>
                                <td><h5>{cart.price}</h5></td>
                                <td><h5>{cart.subtotal}</h5></td>
                                <td>
                                    {
                                        <React.Fragment>
                                            <Button variant="danger" onClick={deleteHandler} >Delete</Button>
                                        </React.Fragment>
                                    }
                                </td>
                            </tr>
                            
                            </>
                        )
                    })}
                </tbody>
            </Table>
            <h3>Total: {data.total}</h3>
            <Button onClick={checkoutHandler}>Checkout</Button>
        </div>
    )
}

export default Cart

