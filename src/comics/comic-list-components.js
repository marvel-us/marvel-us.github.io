export function makeResultListTemplate(comic) {
    const html = /*html*/ `
    <li>
        <h2>${comic.title}</h2>
        <p>Issue: ${comic.issueNumber}</p>
        <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="Cover of ${comic.title}">
        <p>Series: ${comic.series.name}</p>
    </li>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const resultList = document.getElementById('result-list');

export default function loadComicList(comics) {
    // while loop to remove previous results //

    comics.forEach(comic => {
        const html = makeResultListTemplate(comic);
        resultList.appendChild(html);
    });
}