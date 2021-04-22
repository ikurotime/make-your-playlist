import axios from "axios"
/* TO DO 1: Añadir un modal de carga mientras la api busca las canciones y su información o mostrar la pagina de carga
y cuando cargue actualizar pagina a la del TO DO 2*/
/* TO DO 2: Seleccionar uri, nombre, artista y foto , incluirlos en un diccionario y mostrar un modal 
 (o página aparte,seguramente) donde se muestren componentes con imagen titulo etc y confirmar para añadir
 a una nueva playlist*/
 /*TO DO 3: Hacer la Navbar Responsive */
 
export default function handler(req, res) {
    const { dictSongArtist, token, songs} = req.body
    res.status(200).json(dictSongArtist)
    var songUris = []
    var promises = []
    for (var i = 0; i < songs; i++) {
      var track = dictSongArtist[i].song
      var artist = dictSongArtist[i].artist
      var URL = `https://api.spotify.com/v1/search?q=${track}+artist%3A${artist}&type=track&access_token=${token}`
      var uri = []
      var data = []
      promises.push(
        //{ headers: {  Authorization: `${AuthStr}` }}
        axios.get(URL )
      .then(response => {
          data = response.data// If request is good...
          uri = data.tracks.items[0].uri
         songUris.push(uri)
       })
      .catch((error) => {
          console.log(data)
       })    //console.log(dictSongArtist[0])
      )     
  }
  Promise.all(promises).then(() => console.log(songUris,songUris.length));
}