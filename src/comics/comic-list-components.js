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