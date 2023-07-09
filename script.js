const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// unsplash api key
const apikey = "LqHb54HCVTlNLE0XFFV9YdkMOhaynycKNe22oh90YMM";
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

let ready= false;
let imageLoaded=0;
let totalImage=0;


let photoArray = [];

// check if all images are loaded.
 function imageloaded(){
  imageLoaded++;
  if( imageLoaded === totalImage){
    loader.hidden=true;
    ready= true;
   
  }
 }



// helper function
function setAttributes(element, attribute) {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

//  making function to display photos link , names etc
function displayPhotos() {
  imageLoaded=0;
 totalImage= photoArray.length;


  // function for each objects in photoArray.

  photoArray.forEach((photo) => {
    // creating <a> to link unsplash
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

   

    //  create <img> for photo
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // eventListner, check when each load is finished.
    img.addEventListener('load',imageloaded);


    // putting <img> in <a> and then both these in imageContainer.
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//  making function for getting photos
async function getPhotosFromUnsplashApi() {
  try {
    const response = await fetch(apiUrl);
      photoArray = await response.json();
    displayPhotos();

    // console.log(photoArray);
  } catch (error) {}
}

// checking to see if scrolling near the bottom of page, load more images.
window.addEventListener('scroll',()=>{
  if(window.innerHeight + window.scrollY>= document.body.offsetHeight-1000 && ready){
    ready =false;
    getPhotosFromUnsplashApi();
  }
});



// on load
getPhotosFromUnsplashApi();
