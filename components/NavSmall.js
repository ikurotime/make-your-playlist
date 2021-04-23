import {useState} from 'react';
import Button from './Button';

//components

const NavSmall = (props) => {
    const [toggleMenu, setToggleMenu] = useState(false)

    const handleToggle = () => {
        setToggleMenu(!toggleMenu)
    }

    return (
        <div className="nav-small" >
            <span className='username' onClick={handleToggle} >{props.title}</span>
            <Button
                action={handleToggle}
                style={{background: `url('${props.src}') center`, backgroundSize: 'cover', borderRadius:50}}
            />
            
            {toggleMenu 
                ? <div className='navOptions'>
                <a href="#Genre">Playlist by genre</a>
                <a href="#Date">Playlist by date</a>
                <a href="#Contact">Contact</a>
                <a href='/'onClick={props.logout}>Log out</a>
            </div>
                    : ""}
        </div>
    )
}
export default NavSmall;