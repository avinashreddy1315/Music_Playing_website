document.getElementById("hamburger-btn").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "0%";
})

document.querySelector(".close-btn").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "-150%";
} )


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
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/songs/")) {
            /* i had used this two lines to get get the album name
            const baseSegments = e.href.split("/").slice(3, -1);
            albumfolder = baseSegments.pop(); */
            let albumfolder = e.href.split("/").slice(-1)[0];
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

}

async function main() {



    //Display all the albums on the page
    displayalbums()

   /* let modal = document.getElementById("registermodal");

    //adding click function to all cards if any card is clicked a modal should open
    document.addEventListener("DOMContentLoaded", ()=>{
        Array.from(document.getElementsByClassName("card")).forEach(e =>{
            e.addEventListener("click", item =>{    
            modal.style.display = "block";
            })
        })
    })

    //adding a close function to button inside the modal
    let button = document.getElementById("modal-close-btn");
    button.onclick = function(){
        modal.style.backgroundColor = "red";
    } */


    


}


main()