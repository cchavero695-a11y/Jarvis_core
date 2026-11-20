import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, Cristal, PalabraAPalabra, PanelMorph, SubeConMascara, cuerpo, titulo, subtitulo} from './EstiloUI';

export const DemoEstilo: React.FC = () => (
  <AbsoluteFill style={{background: C.blanco, alignItems: 'center', justifyContent: 'center', gap: 36}}>
    <SubeConMascara inicio={0} style={{...titulo, fontSize: 84, color: C.grisOscuro}}>Diseño claro.</SubeConMascara>
    <PalabraAPalabra inicio={8} texto="Menos ruido, más intención en cada detalle" style={{...subtitulo, fontSize: 38, color: C.grisOscuro2, maxWidth: 820}} />
    <PalabraAPalabra inicio={14} mascara texto="Con máscara palabra por palabra" style={{...cuerpo, fontSize: 30, color: C.grisMedio}} />
    <PanelMorph inicio={20} de={{w: 160, h: 64, r: 32}} a={{w: 520, h: 220, r: 48}} fondo={C.grisClaro}>
      <span style={{...titulo, fontSize: 40, color: C.azul}}>+24%</span>
    </PanelMorph>
    <div style={{position: 'absolute', right: 60, bottom: 60, width: 260, height: 160, borderRadius: 40, background: `linear-gradient(135deg, ${C.azul}, ${C.verde})`}} />
    <Cristal style={{position: 'absolute', right: 120, bottom: 100, width: 260, height: 120}} />
  </AbsoluteFill>
);
