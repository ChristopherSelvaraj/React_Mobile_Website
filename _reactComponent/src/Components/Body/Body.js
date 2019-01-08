import React , { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home.js';
import Topic from './Course/Topic.js';

class Body extends Component{
    constructor(props){
      super(props);
      this.state = props;
    }

    render(){
        return(
            <Switch>
                <Route exact path='/' render={()=><Home divRefs={this.props.divRefs}/>}/>
                <Route exact path='/Topic/:topicId' component={Topic}/>
            </Switch>
        );
    }
}

export default Body;
