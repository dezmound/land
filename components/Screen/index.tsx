import React from 'react';
import styl from './index.styl';
import makeClassName, { ClassName } from '../../helpers/className';

const cn = makeClassName(styl, 'Screen');

interface ScreenProps {
    render: () => React.ReactChild,
    className?: string
}

const Screen: React.SFC<ScreenProps> = ({ render, className }) => {
  return <section className={cn.concat(className).toString()}>
    {render()}
  </section>
}

export default Screen;
