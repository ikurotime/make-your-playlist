import React from 'react'
import Button from './button'


export default function Navbar(props) {

    return (
        <div className="custom-navbar">
            <img className='p_logo' src='./../logo.svg' width='300px' onClick={props.action} />
            <a href="#Genre">Playlist by genre</a>
            <a href="#Date">Playlist by date</a>
            <a href="#Contact">Contact</a>
            <div>
            <a href='#'>{props.title}</a>
            <img style={{borderRadius: 25, paddingLeft: 1}} width="45" src={ props.src }/>
            </div>
            <a href='/'onClick={props.logout}>Log out</a>
        </div>
    )
}
