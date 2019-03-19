export function writeSearchToQuery(existingQuery, searchOptions) {
    const keyword = searchOptions.keyword;
    const searchParams = new URLSearchParams(existingQuery);
    searchParams.set('name', keyword);
    return searchParams.toString();
}

export function writePageToQuery(existingQuery, searchOptions) {
    const page = searchOptions.page;
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
