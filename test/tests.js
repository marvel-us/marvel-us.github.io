import { app } from '../src/firebase/firebase.js';
import './html-equal.js';
import './functions/make-result-list-template.test.js';
import './functions/header.test.js';
import './functions/make-search-url.test.js';
import './functions/hash-query.test.js';
import './functions/object-to-array.test.js';

QUnit.done(() => {
    app.delete();
});