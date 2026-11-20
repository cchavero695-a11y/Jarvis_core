import React from 'react';
import {AbsoluteFill, Audio, Easing, OffthreadVideo, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import '@fontsource/roboto-slab/700.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';

/**
 * Recreación del fragmento 0:33 → final (37,63 s) · 1920×1080 · 25 fps.
 * Fotograma 0 = segundo 33,00 del vídeo de referencia.
 */
export const DURACION = 116;

const SERIF = '"Roboto Slab", serif';
const SANS = '"DM Sans", Inter, sans-serif';
const ORO = 'linear-gradient(180deg, #EAB767 0%, #DDA052 45%, #C98B3C 100%)';

// Curvas
const OUT_FUERTE = Easing.bezier(0.05, 0.9, 0.1, 1); // entradas rápidas que frenan mucho
const OUT_SUAVE = Easing.bezier(0.25, 0.1, 0.25, 1);
const IN_FUERTE = Easing.bezier(0.7, 0, 0.9, 0.4); // salidas que aceleran

const k = (f: number, a: number, b: number, from: number, to: number, easing?: (t: number) => number) =>
  interpolate(f, [a, b], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing});

/* ----------------------------------------------------------- capas base */
/** Fondo gris claro + viñeta oscura fuerte. */
const Fondo: React.FC<{viñeta: number}> = ({viñeta}) => (
  <AbsoluteFill style={{background: '#ECECEC'}}>
    <AbsoluteFill
      style={{
        opacity: viñeta,
        background:
          'radial-gradient(ellipse 72% 82% at 50% 50%, rgba(0,0,0,0) 64%, rgba(0,0,0,0.14) 80%, rgba(25,25,25,0.6) 100%)',
      }}
    />
  </AbsoluteFill>
);

/** Capa de ajuste: trama de pantalla (líneas / cuadraditos) encima de TODO, también de letras y dibujos. */
const Trama: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      backgroundImage:
        'repeating-linear-gradient(0deg, rgba(0,0,0,0.075) 0, rgba(0,0,0,0.075) 1.5px, rgba(0,0,0,0) 3px, rgba(0,0,0,0) 6px),' +
        'repeating-linear-gradient(90deg, rgba(0,0,0,0.075) 0, rgba(0,0,0,0.075) 1.5px, rgba(0,0,0,0) 3px, rgba(0,0,0,0) 6px)',
    }}
  />
);

const Oro: React.FC<{children: React.ReactNode; size: number; style?: React.CSSProperties}> = ({children, size, style}) => (
  <span
    style={{
      fontFamily: SERIF,
      fontSize: size,
      fontWeight: 700,
      lineHeight: 0.8,
      display: 'inline-block',
      backgroundImage: ORO,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      ...style,
    }}
  >
    {children}
  </span>
);

/* ------------------------------------------------ 1. «II» que sube y barre */
const DobleI: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 8 || f > 44) return null;
  const deriva = k(f, 17, 36, 0, -70, OUT_SUAVE); // se va desplazando a la izquierda
  const barrido = k(f, 35, 42, 0, -1500, IN_FUERTE); // látigo hacia la izquierda
  const I = (inicio: number, x: number, desdeY: number) => {
    const p = k(f, inicio, inicio + 6, 0, 1, OUT_FUERTE);
    return (
      <div
        style={{
          position: 'absolute',
          left: x,
          top: 0,
          transform: `translate(-50%, ${(1 - p) * desdeY}px)`,
          opacity: k(f, inicio, inicio + 2, 0, 1),
        }}
      >
        <Oro size={718} style={{transform: 'scaleX(0.52)'}}>I</Oro>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{transform: `translate(${deriva + barrido - 30}px, 0)`}}>
      <div style={{position: 'absolute', left: 960, top: 228, height: 0}}>
        {I(8, -48, 620)}
        {I(12, 48, 520)}
      </div>
    </AbsoluteFill>
  );
};

/* -------------------------------------- 2. «DEFINIR» entra en arco y se aplana */
const LETRAS = 'DEFINIR'.split('');
// avance de cada glifo (em) de Roboto Slab Bold, para condensar sin huecos
const ANCHO: Record<string, number> = {D: 0.696, E: 0.639, F: 0.618, I: 0.349, N: 0.783, R: 0.688};
const TAM = 436;
const COND = 0.34;

const Titulo: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 35 || f > 84) return null;
  // subida lenta y después salida rápida hacia arriba
  const sube = k(f, 60, 76, 0, -95, Easing.in(Easing.quad)) + k(f, 76, 82, 0, -950, IN_FUERTE);
  return (
    <AbsoluteFill style={{transform: `translateY(${sube}px)`}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 336,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {LETRAS.map((l, i) => {
          // la palabra entra entera desde la derecha (látigo) y llega curvada en arco;
          // el arco tarda más en aplanarse que el desplazamiento
          const ini = 36.5 + i * 0.15;
          const p = k(f, ini, ini + 11, 0, 1, OUT_FUERTE);
          const arco = k(f, 37, 55, 1, 0, Easing.inOut(Easing.quad));
          const x = (1 - p) * 1300 - arco * i * 26; // en el arco las letras van más juntas
          const y = arco * Math.pow(i / 6, 1.6) * 260; // las de la derecha caen más: arco
          const rot = arco * i * 4.5;
          return (
            <div
              key={i}
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
                transformOrigin: '50% 100%',
                opacity: k(f, ini, ini + 1, 0, 1),
              }}
            >
              <Oro size={TAM} style={{transform: `scaleX(${COND})`, margin: `0 ${-(ANCHO[l] * TAM * (1 - COND)) / 2 + 2}px`}}>{l}</Oro>
            </div>
          );
        })}
      </div>
      <Subtitulo />
    </AbsoluteFill>
  );
};

