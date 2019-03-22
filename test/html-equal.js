class TemplateError extends Error {}

var pattern = /[\f\n\r\t\v ]{2,}/g;
var replacement = ' ';

function normalize(str) {
    return str.replace(pattern, replacement).trim();
}

QUnit.assert.htmlEqual = function(fragment, expected) {
    if(fragment.children.length > 1) {
        throw new TemplateError('Templates must only have single top-level element');
    }
    const childHTML = fragment.firstElementChild.outerHTML;
    const normalizedActual = normalize(childHTML);
    const normalizedExpected = normalize(expected);
    const result = normalizedActual === normalizedExpected;
    const message = result ? 'okay' : 'HTML was not the same.';

    this.pushResult({
        result,
        actual: normalizedActual,
        expected: normalizedExpected,
        message
    });
};

export default TemplateError;