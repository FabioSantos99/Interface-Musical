const dogs = {
    id: '0',
    songName: 'Dogs',
    artist: 'Pink Froyd',
    album: 'Animals',
    coverFile: 'Pink_Floyd-Animals.jpg'
};
const jumCelestino = {
    id: '1',
    songName: 'Jumento Celestino',
    artist: 'MAm',
    album: 'boys and crys',
    coverFile: 'Cd_Rom_Mamonas.jpg'
}; 

const liveforever = {
    id: '2',
    songName: 'live forever',
    artist:'Oasis',
    album: 'Definitely maybe',
    coverFile: '7620.webp'
};

const sonicYouth = {
    id: '3',
    songName: 'Superstar',
    artist: "Sonic Youth",
    album: "Carpenters",
    coverFile: 'superstar.jpg'
};

const deadKennedys = {
    id: '4',
    songName: 'Holiday in Cambodja',
    artist: 'Dead Kennedys',
    album: 'Cambodja',
    coverFile: 'album_DK.webp'
};

const cantHide = {
    id: '5',
    songName: 'Cant Hide',
    artist: 'Otis McDonald',
    album: 'Otis McDonald',
    coverFile: 'retro1.jpg',
};

const musicLibrary = [
    dogs, 
    jumCelestino, 
    liveforever, 
    sonicYouth, 
    deadKennedys, 
    cantHide,
];

let songs = [...musicLibrary];

let playlist = JSON.parse(localStorage.getItem('playlist')) ?? [   dogs,
    sonicYouth,
    jumCelestino, 
    liveforever,
    cantHide,];

const pageBody = document.getElementById('page-body');
const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search-button');
const playlistElement = document.getElementById('playlist');



function loadLibrary(){
    pageBody.innerHTML = '';

    for(let index = 0; index < musicLibrary.length; index++) {
        pageBody.innerHTML +=
         `<div class="card d-flex d-flex-column align-items-center" style="width: 18rem; height: 30rem">
        <img src="/img/${songs[index].coverFile}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${songs[index].songName}</h5>
          <p class="card-text">${songs[index].album}</p>
          <p class="card-text">${songs[index].artist}</p>

          <button class="btn btn-outline-success" onclick="addToPlaylist('${songs[index].id}')"><i class="bi bi-plus-circle"></i></button>
        </div>
      </div>`;
    }
}



function loadPlaylist() {
    playlistElement.innerHTML = '';
    for(let index = 0; index < playlist.length; index++ ){
        playlistElement.innerHTML += `<p id=${playlist[index].id} class="d-flex justify-content-between border-top border-bottom align-items-center">${playlist[index].songName } - ${playlist[index].artist}<button class="btn btn-outline-danger " onclick="removeFromPlaylist('${playlist[index].id}')">
        <i class="bi bi-trash"></i>
        </button></p>`;
    }
}




function searchClick(){
    if(searchTerm.value === '') return;
    songs = songs.filter((song) => song.songName.includes(searchTerm.value) || song.album.includes(searchTerm.value) || song.artist.includes(searchTerm.value));
    loadLibrary();
}



function resetfilter() {
    if (searchTerm.value !== '') return;
    songs = [...musicLibrary];
    loadLibrary();
}




function removeFromPlaylist(songId) {
    playlist = playlist.filter((song) => song.id !== songId);
    document.getElementById(songId).remove();
    upDateLocalStorage();
}



function addToPlaylist(songId) {
    if (playlist.find((song) => song.id === songId)) return;
    const songToAdd = songs.find((x) => x.id === songId);
    playlist.push(songToAdd);

    playlistElement.innerHTML += `<p id=${songToAdd.id} class="d-flex justify-content-between border-top border-bottom align-items-center">

    ${songToAdd.songName } - ${songToAdd.artist}
    <button class="btn btn-outline-danger" onclick="removeFromPlaylist('${songToAdd.id}')">
    <i class="bi bi-trash"></i>
    </button></p>`;
    upDateLocalStorage();
}



function upDateLocalStorage(){
    localStorage.setItem('playlist', JSON.stringify(playlist));
}



searchBtn.addEventListener('click', searchClick);
searchTerm.addEventListener('input', resetfilter);

loadLibrary();
loadPlaylist();
