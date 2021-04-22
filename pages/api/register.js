import axios from 'axios'
import JSSoup from 'jssoup'
import request from 'request'

export default async function handler(req, res) {
  const { fecha, songs, playlistName, token} = req.body
  res.status(200).json({ fecha: fecha, songs: songs, playlistName: playlistName , token: token})
  
  const URL = 'https://www.billboard.com/charts/hot-100/' + fecha;
  var songNames = []
  var songArtist = []
  var fixedSongNames = []
  var fixedSongArtist = []
  var dictSongArtist = []
  
  

  request(URL, function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  var soup = new JSSoup(body)
  
  const rawNames = soup.findAll('span','chart-element__information__song')
  const rawArtist = soup.findAll('span','chart-element__information__artist')

  for (var i = 0; i < songs; i++) {
    songNames.push(rawNames[i].contents[0]._text) 
 }

 for (var i = 0; i < songNames.length; i++) {
  var fixedStr = songNames[i].replace("&#039;","%27").replace(/ /g,"+")
  var fixedArt = rawArtist[i].contents[0]._text.replace(/ /g,"+").replace(/&amp/g,"+").replace("Featuring", "+").replace("X", "+")
  fixedSongNames.push(fixedStr)
  fixedSongArtist.push(fixedArt)
 }

  for (var i = 0; i < songs; i++) {
    dictSongArtist.push({
      song:fixedSongNames[i],
      artist:fixedSongArtist[i]
    }) 
}
//console.log(fixe)
try {
  const res = axios.post(
    "http://localhost:3000/api/search",
    
    {token: token,
      songs : songs,
      dictSongArtist},
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  console.log(res.config.data) //check now
} catch (e) {}
})}