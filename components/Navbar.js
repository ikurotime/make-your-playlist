import React from 'react'
import NavBig from './NavBig'
import NavSmall from './NavSmall'


export default function Navbar({title, src, logout, button, action}) {

    return (
        <>
        <div className="custom-navbar">
        <a href="/"><img className='p_logo' src='./../logo.svg' width='300px' onClick={action} /></a>
        <NavBig title={title} src={src} logout={logout}/>
        <NavSmall title={title} src={src} logout={logout} button={button}/>
    </div>
      </>  
    )
}
