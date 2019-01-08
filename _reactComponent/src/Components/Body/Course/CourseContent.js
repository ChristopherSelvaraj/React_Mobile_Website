import React, { Component } from 'react';
const MathJax = require('react-mathjax2');
const ReactDOM = require('react-dom');
import MathContent from './MathContent.js';
import VideoLink from './VideoLink.js';

const CourseContent = ({
  videos
}) => {
    console.log('videos: ' + JSON.stringify(videos));
    return (
      <div>
        {
          videos.map((video, index) => {
            return (
              <div key={index}>
                <div key={index} className="jumbotron">
                  <div id='about' className="course-section">
                    <h1>{video.label}</h1>
                    <div>
                      <MathContent contents={video.content}>
                      </MathContent>
                      <VideoLink key = {index} videoLabel = {video.videoLabel} source={video.url}/>
                    </div>
                  </div>
                </div>
              </div>
            );
        })
      }
    </div>
  );
}
export default CourseContent;
