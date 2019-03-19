export default function makeCharacterSearchUrl(searchOptions) {
    const baseURL = `https://gateway.marvel.com:443/v1/public/characters?name=${searchOptions.searchTerm}&apikey=698ecfea67de32ae8e6a3b78e74af2b3`;

    return baseURL.toString();
}