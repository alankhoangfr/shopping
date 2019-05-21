import React , {Component} from "react"
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


class AppNavBar extends Component {
	state = {
      isOpen: false
    };
  	toggle= ()=>{
    this.setState({
      isOpen: !this.state.isOpen
    });
  	}
  	render() {
    	return (
      	<div>
	        <Navbar color="light" light expand="md">
	          <NavbarBrand href="/">Shopping Basket</NavbarBrand>
	          <NavbarToggler onClick={this.toggle} />
	          <Collapse isOpen={this.state.isOpen} navbar>
	            <Nav className="ml-auto" navbar>
	              <NavItem>
	                <NavLink tag={RRNavLink} exact to="/" activeClassName="active">Compare Baskets</NavLink>
	              </NavItem>
	              <UncontrolledDropdown nav inNavbar>
	                <DropdownToggle nav caret>
	                  		Add Basket
	                </DropdownToggle>
	                <DropdownMenu right>
	                  <DropdownItem>
	                  	<NavLink tag={RRNavLink} exact to="/AddShops" activeClassName="active">Add Shops</NavLink>
	                  </DropdownItem>
	                  <DropdownItem>
	                    Add Items
	                  </DropdownItem>
	                </DropdownMenu>
	              </UncontrolledDropdown>
	            </Nav>
	          </Collapse>
	        </Navbar>
	      </div>
	    );
	  }
	}

export default AppNavBar