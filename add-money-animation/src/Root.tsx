import React from 'react';
import {Composition} from 'remotion';
import {AddMoney, DURATION} from './AddMoney';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="AddMoney"
    component={AddMoney}
    durationInFrames={DURATION}
    fps={30}
    width={1080}
    height={1080}
  />
);
