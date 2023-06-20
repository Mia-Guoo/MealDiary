import HomePage from "../HomePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Header() {
  let username = localStorage.getItem("user");
  function logOut() {
    localStorage.clear();
  }
  return (
    <div className="headerBox">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="./MealDiaryLogo1.png"
              height={80}
              alt="MealDiary Logo"
            ></img>
          </a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mr-auto">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>

              <a className="nav-link" href="/calendar">
                Calendar
              </a>
              <a className="nav-link" href="/grocery">
                Grocery List
              </a>
            </div>
            {localStorage.getItem("user") ? (
              <div className="navbar-nav ms-auto">
                <a className="nav-link ms-auto" href="">
                  Welcome! {username}
                </a>
                <a className="nav-link ms-auto" href="/login" onClick={logOut}>
                  Logout
                </a>
              </div>
            ) : (
              <div className="navbar-nav ms-auto">
                <a className="nav-link ms-auto" href="/register">
                  Sign up /
                </a>
                <a className="nav-link ms-auto" href="/login">
                  Login
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Header;
