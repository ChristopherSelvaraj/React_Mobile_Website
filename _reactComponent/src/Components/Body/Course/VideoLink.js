import React, { Component } from 'react';
import Modal from '../../Utils/Modal.js';

class VideoLink extends Component {

  constructor(props){
    super(props);
    this.state = {
      isModalOpen : false,
      source : props.source,
      initialSource : props.source,
      videoLabel : props.videoLabel,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(){
     this.setState({
       isModalOpen: true,
       source: this.state.initialSource
     })
  }

  closeModal(){
      this.setState({isModalOpen : false, source: ''});
  }

  render(){
    console.log('videolink state: ' + JSON.stringify(this.state));
    return(
      <React.Fragment>
        <div className="video-link">
          <a onClick={this.openModal}>
            <span className="glyphicon glyphicon-play-circle" aria-hidden="true">
            </span>
            {this.state.videoLabel}
          </a>
        </div>
        <Modal id="TestModal" isOpen={this.state.isModalOpen}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" onClick={this.closeModal} >&times;</button>
                    <h4 className="modal-title">Topic Video</h4>
                </div>
                <div className="modal-body">
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src={this.state.source} allowFullScreen></iframe>
                  </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={this.closeModal}>Close</button>
                </div>
                </div>
            </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default VideoLink;
