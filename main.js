let apiKey = "42146396-17c29595aecd509581a48434e";
let form = document.querySelector('#search-form');
form.addEventListener('submit', async function(event){
    event.preventDefault();
    let searchTerm = document.getElementById('search-term').value;
    let selectedColor = document.getElementById('colors').value;
    let URL;
    if (selectedColor === 'any-color') {
        URL = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}&per_page=10`;
    }
    else {
        URL = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(selectedColor + ' ' + searchTerm)}&per_page=10`;
    }
    let pictures = await getPictures(URL);
    displayImages(pictures.hits);
    alert(URL);
});

async function getPictures(URL) {
    let response = await fetch(URL)
    return await response.json();
    }

function displayImages(images) {
    let imageContainer = document.getElementById('image-container');
    for(images in imageContainer){
        imageContainer.removeChild(imageContainer.firstChild);
    }
    images.forEach(image => {
        let imageElement = document.createElement('img');
        imageElement.src = image.webformatURL;
        imageContainer.appendChild(imageElement);
    });
}
