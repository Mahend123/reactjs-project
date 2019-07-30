import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import { Redirect } from "react-router-dom";

//import Logout from '../../views//Pages/Logout/Logout'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props){
    super(props);

    this.state={
      image2: undefined,
      
      id: "",
      
    };
  }  

  async  componentDidMount() {
    this.testVarible = JSON.parse(sessionStorage.getItem('data'));
    
    if(this.testVarible !== null){
      const id = (this.testVarible.data.id);
    fetch('http://localhost/react-demo/crud/user/userprofile?id=' + id)
            .then(response => {
                return response.json();

            }).then(result => {
                    //console.log(result)
                this.setState({
                    id: result.id,
                    image1: result.image1
                });
            });
  }  
}

  render() {
    if (sessionStorage.getItem('data') == null) {
      return (<Redirect to={'/login'} />);
  }
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
      
        <AppNavbarBrand 
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem> */}
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem> */}
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
            
              <img src={"http://localhost/react-demo/crud/uploads/"+(this.state.image1)} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
               <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              {/*<DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem> */}
              {/* <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem> */}
              <Link to="profile"><DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem></Link> 
              
                            {/* <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem> */}
              
              <DropdownItem divider />
              
              <Link to="logout">
              <DropdownItem ><i className="fa fa-lock"></i>  Logout  </DropdownItem></Link>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/* <AppAsideToggler className="d-lg-none" mobile /> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
