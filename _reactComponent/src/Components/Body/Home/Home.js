import React , { Component } from 'react';
import Carousel from './Carousel.js';
import Modal from '../../Utils/Modal.js';
import Review from './Review.js';
import ReactDOM from 'react-dom';


class Home extends Component{

    constructor(props){
      super(props);
    //  console.log(JSON.stringify(props));

      this.state = {countries: ['USA','Canada','UK','India','Australia','Philippines','Nigeria','UAE','South Africa','New Zealand','Malaysia','Sweden','Norway','Japan','Brazil','Singapore','Denmark','Kenya','Qatar','Jamaica','Thailand','Netherlands','Hong Kong','Finland','Tanzania',
      'South Korea','Bahrain','Kuwait','Indonesia','Bangladesh','SriLanka','Mexico','Israel','Pakistan','Italy','Oman','Spain','Hungry','Iraq','Egypt','Lebanon','Taiwan','France','Romania','Vietnam','Croatia','Belgium','Colombia','Jordan','PuertoRico','Myanmar','Turkey','Nepal','Lithuania','Morocco','Serbia','Poland','Ireland','Somalia','Russia','Greece','Zimbabwe','Ghana','Slovakia','Rwanda','Luxembourg','Zambia','Austria','Algeria','Estonia','Cambodia','Switzerland','Latvia','Belarus',
      'Uganda', 'Argentina','Mauritius','Panama','Cameroon','Barbados'], settings: [], reviews: [], divRefs: props.divRefs};
    }

    componentDidMount() {
      fetch('api/v1/settings/')
        .then(res => {
          console.log('settings is: ' + res);
          return res.json()
        })
        .then(settings => {
          console.log(settings);
          this.setState({"settings": settings })
        });

      fetch('api/v1/reviews/')
        .then(res => {
          return res.json()
        })
        .then(reviews => {
          this.setState({"reviews": reviews })
      });
    }

    render(){
        if(this.props.divRefs.length == 0)
          return (<div> </div>);
        return(
            <div id="BodyContainer" className="container-fluid ana_padding_zero">
                <Carousel />
                <div className="jumbotron ana_margin_zero ">
                    <div id="about" ref={this.props.divRefs.find( ref => {return ref != null && ref.key == 'about'}).ref}>
                        <h1>Global Math Institute</h1>
                        <p>We have more than 12,000 Youtube videos teaching Mathematical concepts.
                          These videos are wathced by students from more than 80 countries. We currently have 40000 subscribers from these countries through out the world</p>
                          <div className="multicolumn">
                            <ul>
                              {
                                this.state.countries.map((country, index) => {
                                  return (<li key={index}> {country}</li>);
                                })
                              }
                            </ul>
                          </div>
                    </div>
                    <div id="reviews"  ref={this.props.divRefs.find( ref => {return ref != null && ref.key == 'reviews'}).ref}>
                      <h1> My Students </h1>
                      <div className="row">
                        {
                          this.state.reviews.map((review, index) => {
                            return(<Review key = {index} review={review} />)
                          })
                        }
                      </div>
                    </div>
                    <div id="contact" ref={this.props.divRefs.find( ref => {return ref.key == 'contact'}).ref}>
                        <h1>Contact Me</h1>
                        <p>Location: 7340 Leesburg Street, Toronto</p>
                        <p>Phone: +1 (647) 979-2791</p>
                        <div className="g-ytsubscribe" data-channelid="UC4Yoey1UylRCAxzPGofPiWw" data-layout="full" data-count="default"></div>
                        <br/>
                        <a href="mailto:anil.anilkhandelwal@gmail.com">anil.anilkhandelwal@gmail.com</a>
                    </div>
                </div>
            </div>
        );

    }

}

export default Home;
