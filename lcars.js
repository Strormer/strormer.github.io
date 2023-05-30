document.addEventListener("touchstart", function() {},false);

$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('.scroll-top a').fadeIn();
    } else {
        $('.scroll-top a').fadeOut();
    }
});

$(document).ready(function() {
    $("#scroll-top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});

// Below here lies additional code I've appended into this js file for Luna Shipyards
function myFunction(imgs) {
  // Get the expanded image
  var expandImg = document.getElementById("expandedImg");
  // Get the image text
  var imgText = document.getElementById("imgtext");
  // Use the same src in the expanded image as the image being clicked on from the grid
  expandImg.src = imgs.src;
  // Use the value of the alt attribute of the clickable image as text inside the expanded image
  imgText.innerHTML = imgs.alt;
  // Show the container element (hidden with CSS)
  expandImg.parentElement.style.display = "block";
}

const apiKey = '0a28e6d800b1c3a72d2fc921f2d7eabb';
const userId = '188959913@N07';

fetch(`https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`)
  .then(response => response.json())
  .then(data => {
    const albums = data.photosets.photoset;
    const albumsContainer = document.getElementById('albums');
    
    albums.forEach(album => {
      const albumItem = document.createElement('li');
      albumItem.innerHTML = `<a href="#" data-album-id="${album.id}">${album.title._content}</a>`;
      albumsContainer.appendChild(albumItem);
    });
  })
  .catch(error => {
    console.error('Error fetching Flickr albums:', error);
  });

// Add this code after populating the album list (step 2)

// Event listener for album click
const albumList = document.getElementById('albums');
albumList.addEventListener('click', event => {
  event.preventDefault();
  const target = event.target;
  
  if (target.tagName === 'A') {
    const albumId = target.getAttribute('data-album-id');
    openGallery(albumId);
  }
});

// Function to open the gallery
function openGallery(albumId) {
  const apiKey = '0a28e6d800b1c3a72d2fc921f2d7eabb';

  fetch(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${albumId}&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(data => {
      const photos = data.photoset.photo;
      const galleryContainer = document.getElementById('gallery');
      const expandedImgContainer = document.getElementById('expandedImgContainer');

      // Clear existing gallery content
      galleryContainer.innerHTML = '';

      // Create and append gallery images
      photos.forEach(photo => {
        const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

        const galleryImg = document.createElement('img');
        galleryImg.src = photoUrl;
        galleryImg.alt = photo.title;

        galleryImg.addEventListener('click', function() {
          myFunction(this);
        });

        galleryContainer.appendChild(galleryImg);
      });

      // Display the gallery
      expandedImgContainer.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching Flickr photos:', error);
    });
}
