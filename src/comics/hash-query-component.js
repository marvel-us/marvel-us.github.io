export function writeSearchToQuery(existingQuery, searchOptions) {
    const keyword = searchOptions.keyword;
    const searchParams = new URLSearchParams(existingQuery);
    searchParams.set('name', keyword);
    searchParams.set('page', 1);
    return searchParams.toString();
}

export function writePageToQuery(existingQuery, page) {
    const searchParams = new URLSearchParams(existingQuery);
    searchParams.set('page', page);
    return searchParams.toString();
}

export function readFromQuery(existingUrl) {
    const searchParams = new URLSearchParams(existingUrl);
    const searchOptions = {
        keyword: searchParams.get('name'),
        page: parseInt(searchParams.get('page')) || 1
    };
    return searchOptions;
}

export function writeUpcSearch(existingQuery, upcCode) {
    existingQuery = '';
    const searchParams = new URLSearchParams(existingQuery);
    searchParams.set('upc', upcCode);
    return searchParams.toString();
}

export function writeIdSearch(existingQuery, upcCode) {
    existingQuery = '';
    const searchParams = new URLSearchParams(existingQuery);
    searchParams.set('id', upcCode);
    return searchParams.toString(); 
}