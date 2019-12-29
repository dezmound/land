import React, { useState, useEffect, useRef } from 'react';
import styl from './index.styl';
import makeClassName, { ClassName } from '../../helpers/className';

const cn = makeClassName(styl, 'Screen');

export interface ScreenState {
  focused: boolean
}

const attachAnchorObserver = (
  setState: React.Dispatch<React.SetStateAction<ScreenState>>,
  anchorRef: React.RefObject<HTMLDivElement>,
  onFocusChange?: (isFocused: boolean) => void
  ) => {
  if (__isClient__) {
    const observer = new IntersectionObserver((entries) => {
      setState({
        focused: entries[0].isIntersecting
      });

      if(onFocusChange) {
        onFocusChange(entries[0].isIntersecting);
      }
    });

    let detachObserver;
    
    if (anchorRef.current) {
      observer.observe(anchorRef.current);
      detachObserver = () => {
        if (anchorRef.current) { 
          observer.unobserve(anchorRef.current);
        }
      }
    }

    return detachObserver;
  }
}

export interface BaseScreenProps {
  onFocusChange?: (isFocused: boolean) => void,
  sectionId?: string,
  className?: string
}

export interface ScreenProps extends BaseScreenProps {
    render: () => React.ReactChild,
}

const Screen: React.SFC<ScreenProps> = ({ render, className, onFocusChange, sectionId }) => {
  const [state, setState] = useState({
    focused: true
  });
  
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detach = attachAnchorObserver(setState, ref, onFocusChange);

    return detach;
  }, []);

  return <section className={cn.m({ focused: state.focused }).concat(className).toString()}>
    <div id={sectionId} ref={ref} className={cn.e('Anchor').toString()} ></div>
    {render()}
  </section>
}

export default Screen;
