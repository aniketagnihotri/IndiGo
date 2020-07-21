import React, { Component } from 'react';
import { Jumbotron, Button } from "react-bootstrap";
import { ListItem } from "@material-ui/core";
import fire from '../../config/Fire'
import PageHeader from "../PageAttributes/PageHeader";
import Searchbar from "../PageAttributes/Searchbar";
import SearchFilter from "../PageAttributes/SearchFilter";
import PageFooter from "../PageAttributes/PageFooter";
import CasesData from "../PageAttributes/CasesData";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: ""
        }
    }


    changeField(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    login(event) {
        event.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then((u)=> {
        }).catch((error) => {
            return (
                <h1>Incorrect credentials!</h1>
            )
        });
    }

    signup(event) {
        event.preventDefault();
        this.setState({ "error": "" } )
        fire.auth().createUserWithEmailAndPassword(this.state.username, this.state.password)
            .catch((error) => {
                console.log(error)
                if (error) {
                    this.setState({ "error": "Incorrect login credentials!" } )
                }
        });
    }

    render() {
        return (
            <div>
                <Jumbotron className={"jumbotron-business"}>
                    <PageHeader user={this.props.user} />
                    <br />
                    <Searchbar />
                    <br />
                    <SearchFilter />
                </Jumbotron>
                <CasesData />
                <br />
                <h1>Login or Sign Up below</h1>
                <h5>Please note that both of the above functions are performed from this form.</h5>
                <ListItem button style={
                    {
                        width: 600,
                        display: "inline-block",
                        marginTop: 20,
                        marginBottom: 23
                    }
                }>
                    {this.props.user ? (
                            <p style={
                                {
                                    textAlign: "center",
                                    paddingTop: 70,
                                    paddingBottom: 175
                                }
                            }>Welcome, <b>{this.props.user.email}</b>. You are logged in.
                            <br />You can now leave reviews on local Indianapolis businesses!</p>
                        )
                        :
                        (
                            <div>

                                {this.props.error ? (
                                        <p id="loginInfo" style={
                                            {
                                                textAlign: "center",
                                            }
                                        }>{this.state.error}</p>
                                    )
                                    :
                                    (
                                        <p id="loginInfo" style={
                                            {
                                                textAlign: "center",
                                            }
                                        }>You are currently logged out.</p>
                                    )}
                                <h6>Username (email): </h6>
                                <input onChange={this.changeField.bind(this)}
                                       className="custom-control-inline form-control"
                                       style={
                                           {
                                               width: 550,
                                               marginBottom: 30
                                           }
                                       } type="email" name="username"
                                       maxLength={30} placeholder={"Username"}
                                />

                                <h6>Password (six digits): </h6>
                                <input onChange={this.changeField.bind(this)} minLength={6}
                                       className="custom-control-inline form-control"
                                       style={
                                           {
                                               width: 550,
                                               marginBottom: 30
                                           }
                                       } type="password" name="password"
                                       placeholder={"Password"}
                                />

                                <Button type="submit" onClick={this.login.bind(this)}>
                                    Login
                                </Button>

                                <Button type="submit" onClick={this.signup.bind(this)}
                                    style={
                                        {
                                            marginLeft: 20
                                        }
                                    }>

                                    Sign Up
                                </Button>
                            </div>)}
                </ListItem>
                <PageFooter />
            </div>
        );
    }

}

export default Login;