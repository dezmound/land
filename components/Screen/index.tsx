import React from 'react';
import styl from './index.styl';

interface ScreenProps {
    render: () => React.ReactChild
}

const Screen: React.SFC<ScreenProps> = ({ render }) => {
  return <section className={styl.Screen}>
    {render()}
  </section>
}

export default Screen;
