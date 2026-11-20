/**
 * Plantilla del estilo «UI minimal» para Remotion (4.x).
 * Cópiala a src/ del proyecto e impórtala:  import {...} from './EstiloUI';
 * Cada pieza traduce una técnica del tutorial (ver SKILL.md).
 */
import React from 'react';
import {Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';

/* ---------------------------------------------------------------- color */
export const C = {
  blanco: '#FFFFFF',
  grisClaro: '#E5E5EA', // fondos claros, divisores, tarjetas
  grisMedio: '#8E8E93', // texto deshabilitado / terciario
  grisOscuro2: '#3A3A3C', // texto secundario, UI sutil
  grisOscuro: '#1C1C1E', // fondo oscuro, texto principal
  azul: '#007AFF', // acción principal, enlaces, botones
  verde: '#34C759', // éxito, confirmación
  naranja: '#FF9500', // aviso
};

/* ----------------------------------------------------------- tipografía */
export const FUENTE = 'Inter, "Helvetica Neue", Arial, sans-serif';
export const titulo: React.CSSProperties = {fontFamily: FUENTE, fontWeight: 700, letterSpacing: '-0.02em'};
export const subtitulo: React.CSSProperties = {fontFamily: FUENTE, fontWeight: 500};
export const cuerpo: React.CSSProperties = {fontFamily: FUENTE, fontWeight: 400};

/* -------------------------------------------------------------- curvas */
/** Curva de salida del tutorial (gráfica de velocidad: 0, 0.88, 0.04, 1). */
export const EASE_UI = Easing.bezier(0, 0.88, 0.04, 1);
/** Variante más suave para objetos grandes (teléfono, paneles). */
export const EASE_SUAVE = Easing.bezier(0.25, 0.1, 0.25, 1);

export const prog = (f: number, inicio: number, dur: number, easing = EASE_UI) =>
  interpolate(f, [inicio, inicio + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

/* ------------------------------------------- 1. texto que sube con máscara */
/**
 * Equivale a: keyframes de Position (abajo → su sitio) + easing +
 * precomp con máscara rectangular. La «máscara» es la caja con
 * overflow:hidden: el texto nace oculto debajo de su línea y sube.
 */
export const SubeConMascara: React.FC<{
  inicio: number;
  dur?: number;
  desde?: 'abajo' | 'arriba' | 'izquierda' | 'derecha';
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({inicio, dur = 18, desde = 'abajo', children, style}) => {
  const f = useCurrentFrame();
  const p = prog(f, inicio, dur);
  const d = (1 - p) * 110; // % del propio tamaño
  const t = {
    abajo: `translateY(${d}%)`,
    arriba: `translateY(${-d}%)`,
    izquierda: `translateX(${-d}%)`,
    derecha: `translateX(${d}%)`,
  }[desde];
  return (
    <div style={{overflow: 'hidden', display: 'inline-block', verticalAlign: 'bottom', ...style}}>
      <div style={{transform: t}}>{children}</div>
    </div>
  );
};

/* ---------------------------------- 2. aparición palabra por palabra */
/**
 * Equivale al animador de texto: Position Y 100 + Opacity 0,
 * Range Selector › Advanced: Based On Words, Shape Ramp Up,
 * Ease High −50 %, Ease Low 100 %, Offset −100 % → 100 %.
 * Cada palabra entra escalonada; con `mascara` cada una va en su caja.
 */
export const PalabraAPalabra: React.FC<{
  texto: string;
  inicio: number;
  dur?: number; // duración del barrido completo (el keyframe de Offset)
  desplazamiento?: number; // px, el «Position Y 100»
  mascara?: boolean;
  style?: React.CSSProperties;
}> = ({texto, inicio, dur = 24, desplazamiento = 100, mascara = false, style}) => {
  const f = useCurrentFrame();
  const palabras = texto.split(' ');
  const n = palabras.length;
  // Offset de −100 % a 100 %, con la misma curva de salida
  const offset = interpolate(prog(f, inicio, dur), [0, 1], [-1, 1]);
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.28em', ...style}}>
      {palabras.map((w, i) => {
        // Ramp Up: cada palabra se completa cuando el offset pasa por ella
        const a = i / n - 1; // offset en el que empieza
        const b = (i + 1) / n; // offset en el que termina
        const lineal = interpolate(offset, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        // Ease High −50 % / Ease Low 100 %: arranque lento, final muy suave
        const k = Easing.bezier(0.5, 0, 0, 1)(lineal);
        const palabra = (
          <span
            style={{
              display: 'inline-block',
              opacity: mascara ? 1 : k,
              transform: `translateY(${(1 - k) * (mascara ? 110 : desplazamiento)}${mascara ? '%' : 'px'})`,
            }}
          >
            {w}
          </span>
        );
        return mascara ? (
          <span key={i} style={{overflow: 'hidden', display: 'inline-block', verticalAlign: 'bottom'}}>
            {palabra}
          </span>
        ) : (
          <React.Fragment key={i}>{palabra}</React.Fragment>
        );
      })}
    </div>
  );
};

/* -------------------------------- 3. panel que cambia de forma (morph) */
/** Una sola capa: se animan tamaño y redondeo entre dos estados. */
export const PanelMorph: React.FC<{
  inicio: number;
  dur?: number;
  de: {w: number; h: number; r: number};
  a: {w: number; h: number; r: number};
  fondo?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({inicio, dur = 20, de, a, fondo = C.blanco, children, style}) => {
  const p = prog(useCurrentFrame(), inicio, dur);
  const m = (x: number, y: number) => x + (y - x) * p;
  return (
    <div
      style={{
        width: m(de.w, a.w),
        height: m(de.h, a.h),
        borderRadius: m(de.r, a.r),
        background: fondo,
        boxShadow: SOMBRA_SUAVE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* --------------------------------------------------------------- efectos */
/** Sombra muy difusa y casi imperceptible (opacidad baja, distancia 10–60, suavidad máxima). */
export const SOMBRA_SUAVE = '0 24px 60px rgba(0,0,0,0.08), 0 6px 16px rgba(0,0,0,0.05)';

/** Bisel sutil (equivalente ligero a Bevel & Emboss). */
export const BISEL = 'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.06)';

/**
 * Cristal: desenfoque del fondo (Fast Box Blur 13–21) + duplicado con solo
 * trazo blanco en modo Overlay al 30 %. Necesita un fondo con color o imagen.
 */
export const Cristal: React.FC<{
  radio?: number;
  desenfoque?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({radio = 36, desenfoque = 17, children, style}) => (
  <div style={{position: 'relative', borderRadius: radio, ...style}}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: radio,
        backdropFilter: `blur(${desenfoque}px)`,
        WebkitBackdropFilter: `blur(${desenfoque}px)`,
        background: 'rgba(255,255,255,0.12)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: radio,
        border: '2px solid #fff',
        mixBlendMode: 'overlay',
        opacity: 0.3,
      }}
    />
    <div style={{position: 'relative'}}>{children}</div>
  </div>
);

/* ---------------------------------------------------------------- sonido */
/** Un efecto corto sincronizado con el fotograma en que empieza un movimiento. */
export const Sfx: React.FC<{en: number; archivo: string; volumen?: number}> = ({en, archivo, volumen = 0.6}) => (
  <Sequence from={en} layout="none">
    <Audio src={staticFile(archivo)} volume={volumen} />
  </Sequence>
);
