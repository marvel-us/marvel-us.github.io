const comicImageContainer = document.getElementById('comic-image-container');

export function makeDetailImageTemplate(comic) {
    let image = comic.images[0];
    console.log(image);
    console.log(comic);

    if(!image) {
        image = comic.thumbnail;
    }
    const html = `
        <div id="comic-image">
            <img src="${image.path}.${image.extension}" alt="comic image">
        </div>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    comicImageContainer.appendChild(template.content);
}

export function makeDetailInfoTemplate(comic) {

    const title = comic.title;
    const comicCharacters = comic.characters.items;
    const comicCreators = comic.creators.items;
    const description = comic.description;
    const series = comic.series.name;
    const price = comic.prices[0].price;
    
    const iconContainer = document.getElementById('icon-container');
    const titleContainer = document.getElementById('title-container');
    const allCharacters = document.getElementById('all-characters');
    const allCreators = document.getElementById('all-creators');
    const descriptionContainer = document.getElementById('description-container');
    const seriesContainer = document.getElementById('series-container');
    const priceContainer = document.getElementById('price');

    

    const h1 = document.createElement('h1');
    h1.textContent = title;
    titleContainer.appendChild(h1);

    const imgLibraryIcon = document.createElement('img');
    imgLibraryIcon.src = 'assets/icons/library-noselect.svg';
    imgLibraryIcon.id = 'library-icon';
    imgLibraryIcon.alt = 'library';
    imgLibraryIcon.title = 'Add to library';
    iconContainer.appendChild(imgLibraryIcon);
    
    const imgWishlistIcon = document.createElement('img');
    imgWishlistIcon.src = 'assets/icons/wishlist-noselect.svg';
    imgWishlistIcon.id = 'wishlist-icon';
    imgWishlistIcon.alt = 'wishlist';
    imgWishlistIcon.title = 'Add to wishlist';
    iconContainer.appendChild(imgWishlistIcon);

    for(let i = 0; i < comicCharacters.length; i++) {
        const character = {
            name: comicCharacters[i].name,
        };
        const li = document.createElement('li');
        li.textContent = `Name: ${character.name}`;
        allCharacters.appendChild(li);
    }

    for(let i = 0; i < comicCreators.length; i++) {
        const creator = {
            name: comicCreators[i].name,
            role: comicCreators[i].role
        };
        const li = document.createElement('li');
        li.textContent = `Name: ${creator.name}  Role: ${creator.role}`;
        allCreators.appendChild(li);
    }

    if(description) {
        const p = document.createElement('p');
        p.textContent = description;
        p.id = 'description';
        descriptionContainer.appendChild(p);
    } else {
        descriptionContainer.hidden = true;
    }

    const pSeries = document.createElement('p');
    pSeries.textContent = series;
    seriesContainer.appendChild(pSeries);

    const pPrice = document.createElement('p');
    pPrice.textContent = price;
    priceContainer.appendChild(pPrice);
}