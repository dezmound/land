import React, { useState, useEffect, useRef } from 'react';
import 'reset-css';

import styl from './index.styl';
import ScreenMain from '../ScreenMain';
import makeClassName from '../../helpers/className';
import ScreenGithub from '../ScreenGithub';

const cn = makeClassName(styl, 'App');

let observeMainScreenRef: string | ((instance: HTMLDivElement | null) => void) = '';

interface ApplicationState {
  isMainScreenFocused: boolean;
}

const attachMainAnchorObserver = (setState: React.Dispatch<React.SetStateAction<ApplicationState>>, ) => {
  if (__isClient__) {
    const observer = new IntersectionObserver((entries) => {
      setState({
        isMainScreenFocused: entries[0].isIntersecting
      });
  
    });

    let detachObserver;
    
    observeMainScreenRef = (instance: HTMLDivElement | null) => {
      if (instance) {
        observer.observe(instance);
        detachObserver = () => observer.unobserve(instance);
      }
    }

    return detachObserver;
  }
}

const App: React.SFC = () => {
  const [state, setState] = useState<ApplicationState>({
    isMainScreenFocused: true
  });

  const ref = useRef(null)

  useEffect(() => {
    const detach = attachMainAnchorObserver(setState);

    return detach;
  });
  
  return <div className={cn.toString()}>
    <div id='mainScreenAnchor' ref={ref} className={cn.e('MainScreenAnchor').toString()} ></div>
    <ScreenMain focused={state.isMainScreenFocused} />
    <ScreenGithub />
  </div>
};

export default App;
