const wrapper = document.querySelector(".wrapper"),
volumeBar = document.querySelector('.volume_bar'),
volume = volumeBar.querySelector('#volume'),
volumeSkin = volumeBar.querySelector('#volume_skin'),
volumeLevel = volumeBar.querySelector('#volume_level'),
expandMore = wrapper.querySelector("#expand_more"),
volumeControl = wrapper.querySelector("#volume_control"),
closeexpandMore = wrapper.querySelector("#popup_close"),
popUp = wrapper.querySelector(".popup"),
musicCover = wrapper.querySelector(".img-area"),
musicAni1 = wrapper.querySelector(".img-area .chunsik"),
songDetails = wrapper.querySelector(".song-details"),
musicAni2 = wrapper.querySelector(".song-details .chunsik"),
musicImg = wrapper.querySelector(".img-area .cover-img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
moreMusicBtn = wrapper.querySelector("#more-music"),
closemoreMusic = musicList.querySelector("#close"),
comment = document.querySelector(".comment");

//start_animation
wrapper.classList.add("ani");
musicCover.classList.add("ani");
songDetails.classList.add("ani");
progressArea.classList.add("ani");
playPauseBtn.classList.add("ani");
prevBtn.classList.add("ani");
nextBtn.classList.add("ani");
comment.classList.add("ani");

//popup toggle
expandMore.addEventListener("click", ()=>{
  popUp.classList.toggle("show");
});
closeexpandMore.addEventListener("click", ()=>{
  expandMore.click();
});

// let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
let musicIndex = 1;
isMusicPaused = true;

window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
  playingSong();
});

function loadMusic(indexNumb){
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//volume show
volumeControl.addEventListener("click", ()=>{
  volumeBar.classList.toggle("show");
});

//change volume
function volume_change(){
	mainAudio.volume = volume.value / 100;
  volumeSkin.style.width = volume.value + "%";
	volumeLevel.innerHTML = volume.value;
}

//play music function
function playMusic(){
  wrapper.classList.add("paused");
  musicAni1.classList.add("paused");
  musicAni2.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

//pause music function
function pauseMusic(){
  wrapper.classList.remove("paused");
  musicAni1.classList.remove("paused");
  musicAni2.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

//prev music function
function prevMusic(){
  if(repeatBtn.innerText == "shuffle"){
    shufflePlay();
  }else{
    musicIndex--; //decrement of musicIndex by 1
    //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    mainAudio.oncanplaythrough = function(){  // 로드 완료되면 실행
      playMusic();
    }
    playingSong();
  }
}

//next music function
function nextMusic(){
  if(repeatBtn.innerText == "shuffle"){
    shufflePlay();
  }else{
    musicIndex++; //increment of musicIndex by 1
    //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    mainAudio.oncanplaythrough = function(){  // 로드 완료되면 실행
      playMusic();
    }
    playingSong();
  }
}

// play or pause button event
playPauseBtn.addEventListener("click", ()=>{
  const isMusicPlay = wrapper.classList.contains("paused");
  //if isPlayMusic is true then call pauseMusic else call playMusic
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

//prev music button event
prevBtn.addEventListener("click", ()=>{
  prevMusic();
});

//next music button event
nextBtn.addEventListener("click", ()=>{
  nextMusic();
});

//music Desktop touch event
var mstartX = 0,mendX = 0,mstartY = 0,mendY = 0;
musicCover.addEventListener('mousedown', (event) => {
  mstartX = event.pageX;
  mstartY = event.pageY;
});
musicCover.addEventListener('mouseup', (event) => {
  mendX=event.pageX;
  mendY=event.pageY;

  if(mstartX-mendX>50){
    nextMusic();
  }else if(mendX-mstartX>50){
    prevMusic();
  }
});
//music mobile touch event
function touch_start(event){
  touchstartX = event.touches[0].pageX;
}
function touch_end(event){
  touchendX = event.changedTouches[0].pageX;
  if(touchstartX-touchendX>50){
    nextMusic();
  }else if(touchendX-touchstartX>50){
    prevMusic();
  }
}
musicCover.addEventListener('touchstart', touch_start);
musicCover.addEventListener('touchend', touch_end);

// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; //getting playing song currentTime
  const duration = e.target.duration; //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
  musicDuartion = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", ()=>{
    // update song total duration
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing song currentTime on according to the progress bar width
progressArea.addEventListener("click", (e)=>{
  let progressWidth = progressArea.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudio.duration; //getting song total duration

  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); //calling playMusic function
  playingSong();
});

//change loop, shuffle, repeat icon onclick
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

// suffle function
function shufflePlay(){
  do{
    randIndex = Math.floor((Math.random() * allMusic.length) + 1);
  }while(musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
  musicIndex = randIndex; //passing randomIndex to musicIndex
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

//code for what to do after song ended
mainAudio.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      nextMusic(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudio.currentTime = 0; //setting audio current time to 0
      loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusic(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
      shufflePlay();
      break;
  }
});

//show music list onclick of music icon
moreMusicBtn.addEventListener("click", ()=>{
  musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", ()=>{
  moreMusicBtn.click();
});

const ulTag = musicList.querySelector("ul");
// let create li tags according to array length for list
for (let i = 0; i < allMusic.length; i++) {
  //let's pass the song name, artist from the array
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag

  let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
  });
}

//play particular song from the list onclick of li tag
function playingSong(){
  const allLiTag = ulTag.querySelectorAll("li");

  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");

    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    //if the li tag index is equal to the musicIndex then add playing class in it
    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

//particular li clicked function
function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //updating current song index with clicked li index
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}
