import React , { Component } from 'react';

class Carousel extends Component{
    render(){
        return(
            <div className="row ana_margin_zero">
                <div className="col-sm-12 ana_padding_zero">
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                        </ol>

                        <div className="carousel-inner" role="listbox">
                            <div className="item active">
                                <img src="..\Image\carousal_img_1.jpg" className="ana_carousel_img" alt="Students" />
                                <div className="carousel-caption">
                                    <h3>Learn Math With Fun</h3>
                                    <p>Everything is maths.</p>
                                </div>
                            </div>

                            <div className="item">
                                <img src="..\Image\carousal_img_2.jpg" className="ana_carousel_img" alt="Students"/>
                                <div className="carousel-caption">
                                    <h3>Tough Concepts Easy Way</h3>
                                    <p>Everything is maths.</p>
                                </div>
                            </div>

                            <div className="item">
                                <img src="..\Image\carousal_img_3.jpg" className="ana_carousel_img" alt="Students"/>
                                <div className="carousel-caption">
                                    <h3>Learn Online</h3>
                                    <p>Everything is precise calculation.</p>
                                </div>
                            </div>
                        </div>

                        <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Carousel;
