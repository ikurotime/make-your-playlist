import React from 'react'

export default function HeroSection(props) {
    return (
        <div className='HeroSection'>
            <div>
            <h1>Create awesome <br/>playlists that people <br/>will love</h1>
            {props.button}
            </div>
            <img src="./../mockup.png" alt="Mobile phone" width='30%' style={{paddingTop: 40}}/>
        </div>
    )
}
