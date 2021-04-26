import axios from 'axios'
import JSSoup from 'jssoup'
import request from 'request'
/* TO DO 1: Añadir un modal de carga mientras la api busca las canciones y su información o mostrar la pagina de carga
y cuando cargue actualizar pagina a la del TO DO 2 - HECHO*/
/* TO DO 2: Seleccionar uri, nombre, artista y foto , incluirlos en un diccionario y mostrar un modal 
 (o página aparte,seguramente) donde se muestren componentes con imagen titulo etc y confirmar para añadir
 a una nueva playlist - HECHO*/
 /*Idea: varios botones para cada accion, crear playlist, editar playlist, fusionar playlists. */
export default async function handler(req, res) {
  
  const { fecha, songs, token} = req.body
  
  const URL = 'https://www.billboard.com/charts/hot-100/' + fecha;
  var songNames = []
  var artistNames = []
  var fixedSongNames = []
  var fixedSongArtist = []
  var dictSongArtist = []
  var songUris = [];

  request(URL, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var soup = new JSSoup(body);
  

    const rawNames = soup.findAll('span', 'chart-element__information__song');
    const rawArtist = soup.findAll('span', 'chart-element__information__artist');

    for (var i = 0; i < songs; i++) {
      songNames.push(rawNames[i].contents[0]._text);
    }

    for (var i = 0; i < songNames.length; i++) {
      var fixedStr = songNames[i].replace("&#039;", "%27").replace(/ /g, "+");
      artist = rawArtist[i].contents[0]._text;
      var fixedArt = rawArtist[i].contents[0]._text.replace(/ /g, "+").replace(/&amp/g, "+").replace("Featuring", "+").replace("X", "+");
      fixedSongNames.push(fixedStr);
      artistNames.push(artist);
      fixedSongArtist.push(fixedArt);
    }

    for (var i = 0; i < songs; i++) {
      dictSongArtist.push({
        song: fixedSongNames[i],
        artist: fixedSongArtist[i]
      });
    }

    var promises = [];
    for (var i = 0; i < songs; i++) {
      var track = dictSongArtist[i].song;
      var artist = dictSongArtist[i].artist;
      var URL = `https://api.spotify.com/v1/search?q=${track}+artist%3A${artist}&type=track&access_token=${token}`;
      var uri = [];
      var artist = [];
      var name = [];
      var image = []
      var data = [];
      promises.push(  
        axios.get(URL)
          .then(response => {
            data = response.data;
            artist = data.tracks.items[0].album.artists[0].name;
            uri = data.tracks.items[0].uri;
            name = data.tracks.items[0].name;
            image = data.tracks.items[0].album.images[1].url;
            songUris.push({
              Name: name,
              Artist: artist,
              Image: image,
              Uri: uri
            });
          })
          .catch((error) => {
            console.log(data.tracks.items[0])
          })  
      );
    }
    
    Promise.all(promises).then(() => res.status(200).json({ songUris }));
  })}