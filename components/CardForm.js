import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react'
import Button from './Button';
import Select from '@material-ui/core/Select';
import NextCors from 'nextjs-cors';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function CardForm(props) {
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
      const [state, setState] = React.useState({
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
      const {fecha,songs,playlistName} = e.target.elements
      const dataFecha = fecha.value
      //console.log({fecha: fecha.value, songs: songs.value, playlistName: playlistName.value})
      try {
        const res = await axios.post(
          "http://localhost:3000/api/search",
          {
            fecha: fecha.value,
            songs: songs.value,
            playlistName: playlistName.value,
            token: Cookies.get('spotifyAuthToken')
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        console.log(res.data)
      } catch (e) {}     
    }
  
    return (
        
        <form className='CardForm' onSubmit={handleSubmit} style={{width:props.width, height:props.height}}>
          <div className= 'Picker'>
            <p>Choose a name for your new playlist:</p><br/>
            <TextField id="playlistName" color='primary' style={{ margin: 5}} label="My awesome playlist" />
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
    )
}
