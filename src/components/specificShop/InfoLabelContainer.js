import React from 'react';
import './SpecificShop.css';
import Img from 'react-image'

const style = {
    imgInfo: {
        width: 40,
        height: 40,
        marginLeft: 5,
        marginTop: 10,
    }
};

const InfoLabelContainer = (props) => {
    return (
        <div className='infoBox'>
            <Img src={props.img} style={style.imgInfo}/>
            {props.labels.map((txt, index) => (
                <label key={index} style={{marginLeft: (5 * index), fontFamily: 'Skia, sans-serif',
                }} className='infoLabel'>{txt}</label>
            ))}
        </div>
    );
};

export default InfoLabelContainer;