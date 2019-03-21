const resultsList = document.getElementById('results-list');

export default function clearResultsList() {
    while(resultsList.firstChild) {
        resultsList.firstChild.remove();
    }
}