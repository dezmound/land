import React from 'react';
import styl from './index.styl';
import cn from '../../helpers/classname';

export interface ImageProps {
    src: string,
    alt?: string,
    className?: string
}

const Image: React.SFC<ImageProps> = (props) => {
  return <div className={cn(styl.Image, props)}>
    <img className={styl.Image__img} src={props.src} alt={props.alt}/>
  </div>
};

export default Image;
