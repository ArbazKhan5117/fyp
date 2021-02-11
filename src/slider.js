import React, { Component } from 'react';
import Header from './header';
import './css/slider.css';
class Slider extends Component {

    render() {
        return (
            <div>
                <Header username="slider-header" />
                <div className='slider'>
                    <input name="input-slider" id='input-slide-0' type="radio" className='input-slide input-slide-num' />
                    <input name="input-slider" id='input-slide-1' type="radio" className='input-slide input-slide-num' />
                    <input name="input-slider" id='input-slide-2' type="radio" className='input-slide input-slide-num' />
                    <input name="input-slider" id='input-slide-3' type="radio" className='input-slide input-slide-num' />
                    <input name="input-slider" id='input-slide-autoplay' type="radio" className='input-slide' checked />
                    <ul>
                        <li className='slide-0'></li>
                        <li className='slide-1'></li>
                        <li className='slide-2'></li>
                        <li className='slide-3'></li>
                    </ul>
                    <div className='slide-description'>
                        <label className='slide-0'>
                            <img src={'/uploads/slider6.jpg'}></img>
                        </label>
                        <label className='slide-1'>
                            <img src={'/uploads/slider4.jpg'}></img>
                        </label>
                        <label className='slide-2'>
                            <img src={'/uploads/slider2.jpg'}></img>
                        </label>
                        <label className='slide-3'>
                            <img src={'/uploads/slider8.jpg'}></img>
                        </label>
                    </div>
                    <div className='slider-arrow-prev'>
                        <label className='slide-0' for='input-slide-0'></label>
                        <label className='slide-1' for='input-slide-1'></label>
                        <label className='slide-2' for='input-slide-2'></label>
                        <label className='slide-3' for='input-slide-3'></label>
                    </div>
                    <div className='slider-arrow-next'>
                        <label className='slide-0' for='input-slide-0'></label>
                        <label className='slide-1' for='input-slide-1'></label>
                        <label className='slide-2' for='input-slide-2'></label>
                        <label className='slide-3' for='input-slide-3'></label>
                    </div>
                    <div className='slider-dot'>
                        <label className='slide-0' for='input-slide-0'></label>
                        <label className='slide-1' for='input-slide-1'></label>
                        <label className='slide-2' for='input-slide-2'></label>
                        <label className='slide-3' for='input-slide-3'></label>
                    </div>
                </div>


            </div>

        );
    }
}
export default Slider;