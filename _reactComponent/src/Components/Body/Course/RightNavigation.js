import React, { Component } from 'react';
const MathJax = require('react-mathjax2');
const ReactDOM = require('react-dom');
const tex = "f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi)\\,e^{2 \\pi i \\xi x} \\,d\\xi";

const RightNavigation = ({
  videos
}) => {
    return (
      <div>
        <nav className="side-menu">
          <ul className="nav">
            {
              //console.log(subtopics);
              videos.map((video, index) => {
                return  <li className="active" key={index}><a>{video.label}</a>
                        </li>
              })
            }
          </ul>
        </nav>
    </div>
    );
}
export default RightNavigation;
