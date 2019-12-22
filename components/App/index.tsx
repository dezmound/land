import React, { useState, useEffect, useRef } from 'react';
import 'reset-css';

import styl from './index.styl';
import ScreenMain from '../ScreenMain';
import makeClassName from '../../helpers/className';
import ScreenGithub from '../ScreenGithub';

const cn = makeClassName(styl, 'App');

interface ApplicationState {
  isMainScreenFocused: boolean;
}

const attachMainAnchorObserver = (
  setState: React.Dispatch<React.SetStateAction<ApplicationState>>,
  mainAnchorRef: React.RefObject<HTMLDivElement>
  ) => {
  if (__isClient__) {
    const observer = new IntersectionObserver((entries) => {
      setState({
        isMainScreenFocused: entries[0].isIntersecting
      });
  
      console.log(entries)
    });

    let detachObserver;
    
    if (mainAnchorRef.current) {
      observer.observe(mainAnchorRef.current);
      detachObserver = () => {
        if (mainAnchorRef.current) { 
          observer.unobserve(mainAnchorRef.current);
        }
      }
    }

    return detachObserver;
  }
}

const App: React.SFC = () => {
  const [state, setState] = useState<ApplicationState>({
    isMainScreenFocused: true
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detach = attachMainAnchorObserver(setState, ref);

    return detach;
  }, []);
  
  return <div className={cn.toString()}>
    <div id='mainScreenAnchor' ref={ref} className={cn.e('MainScreenAnchor').toString()} ></div>
    <ScreenMain focused={state.isMainScreenFocused} />
    <ScreenGithub />
  </div>
};

export default App;
