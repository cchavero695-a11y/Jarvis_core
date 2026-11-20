import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, Easing} from 'remotion';
import {C, EASE_UI, Sfx, SOMBRA_SUAVE, BISEL, PanelMorph, SubeConMascara, prog, titulo, subtitulo, cuerpo} from './EstiloUI';

/** 30 fps · voz recortada (silencios fuera) hasta «finish» + 0,8 s de cierre */
export const DURACION = 396;

/* Tiempos (fotogramas) sincronizados con la voz recortada */
const ESCENAS = {
  A: [0, 39], // It's Thursday
  B: [39, 100], // and this is your thought of the day
  C: [100, 158], // You don't have a potential problem
  D: [158, 209], // you have a follow-through problem
  E: [209, 332], // You start strong, get excited, and talk about...
  F: [332, DURACION], // but then you don't finish
} as const;

type Palabra = {w: string; f: number; estilo?: React.CSSProperties};

/** Línea de palabras; cada una sube desde su máscara cuando la voz la dice. */
const Linea: React.FC<{palabras: Palabra[]; style?: React.CSSProperties}> = ({palabras, style}) => (
  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 26px', ...style}}>
    {palabras.map((p, i) => (
      <SubeConMascara key={i} inicio={p.f} dur={16} style={{paddingBottom: '0.08em', ...p.estilo}}>
        {p.w}
      </SubeConMascara>
    ))}
  </div>
);

/** Escena: visible en su rango, empujón de cámara lineal y salida suave hacia arriba. */
const Escena: React.FC<{rango: readonly [number, number]; salida?: boolean; children: React.ReactNode}> = ({
  rango,
  salida = true,
  children,
}) => {
  const f = useCurrentFrame();
  const [a, b] = rango;
  if (f < a || f >= b) return null;
  const zoom = interpolate(f, [a, b], [1, 1.035]); // cámara lineal, muy sutil
  const s = salida ? interpolate(f, [b - 8, b], [0, 1], {extrapolateLeft: 'clamp', easing: Easing.in(Easing.cubic)}) : 0;
  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateY(${-s * 60}px) scale(${zoom})`,
        opacity: 1 - s,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const T_TITULO: React.CSSProperties = {...titulo, fontSize: 104, color: C.grisOscuro, lineHeight: 1.08};
const T_SUB: React.CSSProperties = {...subtitulo, fontSize: 60, color: C.grisOscuro2, lineHeight: 1.15};

/* ------------------------------------------------------------- escenas */
const EscenaA = () => (
  <Escena rango={ESCENAS.A}>
    <PanelMorph inicio={0} dur={20} de={{w: 200, h: 84, r: 42}} a={{w: 300, h: 300, r: 72}} style={{boxShadow: `${SOMBRA_SUAVE}, ${BISEL}`, flexDirection: 'column'}}>
      <SubeConMascara inicio={4} style={{...titulo, fontSize: 40, color: C.azul, letterSpacing: '0.04em'}}>THU</SubeConMascara>
      <SubeConMascara inicio={8} style={{...titulo, fontSize: 76, color: C.grisOscuro, lineHeight: 1.1}}>
        Today
      </SubeConMascara>
    </PanelMorph>
    <Linea
      style={{marginTop: 80}}
      palabras={[
        {w: "It's", f: 2, estilo: T_TITULO},
        {w: 'Thursday', f: 7, estilo: T_TITULO},
      ]}
    />
  </Escena>
);

const EscenaB = () => (
  <Escena rango={ESCENAS.B}>
    <SubeConMascara inicio={40} style={{marginBottom: 56}}>
      <div style={{...subtitulo, fontSize: 34, color: C.grisOscuro2, background: C.grisClaro, padding: '16px 34px', borderRadius: 999}}>
        Daily thought
      </div>
    </SubeConMascara>
    <Linea
      palabras={['And', 'this', 'is', 'your'].map((w, i) => ({w, f: 41 + i * 3, estilo: T_SUB}))}
    />
    <Linea
      style={{marginTop: 14, maxWidth: 900}}
      palabras={[
        {w: 'thought', f: 70, estilo: T_TITULO},
        {w: 'of', f: 75, estilo: T_TITULO},
        {w: 'the', f: 80, estilo: T_TITULO},
        {w: 'day.', f: 84, estilo: T_TITULO},
      ]}
    />
  </Escena>
);

const Tachado: React.FC<{inicio: number; children: React.ReactNode}> = ({inicio, children}) => {
  const f = useCurrentFrame();
  const p = prog(f, inicio, 14);
  return (
    <div style={{position: 'relative', display: 'inline-block'}}>
      <div style={{opacity: 1 - 0.55 * p}}>{children}</div>
      <div
        style={{
          position: 'absolute',
          left: -8,
          right: -8,
          top: '54%',
          height: 7,
          borderRadius: 4,
          background: C.grisMedio,
          transform: `scaleX(${p})`,
          transformOrigin: 'left center',
        }}
      />
    </div>
  );
};

const EscenaC = () => (
  <Escena rango={ESCENAS.C}>
    <Linea palabras={["You", "don't", 'have', 'a'].map((w, i) => ({w, f: 102 + i * 3, estilo: T_SUB}))} />
    <div style={{marginTop: 18}}>
      <Tachado inicio={146}>
        <Linea
          palabras={[
            {w: 'potential', f: 118, estilo: T_TITULO},
            {w: 'problem', f: 136, estilo: T_TITULO},
          ]}
        />
      </Tachado>
    </div>
  </Escena>
);

const EscenaD = () => (
  <Escena rango={ESCENAS.D}>
    <Linea palabras={['You', 'have', 'a'].map((w, i) => ({w, f: 160 + i * 3, estilo: T_SUB}))} />
    <Linea
      style={{marginTop: 18, maxWidth: 960}}
      palabras={[
        {w: 'follow‑through', f: 169, estilo: {...T_TITULO, color: C.azul}},
        {w: 'problem.', f: 188, estilo: T_TITULO},
      ]}
    />
  </Escena>
);

const Check: React.FC<{inicio: number}> = ({inicio}) => {
  const p = prog(useCurrentFrame(), inicio, 16);
  return (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: C.verde,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${0.6 + 0.4 * p})`,
        opacity: p,
        flexShrink: 0,
      }}
    >
      <svg width={30} height={30} viewBox="0 0 30 30">
        <path d="M7 15.5 L12.5 21 L23 9.5" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={30} strokeDashoffset={30 * (1 - p)} />
      </svg>
    </div>
  );
};

