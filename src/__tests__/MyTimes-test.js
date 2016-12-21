import React from 'react';
import renderer from 'react-test-renderer';

import MyTimes from '../MyTimes';

test('test table of Times', () => {
  const component = renderer.create(
    <MyTimes />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
