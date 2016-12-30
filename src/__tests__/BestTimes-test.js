import React from 'react';
import renderer from 'react-test-renderer';

import BestTimes from '../BestTimes';

test('test table of BestTimes', () => {
  const times = {
    times: [
      { date: new Date(2016, 12, 31), time: 2000 },
      { date: new Date(2016, 12, 25), time: 3000 },
    ]
  };
  const component = renderer.create(
    <BestTimes {...times} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
