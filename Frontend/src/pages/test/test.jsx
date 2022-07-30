import React from 'react'
import img1 from '../../assets/images/Rectangle 55.svg'
import img2 from '../../assets/images/Rectangle 55.svg'
import img3 from '../../assets/images/Rectangle 55.svg'
import img4 from '../../assets/images/Rectangle 55.svg'
import Photogrid from "react-facebook-photo-grid";

function test() {

    const arr = [img1, img2, img3, img4];

  return (
    <div>
        <h1>thao</h1>
        <Photogrid
            images={arr} //required
            // width={600} //optional according to your need
            maxWidth={400} //optional according to your need
    ></Photogrid>
    </div>
  )
}

export default test