import React from 'react'

export default function HeroSection({buttonDate,buttonGenre,buttonDecade}) {
    return (
        <div className='HeroSection'>
            <div>
            <h1>Create awesome <br/>playlists that people <br/>will love</h1>
            <div style={{display:'flex',justifyContent:'space-around'}}>
            {buttonDate}
            {buttonGenre}
            {buttonDecade}
            </div>
            </div>
            <img src="./../mockup.png" alt="Mobile phone" width='30%' style={{marginTop: 63}}/>
        </div>
    )
}
