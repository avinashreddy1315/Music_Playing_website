

window.history.forward();

let albumfolder;
let s;

let currentsong = new Audio();
let songname;

let songs;

let currfolder;

//auto play next song function
function autoplaynextsong(){
    if(currentsong.currentTime == currentsong.duration){
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        
        if (index == songs.length - 1) {
            index = 0;
        }
        playmusic(songs[index + 1]); 
    }
}


//function to convert seconds to minutes
function secondstominutes(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingseconds = Math.floor(seconds % 60);

    const formattedminutes = String(minutes).padStart(2, '0');
    const formattedseconds = String(remainingseconds).padStart(2, '0');

    return `${formattedminutes}:${formattedseconds} `;
}


//function to get the songs from the songs folder by using fetch method as we are using client side only
async function getsongs(folder) {
    currfolder = folder;
    let a = await fetch(`/${folder}/`);

    let response = await a.text();
    //creating a new div element
    let div = document.createElement("div");
    div.innerHTML = response;
    console.log(div);
    let as = div.getElementsByTagName("a"); //getting all the anchor tages. 

    songs = [];
    

    //running the for loop to store href links that ends with .mp3 in an empty array.
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]); // after if condition href that ends with .mp3 is going to store ins empty array songs.

        }
    }

    for(let i = 0; i<as.length; i++){
        const element = as[i];
        if(element.href.includes(".jpg")){
            s = element.href.substring(21);
        }
    }
    //console.log(as);


    //show all the songs in playlist
    let songul = document.querySelector("#songlist");
    songul.innerHTML = "";
    for (song of songs) {
        songul.innerHTML = songul.innerHTML + `
        <li>
        <div class="d-flex song-details">
            <img  src="${s}" width="20% >
            <div class="info">
                <div class="currentsongname">${song.replaceAll("%20", " ")}</div>

            </div>
        </div>
        <div class="bttn">
            <button class="playlist-btn">
                <span class=" d-block bi bi-play-fill"></span>
            </button>
        </div>
        
        </li>`;
    }

    



    //attach an vent lsitenr to each song
    Array.from(document.getElementById("songlist").getElementsByTagName("li")).forEach(e =>{
        e.addEventListener("click", element =>{
            songname = e.querySelector(".currentsongname").innerHTML;
            playmusic(songname);
        })
    })


    return songs;

}


const playmusic = (track, pause = false) => {
    //let audio = new Audio("/songs/" + track)
    
    currentsong.src = `/${currfolder}/` + track;
    if (!pause) {
        currentsong.play();
        document.querySelector("#playimg").src = "../images/pause.svg";
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
    let sr = `/${currfolder}/cover.jpg`
    document.querySelector("#playimage").src = sr;
    
    



}

//function to display all the albums
async function displayalbums() {
    //used this one while hosting the website
    //let a = await fetch(`https://spotify1315.freewebhostmost.com/songs/`);
    let a = await fetch(`/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let array = Array.from(anchors)
    console.log(array);
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/songs/")) {
            /* i had used this two lines to get get the album name
            const baseSegments = e.href.split("/").slice(3, -1);
            albumfolder = baseSegments.pop(); */
            albumfolder = e.href.split("/").slice(-1)[0];
            
            console.log(albumfolder);
            //get the metadata of the folder
            let a = await fetch(`/songs/${albumfolder}/info.json`);
            let response = await a.json();
            var cardcontainer = document.querySelector(".cardcontainer");
            cardcontainer.innerHTML = cardcontainer.innerHTML + `
            <div class="card" data-folder="${response.title}">
            <div class="play">
                <button class="play-button d-flex justify-content-center align-items-center"><span
                        class=" fs-3 bi bi-play-fill"></span></button>
            </div>
            <img src="/songs/${albumfolder}/cover.jpg" alt="">
            <h5 class="ms-2">${response.title}</h5>
            <p class="ms-2">${response.description}</p>
        </div>`
        }

    }

    //load the playlist whenever card is clciked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
            playmusic(songs[0]);
        })
    })


    
}

//to show all the songs in the playlist library
async function main() {

    //get the list of all songs
    await getsongs("songs/hanuman");
    playmusic(songs[0], true);


    //Display all the albums on the page
    displayalbums()


    //Attach an event lister to play next and previous songs
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            document.querySelector("#playimg").src = "./images/pause.svg";

        }
        else {
            currentsong.pause();
            document.querySelector("#playimg").src = "./images/play.svg"



        }
    })

    //Listen for time update event
    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondstominutes(currentsong.currentTime)}  /  ${secondstominutes(currentsong.duration)}`;

        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
        document.querySelector(".fillbar").style.width = (currentsong.currentTime / currentsong.duration) * 100 + "%";
        autoplaynextsong();
    })


    //Addan event listener to seek bar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        document.querySelector(".fillbar").style.width = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100;
        

    })


    //Add an event listner for hamburger
    document.querySelector("#hamburger-btn").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0%";

    })

    //Add an event lister for close button on left
    document.querySelector(".close-btn").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-150%";
    })


    



    //Add an eventlister to volume
    document.querySelector(".vol-range").addEventListener("change", (e) => {
        let volume = e.target.value;
        console.log(volume);
        if (volume == 0.0) {
            document.querySelector("#vol").removeAttribute("class", "bi-volume-up");
            document.querySelector("#vol").setAttribute("class", "bi-volume-mute");
        }
        else {
            document.querySelector("#vol").removeAttribute("class", "bi-volume-mute");
            document.querySelector("#vol").setAttribute("class", "bi-volume-up");
            
        }
        currentsong.volume = parseInt(volume) / 100;
    })

    //Add an event listener to next and previous button to go for next and previous songs
    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if (index <= 0) {
            index = 1;
        }
        playmusic(songs[index - 1]);
    })

    next.addEventListener("click", () => {
        
        
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        
        if (index == songs.length - 1) {
            index = 0;
        }
        playmusic(songs[index + 1]);
    })


    document.querySelector(".exp-btn").addEventListener("click", ()=>{
        let playerbar = getComputedStyle(document.querySelector(".playerbar"));
        const height = playerbar.minHeight;
        if(height == "100px"){
            document.querySelector("#exp-icon").removeAttribute("class", "bi-chevron-up");
            document.querySelector("#exp-icon").setAttribute("class", "bi-chevron-down");
            document.querySelector(".playerbar").style.minHeight = "450px";
            document.querySelector(".poster").style.display = "block"
            
           
        }
        else{
            document.querySelector("#exp-icon").removeAttribute("class", "bi-chevron-down");
            document.querySelector("#exp-icon").setAttribute("class", "bi-chevron-up");
            document.querySelector(".poster").style.display = "none"
            document.querySelector(".playerbar").style.minHeight = "100px";
            
        }
        
    })


    //to toogle the dropdown menu for signout

   

    let dropdown_btn = document.querySelector("#smenu");
    
    dropdown_btn.addEventListener("click", ()=>{
        let submenu = document.querySelector("#submenu");
        submenu.classList.toggle("open-menu");
        
    })


}

main()




