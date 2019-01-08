import React , { Component } from 'react';

class Review extends Component{

    constructor(props){
      super(props);
      this.state = props;
    }

    componentDidMount() {

    }

    render(){
        return(
          <div id='review'>
            <div className="col-xs-12 col-md-6 ana_card_img">
                <img src={'..\\Image\\'+this.state.review.profilePic+'.jpg'} alt={this.state.review.reviewer} />
                <h3>{this.state.review.reviewer}</h3>
                <p>{this.state.review.review}</p>
            </div>
          </div>
        );
    }
}

export default Review;
