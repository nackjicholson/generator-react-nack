import $ from 'teaspoon';
import assert from 'assert';
import React from 'react';
import <%= classComponentName %> from './<%= classComponentName %>';

describe('<%= classComponentName %>', () => {
  it('should render Hello, World! h1 by default', () => {
    const actual = $(<<%= classComponentName %> />)
      .render()
      .find('h1')
      .text();
    const expected = 'Hello, World!';

    assert.equal(actual, expected, 'rendered greeting using default props');
  });

  it('should render custom greeting prop', () => {
    const props = { greeting: 'test.greeting' };

    const actual = $(<<%= classComponentName %> {...props} />)
      .render()
      .find('h1')
      .text();
    const expected = 'test.greeting, World!';

    assert.equal(actual, expected, 'rendered greeting with custom greeting prop');
  });

  it('should render custom message prop', () => {
    const props = { message: 'test.message' };

    const actual = $(<<%= classComponentName %> {...props} />)
      .render()
      .find('h1')
      .text();
    const expected = 'Hello, test.message';

    assert.equal(actual, expected, 'rendered greeting with custom message prop');
  });
});
