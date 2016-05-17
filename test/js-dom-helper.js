import jsDom from 'jsdom';

const doc = jsDom.jsdom('<!doctype html><html><body></body></html>');
const wind = doc.defaultView;

export default function virtualazeDom () {
  global.document = doc;
  global.window = wind;

  Object.keys(window).forEach((key) => {
    if (!(key in global)) {
      global[key] = window[key];
    }
  });
}
