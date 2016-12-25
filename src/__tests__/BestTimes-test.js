import React from 'react';
import renderer from 'react-test-renderer';

import BestTimes from '../BestTimes';

test('test table of BestTimes', () => {
  const times = {
    times: []
  };
  const component = renderer.create(
    <BestTimes {...times} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
