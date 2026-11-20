import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

/* ------------------------------------------------------------------ */
/*  Timing (frames @ 30fps). Every animation overlaps the previous one */
/*  – nothing waits for anything else to finish.                       */
/* ------------------------------------------------------------------ */
export const DURATION = 120; // 4 s – the camera zoom spans all of it

const T = {
  phone: {start: 0, dur: 30}, // 1.0 s, soft ease-out
  sheet: {start: 10, dur: 24}, // 0.8 s, soft ease-out
  coins: {start: 22, dur: 30}, // 1.0 s, strong ease-out
  item: {dur: 21}, // 0.7 s, soft ease-out (each object)
};

const EASE_SOFT = Easing.bezier(0.25, 0.1, 0.25, 1); // suave
const EASE_STRONG = Easing.bezier(0.05, 0.85, 0.1, 1); // fuerte (expo-like)

const progress = (
  frame: number,
  start: number,
  dur: number,
  easing: (t: number) => number,
) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

/* ------------------------------------------------------------------ */
/*  Phone geometry (phone-local px)                                    */
/* ------------------------------------------------------------------ */
const PHONE_W = 404;
const PHONE_H = 844;
const BEZEL = 12;
const SCREEN_W = PHONE_W - BEZEL * 2;
const FONT = 'Inter, "Helvetica Neue", Arial, sans-serif';

/* Slide-in object: translates up + fades. No masks / clipping. */
const SlideIn: React.FC<{
  start: number;
  dur?: number;
  distance?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({start, dur = T.item.dur, distance = 36, style, children}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, start, dur, EASE_SOFT);
  const opacity = interpolate(p, [0, 0.55], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        position: 'absolute',
        ...style,
        opacity,
        transform: `translateY(${(1 - p) * distance}px)`,
      }}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Small icons (pure CSS gradients / inline SVG, no masks)            */
