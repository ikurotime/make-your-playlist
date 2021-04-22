import React from 'react'

export default function NavBig(props) {
    return (
        <div className="custom-navbar-right">
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
