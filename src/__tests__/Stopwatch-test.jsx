import React from 'react';
import renderer from 'react-test-renderer';

import Stopwatch from '../Stopwatch';

test('test table of Times', () => {
  const component = renderer.create(
    <Stopwatch />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
