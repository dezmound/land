import React from 'react';
import Screen from '../Screen';
import Image from '../Image';
import styl from './index.styl';

console.log(styl)

const App = () => {
  return <div className={styl.App}>
    <Screen render={() => {
      return <div>
        <div className={styl.App__FullName}>
          <h1>Sulokhin Dmitrii</h1>
        </div>
        <div className={styl.App__Profession}>
          <h2>Frontend developer</h2>
        </div>
        <Image className={styl.App__Image_type_avatar} src='/static/pe-gjPf_vtA.jpg' />
      </div>
    }} />
  </div>
};

export default App;
