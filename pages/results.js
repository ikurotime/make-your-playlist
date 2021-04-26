import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '../components/Button';
import Footer from '../components/Footer';

export default function results(props) {
    const [finished, setFinished] = useState(false)
    const router = useRouter()
    const {title, data} = router.query
    const jsonQuery = data ? JSON.parse(data) : ''
    var songUris = []
    const accessToken = Cookies.get('spotifyAuthToken')
    const name = Cookies.get('spotifyName')
    const image = Cookies.get('spotifyProfileImage')
    const getUris = () =>{
      for (let i = 0; i <jsonQuery.length; i++) {
        const uri = jsonQuery[i].Uri;
        songUris.push(uri)
      }
      return songUris
    }
    const logout = () =>{
       Cookies.remove('spotifyAuthToken')
       Cookies.remove('spotifyName')
       Cookies.remove('spotifyProfileImage')
     }

    const createPlaylist = () =>{
      return fetch(`https://api.spotify.com/v1/me/playlists`,
      {
        headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          name:title,
          description: "Playlist created on MakeYourPlaylist.com"
        })
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${getUris()}`,
        {
          headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
          method: 'POST',
        }),
        setFinished(true)
      });
    }

     const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(1),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
      }));
     
     const classes = useStyles();    
     const getSongs = ()=>{
        var songList = [];
         for (let i = 0; i < jsonQuery.length; i++) {
            var songTitle = jsonQuery[i].Name;
            var artist = jsonQuery[i].Artist;
            var src = jsonQuery[i].Image;
            songList.push( 
            <Grid item xs={12} key={i}>
                <Paper className={classes.paper, 'itemContainer'}>
                    <img src={src} className='itemImage'/>
                    <div style={{margin:'auto'}}> 
                    <h3 style={{marginBottom:'auto', padding:'0 5px'}} >{songTitle}</h3><br/>
                    <h4 style={{marginTop:'auto', color:'#BDBDBD'}}>{artist}</h4>
                    </div>
                </Paper>
            </Grid>)
         }
         return songList
     }
     

    return (<>
    <Navbar title= {name} src={image} logout={logout}/>
{ finished 

  ? 

  <div className='CardResults' style={{width:'90%', height:'100%', paddingTop:'10px'}}>
  <h1>"{title}" has been added to Spotify</h1>
  <h2>Go and check! If it does not appear, restart the app </h2>
  </div> 

  :

    <div className='CardResults' style={{width:'90%', height:'100%', paddingTop:'10px'}}>
    <h1>Se ha creado tu playlist: "{title}" </h1>
    <Button title='Añadir a Spotify' style={{marginTop: 20, maxWidth: 200}} action={createPlaylist}/>
        <h2>Principales temas</h2>
        <Grid container className='gridContainer'>
        <Grid container item xs={12} spacing={3} >
        {getSongs()}
        </Grid>
      </Grid>
      <Button title='Añadir a Spotify' style={{marginTop: 20, maxWidth: 200}} action={createPlaylist}/>
    </div> 
}
    <Footer/>
            </>
    )
}
