import React from "react";
import img1 from "../../assets/images/Rectangle 55.svg";
import img2 from "../../assets/images/Rectangle 55.svg";
import img3 from "../../assets/images/Rectangle 55.svg";
import img4 from "../../assets/images/Rectangle 55.svg";
import Photogrid from "react-facebook-photo-grid";
import FbImageLibrary from "react-fb-image-grid";

const images = [
    "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg",
    "https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg",
    "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg",
    "https://images.pexels.com/photos/257840/pexels-photo-257840.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg",
];

function test() {
    // return (
    //     <div>
    //         <FbImageLibrary images={images} />
    //     </div>
    // );
    return (
        <div>
            <Photogrid
                images={images} //required
                width={600} //optional according to your need
                height={600}
                maxWidth={400} //optional according to your need
                maxHeight={400} //optional according to your need
            />
        </div>
    );
}

export default test;