const PALABRAS: {w: string; f: number; color: string}[] = [
  {w: 'a', f: 50, color: '#34332E'},
  {w: 'esta', f: 54, color: '#34332E'},
  {w: 'persona', f: 58, color: '#56554A'},
];

const Subtitulo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 684,
        display: 'flex',
        justifyContent: 'center',
        gap: 16,
        fontFamily: SANS,
        fontWeight: 600,
        fontSize: 58,
        letterSpacing: -1,
        alignItems: 'flex-start',
      }}
    >
      {PALABRAS.map(({w, f: ini, color}, i) => {
        const p = k(f, ini, ini + 8, 0, 1, OUT_SUAVE);
        const tinte = k(f, ini, ini + 12, 0, 1); // nace con tinte claro oliva y se oscurece
        return (
          <span
            key={i}
            style={{
              opacity: p,
              transform: `translateY(${(1 - p) * (i === 0 ? -16 : 16) + (i === 2 ? 10 : 0)}px)`,
              fontWeight: i === 2 ? 500 : 600,
              color: tinte < 1 ? `color-mix(in srgb, ${color} ${Math.round(tinte * 100)}%, #CFCBA6)` : color,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

/* ------------------------------------------- 3. manzana + ondas expansivas */
const ONDAS = [90, 96, 103];

const Manzana: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 81) return null;
  // sube desde abajo rápido y frena despacio hasta el centro, encogiendo
  const sube = k(f, 81, 85, 640, 170, OUT_FUERTE) + k(f, 85, 94, 0, -170, OUT_SUAVE);
  const escala = k(f, 82, 94, 1.1, 0.66, OUT_SUAVE);
  const pulso = ONDAS.reduce((acc, s) => acc + Math.max(0, 1 - Math.abs(f - s - 1) / 2) * 0.06, 0);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      {ONDAS.map((s, i) => (
        <Onda key={i} nace={s} />
      ))}
      <div
        style={{
          fontSize: 190,
          lineHeight: 1,
          fontFamily: '"Noto Color Emoji"',
          transform: `translateY(${sube}px) scale(${escala * (1 + pulso)})`,
          opacity: k(f, 81, 83, 0, 1),
        }}
      >
        🍎
      </div>
    </AbsoluteFill>
  );
};

const Onda: React.FC<{nace: number}> = ({nace}) => {
  const f = useCurrentFrame();
  const a = f - nace;
  if (a < 0) return null;
  // sale disparada y luego sigue abriéndose despacio
  const r = 85 + 235 * (1 - Math.exp(-a / 2.4)) + 18 * a;
  const grosor = k(a, 0, 5, 16, 7);
  const color = a < 5 ? `rgba(150,150,150,${k(a, 0, 5, 0.5, 0.95)})` : 'rgba(135,135,135,0.95)';
  return (
    <div
      style={{
        position: 'absolute',
        left: 960 - r,
        top: 540 - r,
        width: r * 2,
        height: r * 2,
        borderRadius: '50%',
        border: `${grosor}px solid ${color}`,
        boxSizing: 'border-box',
        filter: 'blur(0.8px)',
        opacity: k(a, 0, 1.5, 0, 1),
      }}
    />
  );
};

/* ------------------------------------------------------------- escena */
export const Definir: React.FC = () => {
  const f = useCurrentFrame();
  const corteFinal = f >= 112; // en el original entra el siguiente plano: sin viñeta, borde fino y desenfoque
  const desenfoqueFinal = k(f, 111, 116, 0, 6);

  return (
    <AbsoluteFill style={{background: '#000'}}>
      {/* audio original del tramo */}
      <Audio src={staticFile('fuente.mp4')} startFrom={10} />

      {f < 6 ? (
        // 0:33,00–0:33,24 · el plano de cámara se desenfoca antes del corte
        <AbsoluteFill style={{filter: `blur(${k(f, 0, 5, 1, 14, Easing.in(Easing.quad))}px)`}}>
          <OffthreadVideo src={staticFile('fuente.mp4')} startFrom={10} muted style={{width: '100%', height: '100%'}} />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{filter: desenfoqueFinal ? `blur(${desenfoqueFinal}px)` : undefined}}>
          <Fondo viñeta={corteFinal ? 0 : 1} />
          <CameraMotionBlur samples={10} shutterAngle={200}>
            <AbsoluteFill>
              <DobleI />
              <Titulo />
              <Manzana />
            </AbsoluteFill>
          </CameraMotionBlur>
          <Trama />
          {corteFinal && <AbsoluteFill style={{boxShadow: 'inset 0 0 0 3px rgba(40,40,40,0.75)'}} />}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