const Tarjeta: React.FC<{inicio: number; texto: string; detalle: string}> = ({inicio, texto, detalle}) => (
  <SubeConMascara inicio={inicio} dur={20} style={{padding: '0 40px 40px', margin: '0 -40px -40px'}}>
    <div
      style={{
        width: 760,
        height: 150,
        borderRadius: 44,
        background: C.blanco,
        boxShadow: `${SOMBRA_SUAVE}, ${BISEL}`,
        display: 'flex',
        alignItems: 'center',
        gap: 30,
        padding: '0 40px',
        boxSizing: 'border-box',
      }}
    >
      <Check inicio={inicio + 6} />
      <div>
        <div style={{...titulo, fontSize: 46, color: C.grisOscuro}}>{texto}</div>
        <div style={{...cuerpo, fontSize: 28, color: C.grisMedio, marginTop: 4}}>{detalle}</div>
      </div>
    </div>
  </SubeConMascara>
);

const EscenaE = () => (
  <Escena rango={ESCENAS.E}>
    <div style={{display: 'flex', flexDirection: 'column', gap: 28, marginTop: -180}}>
      <Tarjeta inicio={210} texto="Start strong" detalle="Day one energy" />
      <Tarjeta inicio={247} texto="Get excited" detalle="Big plans" />
      <Tarjeta inicio={278} texto="Talk about it" detalle="What you're going to do" />
    </div>
  </Escena>
);

const EscenaF = () => (
  <Escena rango={ESCENAS.F} salida={false}>
    <div style={{marginTop: -260, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Linea palabras={['But', 'then', 'you', "don't"].map((w, i) => ({w, f: [334, 338, 344, 348][i], estilo: T_SUB}))} />
      <Linea style={{marginTop: 12}} palabras={[{w: 'finish.', f: 357, estilo: {...T_TITULO, fontSize: 150}}]} />
    </div>
  </Escena>
);

/* Barra de progreso persistente (E → F): se llena con cada tarjeta y se queda corta. */
const Progreso: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 212) return null;
  const aparece = prog(f, 212, 18);
  const valor =
    0.33 * prog(f, 216, 18) + 0.33 * prog(f, 253, 18) + 0.19 * prog(f, 284, 18); // 85 %
  const sube = prog(f, 328, 22); // al cambiar a F, sube hacia el centro
  const y = interpolate(sube, [0, 1], [1440, 1180]);
  const aviso = prog(f, 357, 14); // se queda corta: verde → naranja
  const color = aviso > 0.5 ? C.naranja : C.verde;
  return (
    <div style={{position: 'absolute', left: 160, width: 760, top: y, opacity: aparece, transform: `translateY(${(1 - aparece) * 30}px)`}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 18}}>
        <span style={{...subtitulo, fontSize: 30, color: C.grisOscuro2}}>Progress</span>
        <span style={{...titulo, fontSize: 30, color: C.grisOscuro, fontVariantNumeric: 'tabular-nums'}}>{Math.round(valor * 100)}%</span>
      </div>
      <div style={{height: 22, borderRadius: 11, background: C.grisClaro}}>
        <div style={{width: `${valor * 100}%`, height: '100%', borderRadius: 11, background: color}} />
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- sonido */
const CLICKS = [0, 7, 40, 70, 84, 102, 118, 146, 160, 169, 210, 247, 278, 334, 357];
const POPS = [216, 253, 284];

export const VozUI: React.FC = () => (
  <AbsoluteFill style={{background: C.blanco}}>
    <Audio src={staticFile('voz.wav')} />
    {CLICKS.map((f) => (
      <Sfx key={`c${f}`} en={f} archivo="click.wav" volumen={0.22} />
    ))}
    {POPS.map((f) => (
      <Sfx key={`p${f}`} en={f} archivo="pop.wav" volumen={0.28} />
    ))}
    <EscenaA />
    <EscenaB />
    <EscenaC />
    <EscenaD />
    <EscenaE />
    <EscenaF />
    <Progreso />
  </AbsoluteFill>
);
