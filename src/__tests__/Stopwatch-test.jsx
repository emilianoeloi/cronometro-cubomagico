import React from 'react';
import renderer from 'react-test-renderer';
import ReactGA from 'react-ga';

import Stopwatch from '../Stopwatch';

function createStopwatch() {
  document.body.innerHTML = '<div class="App-logo"></div>';
  const component = renderer.create(<Stopwatch />);
  return component.getInstance();
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(ReactGA, 'event').mockImplementation(() => {});
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.onkeydown = null;
  document.onkeyup = null;
  window.onblur = null;
  document.body.innerHTML = '';
});

test('test table of Times', () => {
  const component = renderer.create(
    <Stopwatch />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('starts only when Space is released', () => {
  const stopwatch = createStopwatch();
  const start = vi.spyOn(stopwatch, 'start');

  document.onkeydown({ code: 'Space', repeat: false });

  expect(stopwatch.control.started).toBe(false);
  expect(stopwatch.keyboardControl.spacePrepared).toBe(true);
  expect(start).not.toHaveBeenCalled();

  document.onkeyup({ code: 'Space' });

  expect(start).toHaveBeenCalledTimes(1);
  expect(stopwatch.control.started).toBe(true);
});

test('ignores repeated and unrelated key presses', () => {
  const stopwatch = createStopwatch();

  document.onkeydown({ code: 'ControlLeft', repeat: false });
  document.onkeydown({ code: 'MetaLeft', repeat: false });
  document.onkeydown({ code: 'Space', repeat: true });

  expect(stopwatch.control.started).toBe(false);
  expect(stopwatch.keyboardControl.spacePrepared).toBe(false);
});

test('stops a running stopwatch without restarting on key release', () => {
  const stopwatch = createStopwatch();
  stopwatch.start();
  const start = vi.spyOn(stopwatch, 'start');

  document.onkeydown({ code: 'Space', repeat: false });
  document.onkeyup({ code: 'Space' });

  expect(stopwatch.control.started).toBe(false);
  expect(start).not.toHaveBeenCalled();
  expect(ReactGA.event).toHaveBeenCalledTimes(1);
});

test('cancels a prepared start when the window loses focus', () => {
  const stopwatch = createStopwatch();

  document.onkeydown({ code: 'Space', repeat: false });
  window.onblur();
  document.onkeyup({ code: 'Space' });

  expect(stopwatch.control.started).toBe(false);
  expect(stopwatch.keyboardControl.spacePrepared).toBe(false);
});

test('cancels a prepared start when time is discarded', () => {
  const stopwatch = createStopwatch();

  document.onkeydown({ code: 'Space', repeat: false });
  stopwatch.reset();
  document.onkeyup({ code: 'Space' });

  expect(stopwatch.control.started).toBe(false);
  expect(stopwatch.state.secondsElapsed).toBe(0);
});
