import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
//import './Login.css';

class Logout extends Component {
	

	render() {
		sessionStorage.removeItem('data');
		if (!sessionStorage.getItem('data')){
			return (<Redirect to={'/login'}/>)
		}

		return (
			<div>Logged out Successfully</div>	
		)
	}
}
export default Logout;