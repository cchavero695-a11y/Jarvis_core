import React from 'react';
import {Composition} from 'remotion';
import {Notificaciones, DURACION} from './Notificaciones';

// 1920 de ancho, misma proporción que el fotograma original (1505×1045)
export const RemotionRoot: React.FC = () => (
  <Composition id="Notificaciones" component={Notificaciones} durationInFrames={DURACION} fps={30} width={1920} height={1334} />
);
