import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Modal extends Component {
    render(){

        return ReactDOM.createPortal(
            <React.Fragment>
                <div id={ this.props.id } className={ this.props.isOpen ? "modal fade in" :"modal fade" } style={ { "display" : this.props.isOpen?"block":"none"} }>
                    {this.props.children}
                </div>
            </React.Fragment>
        ,document.body);
    }
}

export default Modal;
