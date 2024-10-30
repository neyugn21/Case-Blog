import React from "react";

import Twiter from "../../../icon/twitter.svg";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="main-content">
        <div className="row">
          {/* col1 */}
          <div className="col col-number-one">
            <div className="col-1">
              <img src="./icon/Lesson..svg" alt="" />
              <p className="des"></p>
              <div className="info-icon">
                <div className="icon">
                  <img src={Twiter} alt="Twitter" />
                </div>
                <div className="icon">
                  <img src="./icon/f.svg" alt="Facebook" />
                </div>
                <div className="icon">
                  <img src="./icon/linked_in.svg" alt="LinkedIn" />
                </div>
                <div className="icon">
                  <img src="./icon/instagram.svg" alt="Instagram" />
                </div>
              </div>
            </div>
          </div>
          {/* col2 */}
          <div className="col">
            <p className="title">Company</p>
            <ul className="list">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Our Pricing</a>
              </li>
              <li>
                <a href="#">Latest News</a>
              </li>
            </ul>
          </div>
          {/* col3 */}
          <div className="col">
            <p className="title">Support</p>
            <ul className="list">
              <li>
                <a href="#">FAQ’s</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          {/* col4 */}
          <div className="col">
            <p className="title">Address</p>
            <ul className="list">
              <li>
                <a href="#">
                  <strong>Location</strong>: 27 Division St, New York, NY 10002,
                  USA
                </a>
              </li>
              <li>
                <a href="#">
                  <strong>Email</strong>: email@gmail.com
                </a>
              </li>
              <li>
                <a href="#">
                  <strong>Phone</strong>: +000 1234 567 890
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>Copyright ©2022 webdesign.gdn All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
