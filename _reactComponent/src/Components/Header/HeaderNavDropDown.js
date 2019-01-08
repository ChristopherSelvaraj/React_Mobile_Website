import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNavDropDown = ({description,isActive,options}) =>{
    console.log('In HeaderNavDropDown component for url: ' + (description));
    //description={header.label} isActive={header.isActive} URL={header.URL} onClick={ this.onNavHeaderOnClick }
    return (
        <li>
         <a onClick="">{description}
           <i className="fa fa-caret-down"></i>
         </a>
       </li>
    );
}

export default HeaderNavDropDown;
