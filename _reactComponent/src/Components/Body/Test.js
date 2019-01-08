import React, { Component } from 'react';

class Test extends Component {

  constructor(props){
    super(props);
    this.state = props;
  }

  componentDidMount(){

  }

  render() {
    console.log('state of test component ' + JSON.stringify(this.state));
    return (
        <div>
          <h1>{this.props.test} </h1>
        </div>
      );
  }
}

export default Test;
