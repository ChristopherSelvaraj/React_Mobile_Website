import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNavLink = ({description,isActive,url, onClick}) =>{
    console.log('In HeaderNavLink component for url: ' + url + ', and description: ' + JSON.stringify(description));
    //description={header.label} isActive={header.isActive} URL={header.URL} onClick={ this.onNavHeaderOnClick }
    return (
        <li>
            <a className={ isActive ? 'active' : ''} onClick={() => onClick({url}) } > {description} </a>
        </li>
    );
}

export default HeaderNavLink;
