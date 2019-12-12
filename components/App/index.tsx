import React from 'react';
import 'reset-css';

import styl from './index.styl';
import ScreenMain from '../ScreenMain';

console.log(styl)

const App = () => {
  return <div className={styl.App}>
    <ScreenMain />
  </div>
};

export default App;
