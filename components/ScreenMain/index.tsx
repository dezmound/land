import React, { useState } from 'react';
import Screen, { BaseScreenProps } from '../Screen/index';
import Image from '../Image';

import makeClassName from '../../helpers/className';

import styl from './index.styl';

const cn = makeClassName(styl, 'ScreenMain');

export interface ScreenMainProps extends BaseScreenProps {
}

const ScreenMain: React.FC<ScreenMainProps> = ({ className, onFocusChange, sectionId }) => {
  const [isFocused, setIsFocused] = useState(true);

  return <Screen
    sectionId={sectionId || 'ScreenMain'}
    className={cn.concat(className).toString()}
    onFocusChange={(isFocused) => {
      setIsFocused(isFocused);

      if (onFocusChange) {
        onFocusChange(isFocused);
      }
    }}
    render={() => {
      return <>
        <div className={cn.e('Personal').toString()}>
          <div className={cn.e('FullName').toString()}>
            <h1>Sulokhin Dmitrii</h1>
          </div>
          <div className={cn.e('Profession').toString()}>
            <h2>Frontend developer</h2>
          </div>
        </div>
        <div className={cn.e('Block').m({ type: 'blue' }).toString()}></div>
        <Image
          className={cn.e('Image').m({ type: 'avatar', fixed: !isFocused }).toString()}
          src='/static/pe-gjPf_vtA.jpg'
          onLoad={() => console.log('avatar loaded')}
        />
      </>;
    }}
  />;
};

export default ScreenMain;
