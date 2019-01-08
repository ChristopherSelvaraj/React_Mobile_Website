import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class  HeaderScrollLink extends Component{

  constructor(props){
    super(props);
    this.state = props;
  }


  render(){
      console.log('In HeaderNavLink component for url: ' + URL + ', and description: ' + JSON.stringify(this.state.description));
      //description={header.label} isActive={header.isActive} URL={header.URL} onClick={ this.onNavHeaderOnClick }
      return (
        <li ref={this.myRef}>
            <a className={ this.state.isActive ? 'active' : ''} onClick={this.onClick()} > {this.state.description} </a>
        </li>
      );
  }

}

export default HeaderScrollLink;
