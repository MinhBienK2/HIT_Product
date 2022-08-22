import React from "react";
import img1 from "../../assets/images/Rectangle 55.svg";
import img2 from "../../assets/images/Rectangle 55.svg";
import img3 from "../../assets/images/Rectangle 55.svg";
import img4 from "../../assets/images/Rectangle 55.svg";
import Photogrid from "react-facebook-photo-grid";
// import FbImageLibrary from "react-fb-image-grid";

function test() {
    return (
        <Photogrid
            images={[
                `${process.env.REACT_APP_BACKEND_URL}/images/photos/photos-62e817c3bdb06bddf5f3bd59-1659461689576.jpeg`,
            ]} //required
            width={600} //optional according to your need
            // height={600}
            maxWidth={400} //optional according to your need
            // maxHeight={400} //optional according to your need
        />
    );
}

export default test;
