import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import firebase from "firebase";
import Home from "./pages/Home";
import EditUser from "./pages/EditUser";
import ProductDetails from "./pages/ProductDetails";
import UserProfile from "./pages/UserProfile";
import WeekContainer from "./pages/Weather";
import AddCrop from "./pages/AddCrop";
import Cart from "./pages/Cart";
import AgriNews from "./pages/News";
class App extends React.Component {
  state = {
    userName: "",
    userDisplay: "display-none",
    userImgUrl: "",
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userName: user.displayName,
          userImgUrl: user.photoURL,
          userDisplay: "display-block dropdown",
        });
      } else {
        this.setState({
          userDisplay: "display-none",
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <strong>
            <div id="highlight" className="row">
              <div className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                  <button
                    style={{ border: "0px" }}
                    className="navbar-toggler customBtn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <i
                      className="fas fa-bars"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </button>
                  <Link to="/home" className="navbar-brand cursor-pointer">
                    <h2
                      id="highlight"
                      className="heroTitle"
                      style={{ marginTop: "27px" }}
                    >
                      Krishak
                    </h2>
                  </Link>
                  <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarSupportedContent"
                  >
                    <form className="d-flex">
                      <div className="d-flex align-items-center">
                        <ul
                          style={({ display: "inline" }, { listStyle: "none" })}
                          className="navbar-nav align-items-center"
                        >
                          <li
                            style={{ display: "inline" }}
                            className="nav-item"
                          >
                            <div className={this.state.userDisplay}>
                              <span
                                className="nav-link dropdown-toggle cursor-pointer"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <img
                                  src={this.state.userImgUrl}
                                  width="32"
                                  height="32"
                                  style={{ borderRadius: "50%" }}
                                  alt="User Profile"
                                />
                                <span> {this.state.userName}</span>
                              </span>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                              >
                                <li>
                                  <span className="dropdown-item cursor-pointer">
                                    <Link
                                      to="/user-profile"
                                      style={{
                                        textDecoration: "none",
                                        color: "#1F2421",
                                      }}
                                    >
                                      My Profile
                                    </Link>
                                  </span>
                                </li>
                                <li>
                                  <span
                                    className="dropdown-item cursor-pointer"
                                    onClick={this.userLogout}
                                  >
                                    Logout
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                  <span
                    style={{
                      color: "#49A078",
                      margin: "auto 20px",
                      fontSize: "1.5rem",
                    }}
                    title="CropInfo"
                  >
                    <Link
                      style={{ color: "#49A078", textDecoration: "none" }}
                      to="/crop-info"
                    >
                      <i className="fas fa-tractor cursor-pointer"></i>
                    </Link>
                  </span>
                  <span
                    style={{
                      color: "#49A078",
                      margin: "auto 20px",
                      fontSize: "1.5rem",
                    }}
                    title="News"
                  >
                    <Link
                      style={{ color: "#49A078", textDecoration: "none" }}
                      to="/news"
                    >
                      <i className="far fa-newspaper cursor-pointer"></i>
                    </Link>
                  </span>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      color: "#49A078",
                      margin: "auto 20px",
                    }}
                    title="My Cart"
                  >
                    <Link
                      style={{ color: "#49A078", textDecoration: "none" }}
                      to="/cart"
                    >
                      <i className="fas fa-shopping-cart cursor-pointer"></i>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </strong>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/update-profile" exact component={EditUser} />
          <Route path="/product/:id" exact component={ProductDetails} />
          <Route path="/user-profile" exact component={UserProfile} />
          <Route path="/add-crop" exact component={AddCrop} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/crop-info" exact component={WeekContainer} />
          <Route path="/news" exact component={AgriNews} />
        </BrowserRouter>
      </div>
    );
  }
  userLogout = () => {
    firebase.auth().signOut();
  };
}
export default App;