/* ------------------------------------------------------------------ */
const ICON = 30;
const iconBase: React.CSSProperties = {
  width: ICON,
  height: ICON,
  borderRadius: '50%',
  border: '2.5px solid #f1f1f3',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const FLAG_US =
  'linear-gradient(#3c3b6e,#3c3b6e) 0 0/50% 54% no-repeat, repeating-linear-gradient(180deg,#b22234 0 7.7%,#fff 7.7% 15.4%)';
const FLAG_EU = '#1f4fb4';
const FLAG_UK =
  'linear-gradient(90deg,transparent 42%,#c8102e 42% 58%,transparent 58%),' +
  'linear-gradient(0deg,transparent 42%,#c8102e 42% 58%,transparent 58%),' +
  'linear-gradient(90deg,transparent 33%,#fff 33% 67%,transparent 67%),' +
  'linear-gradient(0deg,transparent 33%,#fff 33% 67%,transparent 67%),' +
  'linear-gradient(45deg,transparent 45%,#c8102e 45% 52%,transparent 52%),' +
  'linear-gradient(-45deg,transparent 45%,#c8102e 45% 52%,transparent 52%),' +
  'linear-gradient(45deg,transparent 40%,#fff 40% 60%,transparent 60%),' +
  'linear-gradient(-45deg,transparent 40%,#fff 40% 60%,transparent 60%),#012169';

const EuStars: React.FC = () => (
  <svg width={20} height={20} viewBox="-10 -10 20 20">
    {Array.from({length: 12}).map((_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return <circle key={i} cx={Math.cos(a) * 6.5} cy={Math.sin(a) * 6.5} r={1.15} fill="#ffcc00" />;
    })}
  </svg>
);

const IconRow: React.FC<{icons: React.ReactNode[]; more: string}> = ({icons, more}) => (
  <div style={{display: 'flex', alignItems: 'center'}}>
    {icons.map((ic, i) => (
      <div key={i} style={{marginLeft: i === 0 ? 0 : -8, zIndex: icons.length - i}}>
        {ic}
      </div>
    ))}
    <div
      style={{
        ...iconBase,
        marginLeft: -6,
        background: '#e6e6e9',
        fontSize: 10,
        fontWeight: 600,
        color: '#333',
        fontFamily: FONT,
      }}
    >
      {more}
    </div>
  </div>
);

const cashIcons = [
  <div style={{...iconBase, background: FLAG_US}} />,
  <div style={{...iconBase, background: FLAG_EU}}>
    <EuStars />
  </div>,
  <div style={{...iconBase, background: FLAG_UK}} />,
];

const cryptoIcons = [
  <div style={{...iconBase, background: '#1ba39c'}}>
    <svg width={14} height={14} viewBox="0 0 14 14">
      <path d="M2 4.5 L5 1.5 H9 L12 4.5 L7 12.5 Z" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinejoin="round" />
    </svg>
  </div>,
  <div style={{...iconBase, background: '#f7931a', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: FONT}}>
    ₿
  </div>,
  <div style={{...iconBase, background: '#8c8cf0'}}>
    <svg width={12} height={16} viewBox="0 0 12 16">
      <path d="M6 0 L12 8 L6 11 L0 8 Z" fill="#fff" opacity={0.95} />
      <path d="M0 9.2 L6 12.3 L12 9.2 L6 16 Z" fill="#fff" opacity={0.75} />
    </svg>
  </div>,
];

/* ------------------------------------------------------------------ */
/*  Coins: they all start stacked on the central axis (as one single   */
/*  coin) and fan out to both sides with a strong ease-out.            */
/* ------------------------------------------------------------------ */
type Coin = {bg: string; child?: React.ReactNode; w?: number};

const Leaf: React.FC = () => (
  <svg width={30} height={44} viewBox="0 0 30 44">
    <path d="M24 4 C10 10 6 26 8 40 C12 30 18 18 24 4 Z" fill="#1b2a12" />
    <path d="M8 40 L20 14" stroke="#c6f432" strokeWidth={1.4} />
  </svg>
);

const Triangle: React.FC = () => (
  <svg width={40} height={44} viewBox="0 0 40 44">
    <path d="M4 6 L36 14 L18 40 Z" fill="none" stroke="#fff" strokeWidth={3.2} strokeLinejoin="round" />
    <path d="M4 6 L22 20 L36 14 M22 20 L18 40" fill="none" stroke="#fff" strokeWidth={2.4} />
  </svg>
);

const LEFT_COINS: Coin[] = [
  // inner -> outer
  {bg: 'linear-gradient(90deg,#ef3340 0 28%,transparent 28%),linear-gradient(180deg,#00843d 0 33%,#fff 33% 66%,#111 66%)'},
  {bg: '#e9e7e2'},
  {bg: '#c6f432', child: <Leaf />},
  {bg: 'radial-gradient(circle at 55% 45%,#c9c1ff,#9d8ff0 70%)'},
  {bg: '#f3f3f3'},
  {bg: '#6f8f7b'},
];

const RIGHT_COINS: Coin[] = [
  {bg: 'radial-gradient(ellipse at 50% 50%,#1e3f9c 0 20%,#ffdf00 20% 40%,#009c3b 40%)'},
  {bg: '#e5162f', child: <Triangle />},
  {bg: 'linear-gradient(90deg,#0b8a4a 0 33%,#fff 33% 66%,#e2232e 66%)'},
  {bg: '#d72a3e'},
  {bg: '#2f6b51'},
  {bg: '#eeeeee'},
];

// Final horizontal offsets from the central axis, inner -> outer
const OFFSETS = [24, 46, 70, 92, 112, 128];
const SCALE_X = [0.55, 0.68, 0.86, 0.9, 0.93, 0.95];
const COIN_W = 70;
const COIN_H = 132;

const CoinFan: React.FC<{cx: number; cy: number}> = ({cx, cy}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, T.coins.start, T.coins.dur, EASE_STRONG);
  const appear = interpolate(frame, [T.coins.start, T.coins.start + 5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const renderSide = (coins: Coin[], dir: -1 | 1) =>
    coins.map((c, i) => {
      const x = dir * OFFSETS[i] * p;
      const sx = interpolate(p, [0, 1], [0.35, SCALE_X[i]]);
      const peak = dir === -1 ? 2 : 1;
      const z = 20 - Math.abs(i - peak) * 2 - (i > peak ? 1 : 0);
      return (
        <div
          key={`${dir}-${i}`}
          style={{
            position: 'absolute',
            left: cx - COIN_W / 2,
            top: cy - COIN_H / 2,
            width: COIN_W,
            height: COIN_H,
            zIndex: z,
            transform: `translateX(${x}px) scaleX(${sx}) rotate(${dir * 2}deg)`,
          }}
        >
          {/* coin edge (thickness) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: '#2a2a2a',
              opacity: 0.25,
              transform: `translateX(${-dir * 5}px)`,
            }}
          />
          {/* coin face */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: c.bg,
              boxShadow: 'inset 0 0 0 1.5px rgba(0,0,0,0.08), inset -6px 0 14px rgba(0,0,0,0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {c.child}
          </div>
        </div>
      );
    });

  return (
    <div style={{position: 'absolute', inset: 0, opacity: appear}}>
      {renderSide(LEFT_COINS, -1)}
      {renderSide(RIGHT_COINS, 1)}
      {/* central divider */}
      <div
        style={{
          position: 'absolute',
          left: cx - 1.5,
          top: cy - COIN_H / 2 - 4,
          width: 3,
          height: COIN_H + 8,
          borderRadius: 2,
          background: 'linear-gradient(#d8d8d8,#bdbdbd)',
          zIndex: 40,
          transform: `scaleY(${interpolate(p, [0, 1], [0.6, 1])})`,
        }}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Option card                                                        */
/* ------------------------------------------------------------------ */
const Card: React.FC<{title: string; subtitle: string; icons: React.ReactNode}> = ({
  title,
  subtitle,
  icons,
}) => (
  <div
    style={{
      width: 318,
      height: 113,
      borderRadius: 24,
      background: '#ffffff',
      boxSizing: 'border-box',
      padding: '20px 18px',
      fontFamily: FONT,
      position: 'relative',
    }}
  >
    <div style={{fontSize: 16, fontWeight: 600, color: '#111', letterSpacing: -0.2}}>{title}</div>
    <div style={{fontSize: 12.5, color: '#6b6b70', marginTop: 4}}>{subtitle}</div>
    <div style={{marginTop: 10}}>{icons}</div>
    <svg
      width={10}
      height={16}
      viewBox="0 0 10 16"
      style={{position: 'absolute', right: 22, top: 48}}
    >
      <path d="M2 2 L8 8 L2 14" fill="none" stroke="#555" strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Phone                                                              */
/* ------------------------------------------------------------------ */
const Phone: React.FC = () => {
  const frame = useCurrentFrame();

  // Sheet ("pestaña") slide – 0.8 s soft ease-out
  const sp = progress(frame, T.sheet.start, T.sheet.dur, EASE_SOFT);
  const sheetOpacity = interpolate(sp, [0, 0.4], [0, 1], {extrapolateRight: 'clamp'});

  // Stagger for each object (0.7 s each, 3 frames apart → all overlapping)
  const s = (i: number) => 4 + i * 3;

  return (
    <div
      style={{
        position: 'relative',
        width: PHONE_W,
        height: PHONE_H,
        borderRadius: 66,
        background: 'linear-gradient(145deg,#4a4a4c,#1b1b1c 40%,#2c2c2e)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.22), 0 10px 24px rgba(0,0,0,0.18)',
        fontFamily: FONT,
      }}
    >
      {/* side buttons */}
      <div style={{position: 'absolute', left: -4, top: 170, width: 4, height: 34, borderRadius: 2, background: '#2a2a2c'}} />
      <div style={{position: 'absolute', left: -4, top: 225, width: 4, height: 62, borderRadius: 2, background: '#2a2a2c'}} />
      <div style={{position: 'absolute', left: -4, top: 300, width: 4, height: 62, borderRadius: 2, background: '#2a2a2c'}} />
      <div style={{position: 'absolute', right: -4, top: 250, width: 4, height: 96, borderRadius: 2, background: '#2a2a2c'}} />

      {/* screen */}
      <div
        style={{
          position: 'absolute',
          left: BEZEL,
          top: BEZEL,
          width: SCREEN_W,
          height: PHONE_H - BEZEL * 2,
          borderRadius: 54,
          background: '#c4c4c6',
        }}
      >
        {/* status bar */}
        <SlideIn start={s(0)} distance={18} style={{left: 52, top: 22}}>
          <div style={{fontSize: 16, fontWeight: 600, color: '#111'}}>14:40</div>
        </SlideIn>
        <div
          style={{
            position: 'absolute',
            left: SCREEN_W / 2 - 56,
            top: 14,
            width: 112,
            height: 32,
            borderRadius: 16,
            background: '#050505',
          }}
        />
        <SlideIn start={s(0)} distance={18} style={{right: 34, top: 26}}>
          <svg width={64} height={14} viewBox="0 0 64 14">
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={i * 4.5} y={10 - i * 3} width={3} height={4 + i * 3} rx={1} fill="#111" />
            ))}
            <path d="M24 5 A8 8 0 0 1 36 5 L34 7 A5 5 0 0 0 26 7 Z M27.5 9 A3 3 0 0 1 32.5 9 L30 12 Z" fill="#111" />
            <rect x={41} y={1.5} width={19} height={11} rx={3.5} fill="none" stroke="#111" strokeWidth={1.2} opacity={0.5} />
            <rect x={43} y={3.5} width={15} height={7} rx={2} fill="#111" />
            <rect x={61} y={5} width={1.6} height={4} rx={0.8} fill="#111" opacity={0.5} />
          </svg>
        </SlideIn>

        {/* avatar */}
        <SlideIn start={s(1)} style={{left: 28, top: 78}}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: '#a9a9ab',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              fontWeight: 500,
              color: '#111',
            }}
          >
            P
          </div>
        </SlideIn>

        {/* balance */}
        <SlideIn start={s(2)} style={{left: 0, width: SCREEN_W, top: 138, textAlign: 'center'}}>
          <div style={{fontSize: 17, color: '#4a4a4c'}}>Spendable</div>
        </SlideIn>
        <SlideIn start={s(3)} style={{left: 0, width: SCREEN_W, top: 160, textAlign: 'center'}}>
          <div style={{fontSize: 42, fontWeight: 500, color: '#0a0a0a', letterSpacing: -0.5}}>$0.00</div>
        </SlideIn>

        {/* bottom sheet ("pestaña") */}
        <div
          style={{
            position: 'absolute',
            left: 10,
            top: 228,
            width: SCREEN_W - 20,
            height: 588,
            borderRadius: 44,
            background: '#f1f1f3',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
            opacity: sheetOpacity,
            transform: `translateY(${(1 - sp) * 90}px)`,
          }}
        >
          {/* grabber */}
          <div
            style={{
              position: 'absolute',
              left: (SCREEN_W - 20) / 2 - 26,
              top: -6,
              width: 52,
              height: 5,
              borderRadius: 3,
              background: '#9a9a9c',
            }}
          />

          {/* close button */}
          <SlideIn start={s(5)} style={{right: 22, top: 22}}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width={14} height={14} viewBox="0 0 14 14">
                <path d="M2 2 L12 12 M12 2 L2 12" stroke="#111" strokeWidth={1.9} strokeLinecap="round" />
              </svg>
            </div>
          </SlideIn>

          {/* coins – appear from the central axis */}
          <CoinFan cx={(SCREEN_W - 20) / 2} cy={128} />

          {/* title + subtitle */}
          <SlideIn start={s(7)} style={{left: 0, width: SCREEN_W - 20, top: 248, textAlign: 'center'}}>
            <div style={{fontSize: 23, fontWeight: 600, color: '#0a0a0a', letterSpacing: -0.3}}>Add money</div>
          </SlideIn>
          <SlideIn start={s(8)} style={{left: 0, width: SCREEN_W - 20, top: 284, textAlign: 'center'}}>
            <div style={{fontSize: 14, color: '#55555a'}}>Choose how to add money to your account.</div>
          </SlideIn>

          {/* option cards */}
          <SlideIn start={s(9)} style={{left: 21, top: 330}}>
            <Card title="Receive cash" subtitle="From a bank account" icons={<IconRow icons={cashIcons} more="+5" />} />
          </SlideIn>
          <SlideIn start={s(10)} style={{left: 21, top: 455}}>
            <Card
              title="Receive crypto"
              subtitle="From a wallet or exchange"
              icons={<IconRow icons={cryptoIcons} more="+24" />}
            />
          </SlideIn>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */
export const AddMoney: React.FC = () => {
  const frame = useCurrentFrame();
  const {height, durationInFrames} = useVideoConfig();

  // Phone rises from below – 1 s soft ease-out
  const pp = progress(frame, T.phone.start, T.phone.dur, EASE_SOFT);
  const phoneY = interpolate(pp, [0, 1], [height, 0]);

  // Camera: centred zoom from a close shot back to the final framing,
  // linear, across the whole composition.
  const zoom = interpolate(frame, [0, durationInFrames - 1], [1.75, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: '#efeff0'}}>
      <AbsoluteFill
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: '50% 50%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{transform: `translateY(${phoneY}px)`}}>
          <Phone />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
