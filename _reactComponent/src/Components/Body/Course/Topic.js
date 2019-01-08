import React, { Component } from 'react';
const MathJax = require('react-mathjax2');
const ReactDOM = require('react-dom');
import MathContent from './MathContent.js';
import VideoLink from './VideoLink.js';
import CourseContent from './CourseContent.js';
import RightNavigation from './RightNavigation.js';

class Topic extends Component {

  constructor(props){
    console.log('In constructor for topic ID ' + props.match.params.topicId);
    var topicId = props.match.params.topicId;
    super(props);
    this.state = {"topic" : {"id": topicId, "videos" : [], "label": ""}};
  }

  componentDidMount() {
    this.fetchTopicContent();
  }

  componentWillUnmount(){
      this.state = null;
  }

  componentDidUpdate(prevProps){
    if (this.props.match.params.topicId !== prevProps.match.params.topicId) {
      this.fetchTopicContent();
    }
  }

  fetchTopicContent(){
    console.log('in fetch topic Content with topicId : ' + this.props.match.params.topicId);
    fetch('/api/v1/topic/' + this.props.match.params.topicId)
      .then(res => {
        console.log(res);
        return res.json()
      })
      .then(topic => {
        console.log('topic received from api: ' + topic);
        this.setState({"topic":topic})
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-sm-12 ana_padding_top">
            <CourseContent videos = {this.state.topic.videos}> </CourseContent>
          </div>
          <div className="col-md-2 col-sm-12">
            <RightNavigation videos = {this.state.topic.videos}></RightNavigation>
          </div>
        </div>
      </div>
    );
  }
}

export default Topic;
