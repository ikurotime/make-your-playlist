import Head from 'next/head'
import Card from '../components/CardForm'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'
import Welcome from '../components/Welcome'
import Button from '../components/Button'


export default function Home() {

  /*Aquí establecemos unas cookies que contengan el token de la solicitud, el nombre de usuario y su imágen de perfil.
    Usando useState hacemos que primer valor que se le asigne, en caso de existir, sea el de la cookie, en caso contrario, usamos un valor por defecto*/
  const token = Cookies.get('spotifyAuthToken')
  const [name, setName] = useState(Cookies.get('spotifyName') ? Cookies.get('spotifyName') : 'user')
  const [image, setImage] = useState(Cookies.get('spotifyProfileImage') ? Cookies.get('spotifyProfileImage') : '')
  const [start, setStart] = useState(false)

  const triggerModal = () =>{
    if (start === false){
      setStart(true)
    }
  }
  const triggerModalFalse = () =>{
    if (start === true){
       setStart(false)
    }
  }
  const logout = () =>{
     // Función logout, elimina las cookies y por lo tanto no te hace log in automáticamente 
    Cookies.remove('spotifyAuthToken')
    Cookies.remove('spotifyName')
    Cookies.remove('spotifyProfileImage')
  }

  return (
    /*Al cargar la página comprueba si existe algún token, si existe, el usuario hace login automaticamente y muestra los componentes de la página principal,
      de lo contrario, muestra los componentes para hacer login y generar las cookies correspondientes.*/
   <>
    {token 
    ?(
      <>
    <Navbar title= {name} src={image} logout={logout} action={triggerModalFalse}/>
    {start === false 
    ? <HeroSection button={<Button title='Start now' action={triggerModal}/>}/> 
    :<Card width='90vw' height='90vh'/>}
   </>
   ) 
   : (
   <>
    <Welcome button={
    <SpotifyAuth
    redirectUri='http://localhost:3000/'
    clientID='613994df86694aae8b095860b2f7c3d6'
    scopes={[Scopes.playlistModifyPublic, Scopes.userReadPrivate]} 
    onAccessToken= { async(token) =>{ 
      /* Al recibir un token con éxito, se realiza una llamada asíncrona usando la api y el token,
       lo que devuelve un json con los datos del usuario. Seleccionamos su nombre de usuario y foto de perfil.*/
      const urlSpoty = 'https://api.spotify.com/v1/me?access_token=' + `${token}`
      const response = await fetch(urlSpoty)
      const data = await response.json()
      setName(data.display_name)
      setImage(data.images[0].url)
      Cookies.set('spotifyName', data.display_name)
      Cookies.set('spotifyProfileImage', data.images[0].url)
      location.reload()
    }} 
    btnClassName='login_button'
    logoClassName='logo_button'
    title='Log in with Spotify'/>
    }/>
</>
   )}
   </>
  )
}
