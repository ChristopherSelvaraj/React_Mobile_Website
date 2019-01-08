import React, {Component} from 'react';
import { WithAppState } from '../Context/AppState.js';

class Loader extends Component {

    render(){
        let { context } = this.props;
        if(context.Loader.isLoaderOpen){
            return (
                <div id="loader" className="loader-body">
                    <div className="loader"></div>
                </div>
            );
        }

        return "";
    }
}

export default Loader = WithAppState(Loader);