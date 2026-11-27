const assert = require('node:assert/strict');
const test = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { FacetedSearchPanel, FormExpansible } = require('../lib');

function checkPanelReference(component, props) {
  const html = renderToStaticMarkup(React.createElement(component, props));
  const header = html.match(/<[^>]+ aria-controls="[^"]+"[^>]*>/)[0];
  const panel = html.match(/<[^>]+ aria-labelledby="[^"]+"[^>]*>/)[0];
  const idOf = tag => tag.match(/ id="([^"]+)"/)[1];
  assert.equal(header.match(/ aria-controls="([^"]+)"/)[1], idOf(panel));
  assert.equal(panel.match(/ aria-labelledby="([^"]+)"/)[1], idOf(header));
}

test('search filter header controls its panel', () => {
  checkPanelReference(FacetedSearchPanel, {
    dynamicFields: [{ name: 'domain', label: 'Domain' }],
    isAccordion: true,
    fullTextSearchEnabled: false,
    handleSubmit: submit => submit,
    submitBtnConfig: { label: 'Search' },
  });
});

test('expandable form header controls its panel', () => {
  checkPanelReference(FormExpansible, {
    fields: [],
    handleSubmit: submit => submit,
    onSubmit: () => Promise.resolve(),
  });
});
