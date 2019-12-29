import React, { useState } from 'react';
import memoize from 'fast-memoize';
import 'reset-css';

import styl from './index.styl';
import ScreenMain from '../ScreenMain';
import makeClassName from '../../helpers/className';
import ScreenGithub from '../ScreenGithub';

const cn = makeClassName(styl, 'App');
const getScreenOnFocusHandler = memoize((
  setActiveSectionName: React.Dispatch<React.SetStateAction<string>>,
  activeSectionName: string
  ) => {
  return (isFocused: boolean) => {
    if (isFocused) {
      setActiveSectionName(activeSectionName);
    }
  }
});

const App: React.FC = () => {
  const [activeSectionName, setActiveSectionName] = useState('About');

  return <div className={cn.toString()}>
    <ScreenMain onFocusChange={getScreenOnFocusHandler(setActiveSectionName, 'About')} />
    <ScreenGithub onFocusChange={getScreenOnFocusHandler(setActiveSectionName, 'Projects')} />
  </div>
};

export default App;
