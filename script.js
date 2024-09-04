let newUser = false;

function redirect(landingPage,imagesPage) {
   if(localStorage.getItem("saveNewUser")) {
    landingPage.style.display="none";
    imagesPage.style.display="block";
   }
}
redirect(document.querySelector(".landing"),document.querySelector(".images"));

//saveImages(document.querySelector(".images"))
function displayImagesToSave(images) {
   images.innerHTML = localStorage.getItem("saveImages")
}
//displayImagesToSave(document.querySelector(".images"));


function getUser(getStartedBtn,landingPage,imagesPage) {
   getStartedBtn.onclick = () => {
      newUser = true;
      landingPage.style.display="none";
      imagesPage.style.display="block";
      saveUser();
      
   }
}
getUser(document.querySelector(".landing button"),document.querySelector(".landing"),document.querySelector(".images"));


function saveUser() {
    localStorage.setItem("saveNewUser", newUser);
}

/* ___________<<<<<<<<<<< add New Image >>>>>>>>>>>>_____________ */

function createImage(input,parent) {
   let image = document.createElement("img");
   image.className="imageToSave";
   image.src = URL.createObjectURL(input.files[0]);
   parent.append(image);
}


function addNewImage(input) {
   input.onchange = () => {
      createImage(input,document.querySelector(".images"));
      saveImages(document.querySelector(".images"));
      displayImagesToSave(document.querySelector(".images"))
      zoomImages(document.querySelectorAll(".imageToSave"));
      
   }
}
addNewImage(document.querySelector(".images .i-input"));


function saveImages(imagesPage) {
    localStorage.setItem("saveImages",imagesPage.innerHTML);
}

/* ___________<<<<<<<<<<< integer with images >>>>>>>>>____________*/

function zoomImages(images) {
    for(let image of images){
    
       image.onclick = ()  => {
        image.id="zoomedImage";
        }
        image.ontouchend = ()  => {
        image.id="noZoomed";
        }
      
    }
}
zoomImages(document.querySelectorAll(".imageToSave"));


function deleteImage(images) {
    for(let image of images){
         image.ondblclick = function () {
             image.remove();
             saveImages(document.querySelector(".images"));
         }
    }
 }
deleteImage(document.querySelectorAll(".imageToSave"));
