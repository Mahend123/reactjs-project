
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";


class Gpdf extends Component {
  
  render() {
    if (sessionStorage.getItem('data') == null) {
        return (<Redirect to={'/login'} />);
    }
    return (
      <div className="animated fadeIn">
        Gpdf page
      </div>
    );
  }
}

export default Gpdf;