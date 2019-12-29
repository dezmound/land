import React from 'react';
import Screen, { BaseScreenProps } from '../Screen';
import ProjectFeed from '../ProjectsFeed';
import styl from './index.styl';
import makeClassName from '../../helpers/className';

const cn = makeClassName(styl, 'ScreenGithub');
const cnProjectsFeed = makeClassName(styl, 'ProjectsFeed2');

export interface ScreenGithubProps extends BaseScreenProps {

}

const ScreenGithub: React.SFC<ScreenGithubProps> = (props) => {
  return <Screen
    {...props}
    render={() => {
      return <div className={cn.toString()}>
        <ProjectFeed injectClassName={cnProjectsFeed} />
      </div>;
    }}
  />;
};

export default ScreenGithub;
