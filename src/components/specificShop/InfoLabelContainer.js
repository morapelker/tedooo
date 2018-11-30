import React from 'react';
import './SpecificShop.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {bgColor} from "../../api/apiConstants";

const InfoLabelContainer = (props) => {
    return (
        <div className='infoBox'>
            <div style={{
                borderRadius: '50%',
                width: 30,
                height: 30,
                padding: 8,
                marginLeft: 5,
                background: bgColor,
                display: 'flex',
                marginTop: 20
            }}>
                <FontAwesomeIcon color={'#fff'}
                                 style={{width: '100%', height: '100%'}}
                                 icon={props.icon}/>
            </div>
            <div style={{height: 10}} />
            {props.labels.map((txt, index) => (
                <label key={index} style={{
                    marginLeft: (5 * index), fontFamily: 'Skia, sans-serif',
                }} className='infoLabel'>{txt}</label>
            ))}
        </div>
    );
};

export default InfoLabelContainer;