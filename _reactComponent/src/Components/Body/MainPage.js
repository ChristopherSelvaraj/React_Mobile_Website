import React, { Component } from 'react';
import Header from '../Header/Header.js';
import Body from './Body.js';
import ReactDOM from 'react-dom';

class MainPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      headers: [],
      divRefs: []
    }
  }

  componentDidMount(){
    fetch('api/v1/headers/')
      .then(res => {
        return res.json()
      })
      .then(headers => {
        var refs = headers.map(header => {
          if(header.type === 'url'){
            let ref = React.createRef();
            return(
              {
                key: header.url,
                ref: ref,
                onClick: () => {
                  var url = window.location.pathname;
                  if(url != '/'){
                    window.location.pathname = '/';
                  }
                  let myDomNode = ReactDOM.findDOMNode(ref.current)
                  if(myDomNode)
                    myDomNode.scrollIntoView();
                  else {
                    console.log('no dom found')
                  }
                }
              });
          }
        });
        this.setState({"headers":headers, "divRefs": refs, "test" : "loaded" });
      });

    this.setState({test : "loaded"}, () => {
      console.log('after updating is: '  + JSON.stringify(this.state));
    });
  }

  render() {
    return (
        <div>
          <Header headers={this.state.headers} divRefs = {this.state.divRefs}/>
          <Body divRefs = {this.state.divRefs}/>
        </div>
      );
  }
}

export default MainPage;
