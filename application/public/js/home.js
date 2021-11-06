//use var to store the number of Photo
var numPhotos = 0;

function createPhoto() {
    //create div @samplefetch
    function buildImageDiv(imgLink,title){
        let div = document.createElement("div");
        let img = document.createElement("img");
        let imgTitle = document.createElement("div");

        img.src = imgLink;
        img.width = "200";
        img.height = "200";

        imgTitle.innerText = title;
        title.width = "200";
        title.height = "10";

        div.appendChild(img);
        div.appendChild(imgTitle);
        div.width = "220";
        div.height = "220";

        //set style.opacity to 1, if not it will be count as 0 when using it
        div.style.opacity = 1;
        //bind funtion to div for avioding setting ID for each div
        div.onclick = function(){
            var opacity = this.style.opacity;
            let timer = setInterval(function(){
                div.style.opacity  = opacity;
                opacity -= 0.05;
                if(opacity <= 0){
                    clearInterval(timer);
                    opacity = 0;
                    div.style.display = "none";
                    //update number of photo
                    numPhotos--;
                    document.getElementById("Counter").innerHTML = "There are " + numPhotos + " photos are showing";
                }
            }, 100);
        };
        return div;
    }
    //change from example
    let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos"
    fetch(fetchURL)
    .then((response) => response.json())
    .then((photos)=> {
        var div = document.getElementById("container");
        [...photos].forEach( (photos) => {
            let imgURL = photos.url;
            let title = photos.title;
            div.appendChild(buildImageDiv(imgURL,title));
        });
        //update number of photo
        numPhotos = photos.length;
        document.getElementById("Counter").innerHTML= "There are " + numPhotos + " photos are showing";
    })

}

createPhoto();