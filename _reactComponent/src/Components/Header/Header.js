import React, { Component } from 'react';
import HeaderNavLink from './HeaderNavLink.js';
import HeaderNavDropDown from './HeaderNavDropDown.js';
import Brand from './Brand.js';

import { Link } from 'react-router-dom';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {isMobileNavOpen : false, courses: []};

        this.sideMenuRemoveHandler = this.sideMenuRemoveHandler.bind(this);
        this.openNav = this.openNav.bind(this);
        this.onNavHeaderOnClick = this.onNavHeaderOnClick.bind(this);
        this.toggleCourseMenu = this.toggleCourseMenu.bind(this);
    }

    sideMenuRemoveHandler(event){

        if (!event.target.matches('#mobileNav')) {
            this.setState({isMobileNavOpen : false});
            document.removeEventListener('click',this.sideMenuRemoveHandler);
        }
    };

    openNav() {
        this.setState({isMobileNavOpen : true});
        document.addEventListener('click',this.sideMenuRemoveHandler);
    }

    searchOpen(){
        document.getElementById("myDropdown").classList.toggle("ana_dropdown_show");
    }

    coursesOpen(){
      document.getElementById("myCourses").classList.toggle("ana_dropdown_show");
    }

    onNavHeaderOnClick(key){
      var ref = this.props.divRefs.find( divRef => {return divRef!= null && divRef.key == key.url});
      ref.onClick();
    }

    componentDidMount(){
      fetch('api/v1/courses/')
        .then(res => {
          return res.json()
        })
        .then(courses => {

          this.setState({courses: courses, showCourseMenu: false})
        });
    }

    toggleCourseMenu(){
      console.log('here')
      this.setState({showCourseMenu : !this.state.showCourseMenu})
    }

    render(){
        return(
            <div id="Header" className="header">
                <div className="container">
                    <div className="ana_res_nav_opener">
                        <span className="ana_icon" onClick={this.openNav}> &#9776; </span>
                    </div>
                    <div className="ana_logo">
                        <span className="ana_logo"><Brand /></span>
                    </div>
                    <div id="mobileNav" className={ this.state.isMobileNavOpen ? "ana_leftnav ana_nav_open" : "ana_leftnav" }>
                        <ul className="ana_nav_ul">
                            <li className="closebtn">&times;</li>
                            {console.log("state is : " + JSON.stringify(this.state))}
                            {
                                this.props.headers.map((header,index) => {
                                  if(header.type === 'url'){
                                    console.log('in url type of header');
                                      return (<HeaderNavLink key={header.key} description={header.label} isActive={header.isActive} url={header.url} onClick={ this.onNavHeaderOnClick} />);
                                  }else if(header.type == 'multioption-url'){
                                    return (
                                      <li>
                                       <a onClick={this.toggleCourseMenu}>{header.label}
                                         <i className={'fa ' + (this.state.showCourseMenu ? 'fa-caret-up' : 'fa-caret-down')}></i>
                                       </a>
                                     </li>
                                    )
                                  }
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div id="nav_references" className="container">
                  <div className="row">
                  <div className="col-11  col-sm-11 col-md-11 col-lg-11 col-xl-11">
                  </div>
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                      <span className={'ana_close_list_menu ' + (this.state.showCourseMenu ? 'show' : 'hide')} onClick={this.toggleCourseMenu}>×</span>
                    </div>
                  </div>
                  <div className="row">
                    {
                      this.state.courses.map((course, index) => {
                        if(this.state.showCourseMenu)
                          return(
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 ana_list_menu">
                              <h4> {course.Label} </h4>
                              <div className="row" >
                                {
                                  course.topics.map((topic, index) => {
                                    return(
                                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ana_list_menu">
                                        <Link onClick={this.toggleCourseMenu} key={topic.id} to={'/topic/' + topic.id}>{topic.label}</Link>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                          )
                      })
                    }
                  </div>
                </div>
            </div>
        );
    }
}
export default Header;
