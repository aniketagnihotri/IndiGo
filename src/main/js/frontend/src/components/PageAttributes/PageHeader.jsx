import React, { Component } from 'react';
import * as ReactBootStrap from "react-bootstrap";
import fire from "../../config/Fire";
import UpdatesModal from "./UpdatesModal";
import "./Navbar.css"
import "./PageAttributes.css"

/*
 * PageHeader is the header for all pages except the HomePage, due to image colors.
 * PageHeader uses a BootStrap NavBar.
 */
class PageHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "user": this.props.user,
            "open": false
        }
    }

    styleTabs = {
        margin: 1,
        padding: 5,
        fontSize: 18,
    };

    styleIcon = {
        padding: 10,
        fontSize: 50,
    };

    /*
     * Manages the logout event of a user.
     */
    logout(event) {
        fire.auth().signOut();
    }

    render() {
        return (
            <ReactBootStrap.Navbar className={"color-nav "} variant={"light"}>
                <ReactBootStrap.Navbar.Brand href="/" style={this.styleIcon}>indigo</ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Navbar.Collapse>
                    <ReactBootStrap.Navbar className={"ml-auto"}/>
                </ReactBootStrap.Navbar.Collapse>
                <ReactBootStrap.Nav className="mr-auto" style={this.styleTabs}>
                    <ReactBootStrap.Nav.Link href="/">  Home  </ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link href="/AboutUs">  About  </ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link>{<UpdatesModal />}  </ReactBootStrap.Nav.Link>
                    <ReactBootStrap.NavDropdown alignRight title={"User"} >
                        {this.props.user ? (
                                <div>
                                    <ReactBootStrap.NavDropdown.Header style={
                                        {
                                            fontSize: 16
                                        }
                                    }>Welcome, {this.props.user.email}</ReactBootStrap.NavDropdown.Header>
                                    <ReactBootStrap.NavDropdown.Divider />
                                    <ReactBootStrap.NavDropdown.Item href="/UserInfo">Your Info</ReactBootStrap.NavDropdown.Item>
                                    <ReactBootStrap.NavDropdown.Item onClick={this.logout.bind(this)}>Sign Out</ReactBootStrap.NavDropdown.Item>
                                </div>)
                            :
                            (
                                <ReactBootStrap.NavDropdown.Item href="/Login">Login or Sign Up</ReactBootStrap.NavDropdown.Item>

                            )}
                    </ReactBootStrap.NavDropdown>
                </ReactBootStrap.Nav>
            </ReactBootStrap.Navbar>
        );
    }

}

export default PageHeader;