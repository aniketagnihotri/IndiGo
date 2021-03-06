import React, {Component} from 'react';
import { Button } from "react-bootstrap";
import { List, ListItem, Select } from "@material-ui/core";

/*
 * WriteReviewData is the editor that Indigo users can use to write a review for a
 * particular business.
 */
class WriteReviewData extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            rating: "",
            review: "",
            submitted: false
        }
    }

    /*
     * Gets the date of a review for the POST request.
     */
    getDate() {
        let currentDate = new Date();
        return (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
    }

    /*
     *  Gets the rating and updates the class's state accordingly upon change.
     */
    changeRating(event) {
        this.setState({ "rating": event.target.value })
    }

    /*
     * Gets the review and updates the class's state accordingly upon change.
     */
    changeReview(event) {
        this.setState({ "review": event.target.value })
    }

    /*
     * Pushes the review to the back-end and then to the database using a POST
     * request.
     */
    pushReview() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const id = this.state.id;
        const user = this.props.user.email;
        console.log(user)
        const rating = this.state.rating;
        const review = this.state.review;
        const dateTime = this.getDate();
        fetch(`/api/db/addBusinessReview`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "id":id,
                "user":user,
                "rating":parseFloat(rating),
                "review":review,
                "dateTime":dateTime
            })
        })
            .then(response => this.setState({ "submitted": true } ) )
    }

    render() {

        return (
            <div  style={ { textAlign: "left", marginTop: 20, marginLeft: 40, padding: 10, paddingRight: 20, backgroundColor: "lightgray", borderRadius: 10 } }>
                <h5 >
                    Write a review using our editor!
                </h5>
                <p style={ { marginTop: 10, marginLeft: 30 } }>
                    Please note that we only allow one review per business to ensure transparency.
                </p>
                <List style={ { marginLeft: 10 } }
                      component="nav" aria-label="mailbox folders">
                    <ListItem button style={
                        {
                            width: 685
                        }
                    }>
                        {this.props.user ? (
                            <div>
                                {this.state.submitted ? (
                                        <div>
                                            Your review has been submitted.
                                            <br />
                                            Refresh the page to view it.
                                        </div>
                                    )
                                    :
                                    (
                                        <div>
                                            <h6>
                                                Rating:
                                            </h6>
                                            <Select
                                                onChange={this.changeRating.bind(this)}
                                                defaultValue={"0.0"}
                                                id="rating"
                                                style={
                                                {
                                                    height: 35,
                                                    width: 70,
                                                    marginBottom: 30
                                                }
                                            } placeholder={"1.0"}>
                                                <option value="1.0">1.0</option>
                                                <option value="1.5">1.5</option>
                                                <option value="2.0">2.0</option>
                                                <option value="2.5">2.5</option>
                                                <option value="3.0">3.0</option>
                                                <option value="3.5">3.5</option>
                                                <option value="4.0">4.0</option>
                                                <option value="4.5">4.5</option>
                                                <option value="5.0">5.0</option>
                                            </Select>

                                            <h6>
                                                Review:
                                            </h6>
                                            <textarea
                                                onChange={this.changeReview.bind(this)}
                                                style={
                                                {
                                                    height: 500,
                                                    width: 650,
                                                    marginBottom: 10
                                                }
                                            } className="custom-control-inline form-control"
                                                   name="review"
                                                   maxLength={500}
                                            />
                                            <br />

                                            <Button onClick={this.pushReview.bind(this)}>
                                                Submit review
                                            </Button>
                                            <p style={
                                                {
                                                    marginTop: 10,
                                                    fontSize: 18
                                                }
                                            }
                                            > Note: Refresh the page to view your review after clicking submit! </p>
                                        </div>
                                    )}
                            </div>)
                            :
                            (
                                <h6>Login to leave a review.</h6>
                            )}
                    </ListItem>
                </List>
            </div>
        );
    }

}

export default WriteReviewData;