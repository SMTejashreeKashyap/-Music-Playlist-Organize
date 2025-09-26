let playlists=[
  {
    title:'Chill Vibes',
    cover:'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=400&q=60',
    songs:[
      {title:'Soft Flow',artist:'DJ Calm',src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
      {title:'Easy Vibes',artist:'DJ Smooth',src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'}
    ]
  },
  {
    title:'Workout Pump',
    cover:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=60',
    songs:[
      {title:'Run Faster',artist:'DJ Energy',src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'}
    ]
  }
];

let currentPlaylist=null;
let currentSongIndex=0;
let shuffle=false, repeat=false;
const audio=document.getElementById('audioPlayer');

function renderPlaylists(containerId){
  const container=$(`#${containerId}`);
  container.empty();
  playlists.forEach((pl,i)=>{
    container.append(`
      <div class="col-md-4 mb-3">
        <div class="playlist-card p-3" data-index="${i}">
          <img src="${pl.cover}" style="width:100%; border-radius:12px; margin-bottom:8px;">
          <h5>${pl.title}</h5>
          <p>${pl.songs.length} songs</p>
        </div>
      </div>
    `);
  });
}


renderPlaylists('playlistContainer');


$('#navHome').on('click',()=>{
  hideAllSections();
  $('#homeSection').show();
});

$('#navBrowse').on('click',()=>{
  hideAllSections();
  $('#browseSection').show();
  renderPlaylists('browsePlaylistContainer');
});

$('#navLibrary').on('click',()=>{
  hideAllSections();
  $('#librarySection').show();
  renderPlaylists('libraryPlaylistContainer');
});

function hideAllSections(){
  $('#homeSection, #browseSection, #librarySection, #playlistDetailSection').hide();
}


$(document).on('click','.playlist-card',function(){
  let idx=$(this).data('index'); 
  currentPlaylist=playlists[idx]; 
  currentSongIndex=0;
  hideAllSections();
  $('#playlistDetailSection').show();
  $('#playlistTitle').text(currentPlaylist.title);
  renderSongs();
  playSong(currentSongIndex);
});


function renderSongs(){
  $('#songList').empty();
  currentPlaylist.songs.forEach((s,i)=>{
    $('#songList').append(`<li class="list-group-item d-flex justify-content-between align-items-center">${s.title} - ${s.artist} <button class="btn btn-sm btn-outline-light playSongBtn" data-index="${i}"><i class="fas fa-play"></i></button></li>`);
  });
}


function playSong(idx){
  if(!currentPlaylist || currentPlaylist.songs.length===0) return;
  currentSongIndex=idx;
  let s=currentPlaylist.songs[idx];
  audio.src=s.src; 
  audio.play();
  $('#miniPlayer').fadeIn();
  $('#miniTitle').text(s.title);
  $('#miniArtist').text(s.artist);
  $('#miniCover').attr('src',currentPlaylist.cover);
}


$('#miniPlay').on('click',()=>{ if(audio.paused) audio.play(); else audio.pause(); });
$('#miniNext').on('click',()=>{
  if(shuffle){ playSong(Math.floor(Math.random()*currentPlaylist.songs.length));}
  else { currentSongIndex++; if(currentSongIndex>=currentPlaylist.songs.length){ if(repeat) currentSongIndex=0; else return;} playSong(currentSongIndex);}
});
$('#miniPrev').on('click',()=>{ currentSongIndex--; if(currentSongIndex<0){ if(repeat) currentSongIndex=currentPlaylist.songs.length-1; else currentSongIndex=0;} playSong(currentSongIndex); });
$('#shuffleBtn').on('click',()=>{ shuffle=!shuffle; $('#shuffleBtn').toggleClass('btn-success',shuffle); });
$('#repeatBtn').on('click',()=>{ repeat=!repeat; $('#repeatBtn').toggleClass('btn-success',repeat); });


$(document).on('click','.playSongBtn',function(){ playSong($(this).data('index')); });


$('#backHomeBtn').on('click',()=>{ hideAllSections(); $('#homeSection').show(); });
