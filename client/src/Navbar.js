import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
//import {isEmpty} from "lodash"



const TopNav = ({userData, handleLogout, isLogin}) => {
    return(
        <Navbar bg="dark" expand="md" variant="dark">
            <Navbar.Brand href="/">Bunny</Navbar.Brand>
            <Navbar.Toggle aria-controls="menu" />
            <Navbar.Collapse id="menu">
                <Nav className="mr-auto">
                    <Link to="/" className="nav-link">Home</Link>
                    {
                        "userData" in localStorage ?
                        <React.Fragment> 
                            <Link to="/" className="nav-link">Product</Link>
                            <Link to="/cart" className="nav-link">My Cart</Link>
                            <Link to="/" className="nav-link" onClick={() => handleLogout()}>Logout</Link>
                        </React.Fragment> 
                        :
                        <React.Fragment>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </React.Fragment>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default TopNav