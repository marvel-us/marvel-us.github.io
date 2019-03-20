export function makeResultListTemplate(comic) {
    const html = /*html*/ `
    <div id="result-card">
        <div style="background-image: url(${comic.thumbnail.path}.${comic.thumbnail.extension})" id="result-card-image">
            <div id="result-card-h2">
                <h2>${comic.title}</h2>
            </div>
        </div>

        <div id="result-card-bottom">
            <span id="result-information">Issue: ${comic.issueNumber} | ${comic.series.name}</span>
            <span id="result-user-control">
                <img src="assets/icons/library-noselect.svg" id="library-icon" alt="library">  
                <img src="assets/icons/wishlist-noselect.svg" id="wishlist-icon" alt="wishlist">
            </span>
        </div>
    </div>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const resultsList = document.getElementById('results-list');

export default function loadComicList(comics) {
    while(resultsList.firstChild) {
        resultsList.firstChild.remove();
    }
    
    comics.forEach(comic => {
        const html = makeResultListTemplate(comic);
        resultsList.appendChild(html);
    });
}