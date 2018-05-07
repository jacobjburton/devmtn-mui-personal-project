import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getSliderImages } from '../../redux/reducer';
import './Home.css';



class Home extends Component
{
    componentDidMount()
    {
        this.props.getSliderImages();
    }

    render()
    {
        var settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            centerMode: true,
            //lazyLoad: true
            
        };
        // console.log(this.props.sliderImages[0])
        // let img = <div></div>
        // if (this.props.sliderImages)
        // {
        //     img = <div style={{width: 1024, height:700, backgroundImage: `url('${this.props.sliderImages[0]}')`} }> </div>
        
        // }
        return (
            <div className='body'>
                <Slider {...settings} className='slider'>
                        <div>
     
                            <img src={this.props.sliderImages[0]} alt="firstpic" className='img'/>
                        </div>
                        <div>
                            <img src={this.props.sliderImages[1]} alt="secondpic" className='img'/>
                        </div>
                        <div>
                            <img src={this.props.sliderImages[2]} alt="thirdpic" className='img'/>
                        </div>
                        <div>
                            <img src={this.props.sliderImages[3]} alt="fourthpic" className='img'/>
                        </div>
                        <div>
                            <img src={this.props.sliderImages[4]} alt="sixthpic" className='img'/>
                        </div>
                    </Slider>

                
                </div>
            
        )
    }
}

function mapStateToProps(state)
{
    return (
    {
        sliderImages: state.sliderImages
    })
}

export default connect(mapStateToProps, { getSliderImages })(Home);