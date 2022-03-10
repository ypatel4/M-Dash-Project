import React from "react";
import "./App.css";
import { NavLink, Redirect, Route, Switch, withRouter } from "react-router-dom";
import {
  PopMovies,
  TopRatedMovies,
  Info,
  Results,
  About,
} from "./components";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  FormGroup,
} from "react-bootstrap";

//Navbar, routing design
class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
    };
    this.afterSubmission = this.afterSubmission.bind(this);
  }

  handleRoute = (route) => () => {
    this.props.history.push({ pathname: route });
  };

  handleSearchInput = (event) => {
    this.setState({
      searchText: event.target.value,
    });
  };

  handleSearchSubmit = () => {
    if (document.getElementById("searchBar").value) {
      this.props.history.replace({
        pathname:
          "/results/" +
          encodeURIComponent(document.getElementById("searchBar").value),
        state: {
          searchText: document.getElementById("searchBar").value,
        },
      });
    } else {
      alert("Enter something in search-bar.");
    }
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSearchSubmit();
    }
  };

  afterSubmission(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="custom-navbar">
        <Navbar id="navbar" bg="black" variant="dark" expand="lg">
          <Navbar.Brand className="active" href="/">
            M-Dash
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="nav" className="mr-auto" bg="black" expand="md">
              <NavLink
                to="/movie/popular/1"
                href="/movie/popular/1"
                activeClassName="current"
              >
                Trending-Movies
              </NavLink>
              <NavLink
                to="/movie/top_rated/1"
                href="/movie/top_rated/1"
                activeStyle={{ color: "red" }}
              >
                Top-IMDB-Movies
              </NavLink>
              <NavLink to="/About" href="/About" activeStyle={{ color: "red" }}>
                About
              </NavLink>
            </Nav>

            <Form id="search-form" inline onSubmit={this.afterSubmission}>
              <FormGroup>
                <Form.Label className="hidden" htmlFor="searchBar">
                  Search
                </Form.Label>
                <FormControl
                  onKeyDown={this.handleKeyPress}
                  type="text"
                  placeholder="Search"
                  required
                  className="mr-sm-1"
                  id="searchBar"
                />
              </FormGroup>
              <Button variant="outline-light" onClick={this.handleSearchSubmit}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          {/* Popular movies */}
          <Redirect exact from="/" to="/movie/popular/1" />
          <Redirect exact path="/movie/popular/" to="/movie/popular/1" />
          <Route exact path="/movie/popular/:page" component={PopMovies} />

          {/* Top rated movies */}
          <Redirect exact path="/movie/top_rated/" to="/movie/top_rated/1" />
          <Route
            exact
            path="/movie/top_rated/:page"
            component={TopRatedMovies}
          />

          {/* About */}
          <Route exact path="/About" component={About} />
          <Route
            exact
            path="/info/:imdbID/:mediaType/:tmdbID?"
            component={Info}
          />

          {/* Search results page */}
          <Redirect exact path="/results/:title/" to="/results/:title/1" />
          <Route exact path="/results/:title/:page" component={Results} />

          
        </Switch>
      </div>
    );
  }
}

export default withRouter(Main);
