import React from 'react';

import styl from './index.styl';
import makeClassName from '../../helpers/className';

const cn = makeClassName(styl, 'Image');

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image: React.SFC<ImageProps> = (props) => {
  return <div className={cn.concat(props.className).toString()}>
    <img
      {...props}
      className={styl.Image__img}
    />
  </div>
};

export default Image;
