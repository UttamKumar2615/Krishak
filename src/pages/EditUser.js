import React from "react";
import firebase from "firebase";
import { Link, withRouter } from "react-router-dom";

class EditUser extends React.Component {
  state = {
    userName: "",
    userEmail: "",
    uid: "",
    userAddress: "",
    userPhNo: "",
    userCategory: "",
    editUserContent: (
      <div>
        <h2>Please wait while we load your profile..</h2>
      </div>
    ),
  };

  componentDidMount() {
    document.title = "Update Profile | Krishak";

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userName: user.displayName,
          uid: user.uid,
          userEmail: user.email,
          editUserContent: (
            <form onSubmit={this.handleSubmit}>
              <label>
                Name: <br />
                <input
                  type="text"
                  defaultValue={this.state.userName}
                  onChange={this.handleNameChange}
                  required
                />
              </label>
              <br />
              <br />
              <label>
                E-Mail: <br />
                <input type="text" value={user.email} disabled />
              </label>
              <br />
              <br />
              <label>
                Phone: <br />
                <input
                  type="tel"
                  pattern="[789][0-9]{9}"
                  title="Please provide valid phone number"
                  defaultValue={this.state.userPhNo}
                  onChange={this.handlePhNoChange}
                  required
                />
              </label>
              <br />
              <br />
              <label>
                Choose category: <br />
                <div onChange={this.handleCategoryChange}>
                  <input type="radio" value="consumer" name="category" />
                  Consumer &emsp;
                  <input type="radio" value="farmer" name="category" />
                  Farmer
                </div>
              </label>
              <br />
              <br />
              <label>
                Address: <br />
                <textarea
                  style={{ width: "100%", height: "auto" }}
                  defaultValue={this.state.userAddress}
                  onChange={this.handleAddressChange}
                  placeholder="M.K Road, New Delhi"
                  required
                />
              </label>
              <br />
              <br />
              <input className="customBtn" type="submit" value="Submit" />
            </form>
          ),
        });
      } else {
        this.setState({
          editUserContent: (
            <div id="highlight">
              <h1>Seems like you're logged out..</h1>
              <h3>
                Please head to the <Link to="/home">Home Page</Link>, and
                login..
              </h3>
            </div>
          ),
        });
      }
    });
  }

  componentWillUnmount() {
    firebase.database().ref("user/").off();
  }

  render() {
    return <div className="content">{this.state.editUserContent}</div>;
  }

  handleNameChange = (event) => {
    this.setState({ userName: event.target.value });
    firebase
      .auth()
      .currentUser.updateProfile({ displayName: event.target.value });
  };

  handlePhNoChange = (event) => {
    this.setState({ userPhNo: event.target.value });
  };

  handleCategoryChange = (event) => {
    this.setState({ userCategory: event.target.value });
  };

  handleAddressChange = (event) => {
    this.setState({ userAddress: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .database()
      .ref("user/" + this.state.userPhNo)
      .set(
        {
          name: this.state.userName,
          email: this.state.userEmail,
          address: this.state.userAddress,
          phNo: this.state.userPhNo,
          category: this.state.userCategory,
        },
        (error) => {
          if (error) {
            alert("Sorry, we couldn't store your details..\nPlease try again");
          } else {
            alert("Profile updated successfully!");
            this.props.history.push("/home");
          }
        }
      );
  };
}

export default withRouter(EditUser);
