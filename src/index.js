import React from 'react';
import { hydrate, render } from "react-dom";

import './assets/fonts/amsterdam.ttf'
import './assets/fonts/Flow.otf'
import './assets/fonts/SisterSpray.ttf'
import './assets/fonts/Misdemeanor.ttf'
import './assets/fonts/SpriteGraffiti-Regular.ttf'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
