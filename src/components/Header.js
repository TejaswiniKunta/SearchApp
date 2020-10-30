import React from "react";
import {Navbar, NavbarBrand} from "reactstrap";

function Header(){

    return(
    <Navbar className="title-css">
        <div className="container">
            <NavbarBrand href="/">
            <img src="./acmelogo.jpg" className="logo-css"/>
            </NavbarBrand>
        </div>
    </Navbar>

    );
}
export default Header;