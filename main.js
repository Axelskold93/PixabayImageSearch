let apiKey = "42146396-17c29595aecd509581a48434e";
let form = document.querySelector('#search-form');
let previousPageButton = document.getElementById('previous-page');
let nextPageButton = document.getElementById('next-page');
let URLWithColor;
let URLAnyColor;
let currentURL;
let currentPage;

form.addEventListener('submit', async function(event){
    event.preventDefault();
    currentPage = 1;
    let searchTerm = document.getElementById('search-term').value;
    let selectedColor = document.getElementById('colors').value;
    if (selectedColor === 'any-color') {
        URLAnyColor = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}&per_page=10`;
        let pictures = await getPictures(URLAnyColor);
        displayImages(pictures.hits);
        currentURL = URLAnyColor;
        hideOrShowPageButtons(currentPage, pictures);
    }
    else {
        URLWithColor = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(selectedColor + ' ' + searchTerm)}&per_page=10`;
        let pictures = await getPictures(URLWithColor);
        displayImages(pictures.hits);
        currentURL = URLWithColor;
        hideOrShowPageButtons(currentPage, pictures);
    }
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

function hideOrShowPageButtons(currentPage, pictures) {

    if (currentPage > 1) {
        previousPageButton.style.display = 'block';
    } else {
        previousPageButton.style.display = 'none';
    }
    
    if (currentPage < Math.ceil(pictures.totalHits / 10)) {
        nextPageButton.style.display = 'block';
    } else {
        nextPageButton.style.display = 'none';
    }
}



nextPageButton.addEventListener('click', async function() {
    currentPage++;
    pictures = await getPictures(`${currentURL}&page=${currentPage}`);
    displayImages(pictures.hits);
    hideOrShowPageButtons(currentPage, pictures)
});

previousPageButton.addEventListener('click', async function() {
    if (currentPage > 1) {
        currentPage--;
        pictures = await getPictures(`${currentURL}&page=${currentPage}`);
    displayImages(pictures.hits);
    hideOrShowPageButtons(currentPage, pictures);    
    }
});






