import React from 'react';

export const AppTree = {
    Loader : {
        isLoaderOpen : true,
        OpenLoader : () => {
            isLoaderOpen = true;
        },
        CloseLoader : () => {
            isLoaderOpen = false;
        }
    }
}

export const AppState = React.createContext(AppTree);

export const WithAppState = (Component) => {
  return (props) => {
      return (
          <AppState.Consumer>
              {AppState => <Component {...props} context={AppState} />}
          </AppState.Consumer>
      );
  }
}

export const ProvideAppState = (Component,value) => {
  return (props) => {
      return (
          <AppState.Provider value={value}>
              <Component {...props} />
          </AppState.Provider>
      );
  }
}
