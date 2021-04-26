import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useEffect, useState} from 'react'
import Button from './Button';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import Cookies from 'js-cookie';
import LoadingScreen from './LoadingScreen'
import Router from 'next/router'


export default function CardForm(props) {
  var songsData = []
  var promises = []
  var PlaylistName 
  const [loading, setLoading] = useState(false)

  const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
      }));
      const classes = useStyles();
      const [state, setState] = useState({
        age: '',
        name: 'hai',
      });
      const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

    const handleSubmit = async (e) =>{
      e.preventDefault()
      setLoading(true)
      const {fecha,songs,playlistName} = e.target.elements
      PlaylistName = playlistName.value
      try {
        const res = await axios.post(
          "https://makeyourplaylist.vercel.app/api/search",
          {
            fecha: fecha.value,
            songs: songs.value,
            token: Cookies.get('spotifyAuthToken')
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        ).then(response => {
          promises.push(
            songsData = response.data.songUris
          )
          })

          Promise.all(promises).then(Router.push(
            {pathname: '/results',
            query: {title: PlaylistName, data: JSON.stringify(songsData)}}))

      } catch (e) {}   
    }
    
    return (<>
    {loading ? <LoadingScreen style={{width:props.width, height:props.height}}/>
    :
    <form className='CardForm' onSubmit={handleSubmit} style={{width:props.width, height:props.height}}>
    <div className= 'Picker'>
      <p>Choose a name for your new playlist:</p><br/>
      <TextField id="playlistName" color='primary' style={{ margin: 5 }} label="My awesome playlist" />
    </div>
    <div className= 'datePicker'>
        Select a date:   <TextField
                          style={{marginLeft: 20}}
                          id="fecha"
                          label=""
                          type="date"
                          defaultValue="2021-01-01"
                          className={classes.textField}
                          InputLabelProps={{
                          shrink: true,
                          }}
                      />
    </div>
    <div className= 'datePicker'>
        Select songs:   <Select
                              style={{marginLeft: 20}}
                              native
                              value={state.age}
                              onChange={handleChange}
                              inputProps={{
                                name: 'age',
                                id: 'songs',
                              }}
                            >
    <option value={100}>Top 100</option>
    <option value={75}>Top 75</option>
    <option value={50}>Top 50</option>
    <option value={25}>Top 25</option>
    <option value={10}>Top 10</option>

  </Select>
    </div>
    
    <div>
    <Button title='Make my playlist' submit />
    </div>
  </form>
  }
  </> 
        
    )
}
