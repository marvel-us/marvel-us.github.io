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
            <span id="result-user-control">Library | Favorite</span>
        </div>
    </div>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const resultsList = document.getElementById('results-list');

export default function loadComicList(comics) {
    // while loop to remove previous results //

    comics.forEach(comic => {
        const html = makeResultListTemplate(comic);
        resultsList.appendChild(html);
    });
}