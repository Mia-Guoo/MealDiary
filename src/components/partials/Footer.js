import { Fragment } from "react";

function Footer() {
  return (
    <div className="footerBox">
      <ul className="nav justify-content-end ">
        <li className="display-12 navbar-text">
          &copy;2023MealDiary. All Rights Reserved.
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">
            Contact
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            About Us
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            Help & FAQ
          </a>
        </li>
        <li className="nav-item">
          <a className="navbar-brand" href="/">
            <img
              className="footerLogo"
              src="./MealDiaryLogo1.png"
              height={60}
              alt="MealDiary Logo"
            ></img>
          </a>
        </li>
      </ul>
    </div>
  );
}
export default Footer;
