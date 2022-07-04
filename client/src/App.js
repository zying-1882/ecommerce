import React, { useState, useEffect } from "react"
import TopNav from "./Navbar"
import{
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom"
import Login from "./components/forms/Login"
import Register from "./components/forms/Register"
import jwt_decode from "jwt-decode"
import {SERVER_URL} from "./config.json"
import Item from "./components/Item"
import ShowSingleItems from "./components/singleItem"
import AddItem from "./components/forms/AddItem"
import Cart from './components/forms/Cart';


function App() {
	const[userData, setUserData] = useState({})
	const [token, setToken] = useState("")
	const [items, setItems] = useState([])
	const [singleItems, setSingleItems] = useState([])
	const [isLogin, setIsLogin] = useState(false)
	const id = window.location.pathname.split('/').pop()
	const [myCart, setMyCart] = useState([])
    const user = JSON.parse(localStorage.getItem('userData'))
    const admin = user?.user?.isAdmin;
	/*const [items, setCartItem] = useState([]);
*/
	const getItems = () =>{
		fetch(`${SERVER_URL}items`)
		.then(res => res.json())
		.then(data => setItems(data))
	}

	/*const getSingleItems = () =>{
		fetch(`${SERVER_URL}singleItems/${data._id}`)
		.then(res => res.json())
		.then(data => setSingleItems(data))

	}*/

	const getMyCart = () => {
        fetch(`${SERVER_URL}carts`, {
            method: 'GET',
            headers: {
                "x-auth-token": localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => setMyCart(data.items))
    }

	useEffect(() =>{
		getItems()
		getMyCart()
	}, [])



	/*useEffect(() =>{
		getSingleItems()
	}, [])*/

	const showItems = items.map(item => <Item key={item._id} data={item} getItems={getItems}/>)
	const showCarts = <Cart data={myCart} getMyCart={getMyCart} />
	const [selectedItem] = items.filter(item => item._id === id)
	console.log(selectedItem)
	const handleLogin = (user) => {
		let decoded = jwt_decode(user.token)
		setToken(user.token)
		setUserData(decoded)
		localStorage.setItem('userData', JSON.stringify(decoded))
		localStorage.setItem('token', user.token)
		setIsLogin(true)
	}

	const handleLogout = () =>{
		setToken()
		setUserData({})
		localStorage.removeItem('userData')
		localStorage.removeItem('token')
	}


	    

  return (
  	<Router>
    	<div className="App">
      		<TopNav userData={userData} handleLogout={handleLogout} isLogin={isLogin}/>
      		{admin ?
					<AddItem getItems={getItems}/> : null
				}

      		<Switch>
      			<Route path="/login">
      				<Login handleLogin={handleLogin} />
      			</Route>

      			<Route path="/register">
      				<Register />
      			</Route>
      			<Route path="/cart">
      				{!!myCart?.length ? showCarts : "no item in cart"}
      			</Route>
      			<Route path="/">
      				{selectedItem ?
      					(<ShowSingleItems key={selectedItem._id} data={selectedItem}/>) 
      					: showItems
      				}
      			</Route>
      			
      		</Switch>
      		
    	</div>
    </Router>
  );
}

export default App;
