import React, { Component } from 'react';
import Header from './Header/Header.js';
import Body from './Body/Body.js';
import Footer from  './Footer.js';
import MainPage from './Body/MainPage';
import Loader from './Utils/Loader.js';
import { AppState } from './Context/AppState.js';

class App extends Component {

  constructor(props){
    super(props);

    this.OpenLoader = () => {
      this.setState(prevState => (
        {
          Loader : {
            ...prevState.Loader,
            isLoaderOpen : true
          }
        }
      ));
    }

    this.CloseLoader = () => {
      this.setState(prevState => (
        {
          Loader : {
            ...prevState.Loader,
            isLoaderOpen : false
          }
        }
      ));
    }

    this.state = {
      Loader : {
        isLoaderOpen : true,
        OpenLoader : this.OpenLoader,
        CloseLoader: this.CloseLoader
      }
    }
  }

  componentDidMount(){
    this.state.Loader.CloseLoader();
  }

  render() {
    return (
      <AppState.Provider value={this.state}>
        <React.Fragment>
          <Loader />
          <MainPage />
          <Footer />
        </React.Fragment>
      </AppState.Provider>);
  }
}

export default App;
