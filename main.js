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
});

async function getPictures(URL) {
    let response = await fetch(URL)
    return await response.json();
    }

function displayImages(images) {
    let imageContainer = document.getElementById('image-container');
    while (imageContainer.firstChild){
        imageContainer.removeChild(imageContainer.firstChild);
    }
    images.forEach(image => {
        let imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        let imageElement = document.createElement('img');
        imageElement.src = image.webformatURL;
        imageElement.alt = image.tags;
        imageElement.alt = image.user;

        let photographerText = document.createElement('p');
        let photographerInfo = document.createTextNode('Photographer: ' + image.user + '. ');
        photographerText.appendChild(photographerInfo);
        let tagText = document.createElement('p');
        let imgTags = document.createTextNode('Tags: ' + image.tags + '.');
        tagText.appendChild(imgTags)

        imageItem.appendChild(imageElement);
        imageItem.appendChild(photographerText);
        imageItem.appendChild(tagText);
        imageContainer.appendChild(imageItem);
    });

}
