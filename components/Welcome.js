import React from 'react'

export default function Welcome(props) {
    return (
        <span className= 'WelcomeSection'>
            <img className= 'welcome_Logo' src='./../logo.svg'/>
            {props.button}
        </span>
    )
}
