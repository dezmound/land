import React, { useState } from 'react';
import Screen from '../Screen/index';
import Image from '../Image';

import makeClassName from '../../helpers/className';

import styl from './index.styl';

export interface ScreenMainProps {}

const cn = makeClassName(styl, 'ScreenMain');

const ScreenMain: React.SFC<ScreenMainProps> = () => {
  const [state, setState] = useState({
    isAvatarLoaded: false
  });

  return Screen({
    render () {
      return <>
        <div className={cn.e('Personal').toString()}>
          <div className={cn.e('FullName').toString()}>
            <h1>Sulokhin Dmitrii</h1>
          </div>
          <div className={cn.e('Profession').toString()}>
            <h2>Frontend developer</h2>
          </div>
        </div>
        <Image
          className={cn.e('Image').m({ type: 'avatar' }).toString()}
          src='/static/pe-gjPf_vtA.jpg'
          onLoad={() => console.log('avatar loaded')}
        />
      </>
    }
  })
}

export default ScreenMain;
