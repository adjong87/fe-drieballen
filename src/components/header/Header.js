import React from 'react';
import './Header.css'
import noPicture from '../../assets/nopicture.png'

function Header({title, data, photo}) {


    return (
        <div className="profile-header-outer-container">
            <div className="profile-header-inner-container">
                <div className="profile-header-title-info-container">
                    {title && <div className="profile-header-title">
                        <h1>{title}</h1>
                    </div>}
                    {data && <div className="profile-header-info">
                        <h1>Lid: {data.firstName} {data.lastName}</h1>
                    </div>}
                </div>
                <div className="profile-header-picture">
                    {photo && <img src={noPicture} alt="profielfoto"/>}
                </div>
            </div>
        </div>
    )
        ;
}


export default Header;