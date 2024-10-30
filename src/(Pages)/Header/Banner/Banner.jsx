import React from "react";
import LogoBanner from "./../../../../public/guy-lesson 1.jpg";
const Banner = () => {
  return (
    <main>
      <div className="hero">
        <div className="main-content">
          <div className="body">
            <div className="media-block">
              <img
                className="img"
                src={LogoBanner}
                alt="Learn without limits and spread knowledge."
              />
              <div className="hero-sumamry">
                <div className="item">
                  <div className="icon">
                    <img src="/duan1/icon/Orion_page.svg" alt="" />
                  </div>
                  <div className="info">
                    <p className="label">20 Courses</p>
                    <p className="title">UI/UX Design</p>
                  </div>
                </div>

                <div className="item">
                  <div className="icon icon2">
                    <img src="/duan1/icon/Orion_code-window.svg" alt="" />
                  </div>
                  <div className="info">
                    <p className="label">20 Courses</p>
                    <p className="title">Development</p>
                  </div>
                </div>

                <div className="item">
                  <div className="icon icon3">
                    <img src="/duan1/icon/Orion_megaphone.svg" alt="" />
                  </div>
                  <div className="info">
                    <p className="label">30 Courses</p>
                    <p className="title">Marketing</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-block">
              <h1 className="heading">
                Learn without limits and spread knowledge.
              </h1>
              <p className="des">
                Build new skills for that “this is my year” feeling with
                courses, certificates, and degrees from world-className
                universities and companies.
              </p>
              <div className="cta-group">
                <a href="#!" className="btn hero-cta-btn">
                  See Courses
                </a>
                <button className="watch-video">
                  <div className="icon">
                    <img src="./icon/Polygon 2.svg" alt="" />
                  </div>
                  <span>Watch video</span>
                </button>
              </div>
              <p className="des des-recent">Recent engagement</p>
              <p className="des starts">
                <strong>50K</strong>Students <strong>70+</strong>Courses
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Banner;
