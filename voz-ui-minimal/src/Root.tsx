import React from 'react';
import {Composition} from 'remotion';
import {VozUI, DURACION} from './VozUI';

export const RemotionRoot: React.FC = () => (
  <Composition id="VozUI" component={VozUI} durationInFrames={DURACION} fps={30} width={1080} height={1920} />
);
