import React from 'react'
import NavBig from './NavBig'
import NavSmall from './NavSmall'


export default function Navbar(props) {

    return (
        <>
        <div className="custom-navbar">
        <img className='p_logo' src='./../logo.svg' width='300px' onClick={props.action} />
        <NavBig title={props.title} src={props.src} logout={props.logout}/>
        <NavSmall title={props.title} src={props.src} logout={props.logout} button={props.button}/>
    </div>
      </>  
    )
}
