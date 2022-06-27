import React from 'react';
import './Header.css'
import noPicture from '../../assets/nopicture.png'

function Header({title, photo, firstName, lastName, aimScore}) {


    return (
        <div className="profile-header-outer-container">
            <div className="profile-header-inner-container">
            <div className="profile-header-title-info-container">
                {title && <div className="profile-header-title">
                    <h1>{title}</h1>
                </div>}
                <div className="profile-header-info">
                    <h1>Lid: {firstName} {lastName}</h1>
                    <h2>Te behalen score: {aimScore}</h2>
                </div>
            </div>
            <div className="profile-header-picture">
                {photo ? <img src={photo} alt="profielfoto"/> : <img src={noPicture} alt="geen foto"/>}
            </div>
            </div>
        </div>
    )
        ;
}


export default Header;