import React from "react";
import logo from "./logo.png";
import "./App.css";
import { Switch, NavLink, Route, withRouter } from "react-router-dom";
import AuthComponent from "./Components/AuthComponent";
import Profile from "./Components/Profile";
import { connect } from "react-redux";
import { setUser } from "./Ducks/reducer";
import Axios from "axios";

class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header>
          <div>
            <div>
              <img src={logo} />
            </div>
            <nav>
              <NavLink activeClassName="active" exact to="/">
                Home
              </NavLink>
              <NavLink activeClassName="active" to="/store">
                Store
              </NavLink>
              <NavLink activeClassName="active" to="/profile">
                Profile
              </NavLink>
              {this.props.user && (
                <button
                  onClick={() => {
                    Axios.delete("/auth/logout").then(() => {
                      this.props.setUser(null);
                    });
                  }}
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        </header>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <div>
                  <AuthComponent />
                </div>
              );
            }}
          />
          <Route
            exact
            path="/store"
            render={() => {
              return <div>Store</div>;
            }}
          />
          <Route exact path="/profile" component={Profile} />
          <Route
            exact
            path="/profile"
            render={() => {
              return <div>Profile</div>;
            }}
          />
          <Route
            exact
            path="*"
            render={() => {
              return <div>GET THAT SPOOKY BUTT OUTTA' HERE!</div>;
            }}
          />
        </Switch>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}

const mapReduxDispatchToProps = {
  setUser
};

const invokedConnect = connect(
  mapReduxStateToProps,
  mapReduxDispatchToProps
);

export default invokedConnect(withRouter(App));
