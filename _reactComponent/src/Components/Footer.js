import React, { Component } from 'react';

class Footer extends Component{
    render(){
        return(
            <div id="Footer" className="ana_footer">
                <div className="ana_footer_section">
                    <span>© {new Date().getFullYear()} Global Math  Instittute</span>
                </div>
            </div>
        );

    }
}

export default Footer;
