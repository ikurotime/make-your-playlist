import React from 'react'
import { CommonLoading } from 'react-loadingg';

export default function LoadingScreen(props) {
    return (
        <div className='CardForm' style={props.style}>
             <CommonLoading color= '#90dab5' size='small'/>
        </div>
    )
}
