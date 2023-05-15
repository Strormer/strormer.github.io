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
