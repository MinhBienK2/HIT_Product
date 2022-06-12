import React from 'react';
import WidgetsRow from './WidgetsRow';
import BigDot from '../../assets/icons/Ellipse 6.svg';
import dot3 from '../../assets/icons/Group 33.svg';
import search from '../../assets/icons/akar-icons_search.svg';
import ava from '../../assets/images/ava5.jpg'
import './Widgets.scss';

function Widgets() {
    return (
        <div className="widgets">
            <div className="widgets-top">
                <div className="widgets-top-left">
                    <p>Bạn bè đang hoạt động</p>
                    <img src={BigDot} alt="" />
                </div>
                <div className="widgets-top-right">
                    <img src={search} alt="" />
                    <img src={dot3} alt="" className="widgets-top-right-dot3"/>
                </div>
            </div>
            <div className="widgets-bottom">
                <WidgetsRow
                    avatar={ava}
                    title='Thao'
                />
                <WidgetsRow
                    // avatar={ava}
                    title='Taylor Swift'
                />
            </div>
        </div>
    );
}

export default Widgets;
