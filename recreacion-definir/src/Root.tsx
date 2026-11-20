import React from 'react';
import {Composition} from 'remotion';
import {Definir, DURACION} from './Definir';

export const RemotionRoot: React.FC = () => (
  <Composition id="Definir" component={Definir} durationInFrames={DURACION} fps={25} width={1920} height={1080} />
);
