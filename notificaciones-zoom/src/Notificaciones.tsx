import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

/** 30 fps · 4 s. Todo se diseña en las coordenadas del fotograma original (1505×1045). */
export const DURACION = 120;
export const W0 = 1505;
export const H0 = 1045;
const BARRA_SUP = 100; // franjas negras de cine
const BARRA_INF = 942;

const FUENTE = 'Inter, "Helvetica Neue", Arial, sans-serif';

type Tarjeta = {
  id: string;
  nombre: string;
  mensaje: string;
  hora: string;
  x: number;
  y: number;
  w: number;
  h: number;
  // avatar (centro y radio relativos a la tarjeta) y comienzo del texto
  ax: number;
  ay: number;
  ar: number;
  tx: number;
  destacada?: boolean;
  orden: number; // escalonado
};

const TARJETAS: Tarjeta[] = [
  {id: 'andres', nombre: 'Andrés', mensaje: '¿Tienes un minuto?', hora: 'Ahora', x: 192, y: 260, w: 338, h: 84, ax: 46, ay: 43, ar: 28, tx: 95, orden: 2},
  {id: 'valentina', nombre: 'Valentina', mensaje: '¿Me confirmas?', hora: 'Ahora', x: 1019, y: 259, w: 343, h: 82, ax: 42, ay: 41, ar: 27, tx: 86, orden: 3},
  {id: 'camila', nombre: 'Camila', mensaje: 'Te comparto el archivo', hora: 'Ahora', x: 150, y: 402, w: 387, h: 94, ax: 47, ay: 47, ar: 30, tx: 97, destacada: true, orden: 0},
  {id: 'carlos', nombre: 'Carlos', mensaje: 'Ya está listo', hora: 'Hace 1 min', x: 1055, y: 397, w: 350, h: 85, ax: 43, ay: 43, ar: 27, tx: 91, orden: 1},
  {id: 'diego', nombre: 'Diego', mensaje: '¿Podemos verlo hoy?', hora: 'Hace 1 min', x: 154, y: 544, w: 322, h: 83, ax: 44, ay: 41, ar: 27, tx: 92, orden: 5},
  {id: 'mariana', nombre: 'Mariana', mensaje: 'Te envié la propuesta', hora: 'Hace 2 min', x: 1055, y: 538, w: 350, h: 84, ax: 43, ay: 42, ar: 27, tx: 91, orden: 4},
];

const INICIO = 6; // primera tarjeta
const PASO = 5; // fotogramas entre tarjetas: escalonadas, ninguna espera a la anterior

const IconoArchivo: React.FC = () => (
  <svg width={34} height={40} viewBox="0 0 34 40" style={{position: 'absolute', right: 20, top: 40}}>
    <path d="M3 3 H22 L31 12 V37 H3 Z" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinejoin="round" />
    <path d="M22 3 V12 H31" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinejoin="round" />
    {[18, 23, 28].map((y) => (
      <line key={y} x1={9} x2={25} y1={y} y2={y} stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
    ))}
  </svg>
);

const Notificacion: React.FC<{t: Tarjeta}> = ({t}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const inicio = INICIO + t.orden * PASO;
  // rebote suave: muelle poco amortiguado (un pequeño sobrepaso y se asienta)
  const s = spring({frame: f - inicio, fps, config: {damping: 11, stiffness: 120, mass: 0.9}});
  const opacidad = interpolate(f, [inicio, inicio + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = (1 - s) * 140;

  const borde = t.destacada ? '1.8px solid rgba(160,255,150,0.85)' : '1.5px solid rgba(255,255,255,0.42)';
  const sombra = t.destacada
    ? '0 0 22px rgba(90,255,90,0.45), 0 0 6px rgba(140,255,130,0.6), 0 10px 30px rgba(0,0,0,0.35)'
    : '0 10px 30px rgba(0,0,0,0.35)';

  return (
    <div
      style={{
        position: 'absolute',
        left: t.x,
        top: t.y,
        width: t.w,
        height: t.h,
        opacity: opacidad,
        transform: `translateY(${y}px)`,
      }}
    >
      {/* cristal */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 18,
          border: borde,
          boxShadow: `${sombra}, inset 0 1px 0 rgba(255,255,255,0.25)`,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.07))',
          backdropFilter: 'blur(14px) saturate(140%)',
          WebkitBackdropFilter: 'blur(14px) saturate(140%)',
          boxSizing: 'border-box',
        }}
      />
      <Img
        src={staticFile(`av-${t.id}.png`)}
        style={{position: 'absolute', left: t.ax - t.ar - 2, top: t.ay - t.ar - 2}}
      />
      <div
        style={{
          position: 'absolute',
          left: t.tx,
          top: t.destacada ? 12 : 11,
          fontFamily: FUENTE,
          fontSize: t.destacada ? 22 : 20,
          fontWeight: 700,
          color: '#fff',
          letterSpacing: -0.2,
        }}
      >
        {t.nombre}
      </div>
      <div
        style={{
          position: 'absolute',
          left: t.tx,
          top: t.destacada ? 48 : 44,
          fontFamily: FUENTE,
          fontSize: t.destacada ? 19.5 : 18.5,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.92)',
        }}
      >
        {t.mensaje}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 16,
          top: 14,
          fontFamily: FUENTE,
          fontSize: 15,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        {t.hora}
      </div>
      {t.destacada && <IconoArchivo />}
    </div>
  );
};

export const Notificaciones: React.FC = () => {
  const f = useCurrentFrame();
  const {width, durationInFrames} = useVideoConfig();
  const escalaLienzo = width / W0;
  // zoom de cámara: de plano cercano a la posición final, lineal, durante todo el plano.
  // Fondo y tarjetas están en la misma capa, así que el zoom escala ambos juntos.
  const zoom = interpolate(f, [0, durationInFrames - 1], [1.3, 1]);

  return (
    <AbsoluteFill style={{background: '#000'}}>
      <div style={{width: W0, height: H0, transform: `scale(${escalaLienzo})`, transformOrigin: '0 0', position: 'relative'}}>
        {/* composición: fondo + tarjetas, todo dentro del mismo zoom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `scale(${zoom})`,
            transformOrigin: `${W0 / 2}px ${(BARRA_SUP + BARRA_INF) / 2}px`,
          }}
        >
          <Img src={staticFile('fondo.png')} style={{position: 'absolute', left: 0, top: 0, width: W0, height: H0}} />
          {TARJETAS.map((t) => (
            <Notificacion key={t.id} t={t} />
          ))}
        </div>
        {/* franjas de cine fijas, fuera del zoom */}
        <div style={{position: 'absolute', left: 0, top: 0, width: W0, height: BARRA_SUP, background: '#000'}} />
        <div style={{position: 'absolute', left: 0, top: BARRA_INF, width: W0, height: H0 - BARRA_INF, background: '#000'}} />
      </div>
    </AbsoluteFill>
  );
};
