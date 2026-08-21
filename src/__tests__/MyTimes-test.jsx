import React from 'react';
import renderer from 'react-test-renderer';

import MyTimes from '../MyTimes';

test('test table of Times', () => {
  const myTimes = {
    times: [],
    bestTime: 1,
    mediumTime: 2,
    wrostTime: 3,
  };
  const component = renderer.create(
    <MyTimes {...myTimes} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
