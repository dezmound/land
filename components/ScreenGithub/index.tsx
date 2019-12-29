import React from 'react';
import Screen, { BaseScreenProps } from '../Screen';

export interface ScreenGithubProps extends BaseScreenProps {

}

const ScreenGithub: React.SFC<ScreenGithubProps> = (props) => {
  return <Screen
    {...props}
    render={() => {
      return <div></div>;
    }}
  />
};

export default ScreenGithub;
