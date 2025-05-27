import React, { useRef } from 'react';
import { Shirt, Palette, Ruler, Scissors } from 'lucide-react';
import { HexColorPicker } from "react-colorful";
import { useStore } from '../store';
import { PositionGuide } from './PositionGuide';
import styles from './Customizer.module.css';

const colors = ['#2563eb', '#dc2626', '#16a34a', '#000000', '#ffffff'];
const materials = ['cotton', 'silk', 'wool', 'linen'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Example preset textures and patterns
const textures = [
   '/cotton.avif',
   '/view.jpg',
  '/6307753.jpg',
  '/baked_img0.jpg',
  '/baked_img1.jpg',
  '/686.jpg',
  '/17.jpg',
  '/may.png',
   '/short.png',

  
];
const patterns = [
  'stripes',
  'dots',
  'plaid',
  'solid',
  'floral',
];

// Animation options
const animations = [
  { key: 'static', label: 'Static', icon: '🧍' },
  { key: 'walk', label: 'Walk', icon: '🚶' },
  { key: 'waves', label: 'Waves', icon: '🌊' },
  { key: 'knit', label: 'Knit', icon: '🧶' },
];

export function Customizer(props: {
  logo?: string | null,
  texture?: string | null,
  pattern?: string | null,
  setLogo?: (logo: string | null) => void,
  setTexture?: (texture: string | null) => void,
  setPattern?: (pattern: string | null) => void,
  setAnimation?: (animation: string) => void,
  setAnimationSpeed?: (speed: number) => void,
  setTextDesign?: (text: string) => void,
  logoPosition?: { x: number; y: number },
  setLogoPosition?: (pos: { x: number; y: number }) => void,
  logoScale?: number,
  setLogoScale?: (scale: number) => void,
  textDesign?: string,
  setTextDesignProp?: (text: string) => void,
  textPosition?: { x: number; y: number },
  setTextPosition?: (pos: { x: number; y: number }) => void,
  textRotation?: number,
  setTextRotation?: (rotation: number) => void,
  textFont?: string,
  setTextFont?: (font: string) => void,
  textColor?: string,
  setTextColor?: (color: string) => void,
  textFontSize?: number,
  setTextFontSize?: (size: number) => void,
  animation?: string,
  animationSpeed?: number,
}) {
  const { color, setColor, material, setMaterial, size, setSize } = useStore();

  // Always call hooks at the top
  const [logoState, setLogoState] = React.useState<string | null>(null);
  const [textureState, setTextureState] = React.useState<string | null>(null);
  const [patternState, setPatternState] = React.useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [animationState, setAnimationState] = React.useState<string>('static');
  const [animationSpeedState, setAnimationSpeedState] = React.useState<number>(0.5);
  const [logoPositionState, setLogoPositionState] = React.useState<{ x: number; y: number }>({ x: 0.5, y: 0.3 });
  const [logoScaleState, setLogoScaleState] = React.useState<number>(0.25);
  const [textDesignState, setTextDesignState] = React.useState<string>("");
  const [textPositionState, setTextPositionState] = React.useState<{ x: number; y: number }>({ x: 0.5, y: 0.8 });
  const [textRotationState, setTextRotationState] = React.useState<number>(0);
  const [textFontState, setTextFontState] = React.useState<string>('Roboto');
  const [textColorState, setTextColorState] = React.useState<string>('#222');
  const [textFontSizeState, setTextFontSizeState] = React.useState<number>(24);
  const [textOutlineColor, setTextOutlineColor] = React.useState<string>("#ffffff");
  const [textOutlineWidth, setTextOutlineWidth] = React.useState<number>(2);
  const [textShadowColor, setTextShadowColor] = React.useState<string>("#000000");
  const [textShadowBlur, setTextShadowBlur] = React.useState<number>(4);
  const [textShadowOffsetX, setTextShadowOffsetX] = React.useState<number>(2);
  const [textShadowOffsetY, setTextShadowOffsetY] = React.useState<number>(2);
  const logoRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [textDragging, setTextDragging] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use prop if provided, else fallback to state
  const _logo = typeof props.logo !== 'undefined' ? props.logo : logoState;
  const _setLogo = props.setLogo ?? setLogoState;
  const _texture = typeof props.texture !== 'undefined' ? props.texture : textureState;
  const _setTexture = props.setTexture ?? setTextureState;
  const _pattern = typeof props.pattern !== 'undefined' ? props.pattern : patternState;
  const _setPattern = props.setPattern ?? setPatternState;
  const _logoPosition = props.logoPosition ?? logoPositionState;
  const _setLogoPosition = props.setLogoPosition ?? setLogoPositionState;
  const _logoScale = typeof props.logoScale !== 'undefined' ? props.logoScale : logoScaleState;
  const _setLogoScale = props.setLogoScale ?? setLogoScaleState;
  const _textDesign = typeof props.textDesign !== 'undefined' ? props.textDesign : textDesignState;
  const _setTextDesign = props.setTextDesignProp ?? setTextDesignState;
  const _textPosition = props.textPosition ?? textPositionState;
  const _setTextPosition = props.setTextPosition ?? setTextPositionState;
  const _textRotation = typeof props.textRotation !== 'undefined' ? props.textRotation : textRotationState;
  const _setTextRotation = props.setTextRotation ?? setTextRotationState;
  const _textFont = typeof props.textFont !== 'undefined' ? props.textFont : textFontState;
  const _setTextFont = typeof props.setTextFont === 'function' ? props.setTextFont : setTextFontState;
  const _textColor = typeof props.textColor !== 'undefined' ? props.textColor : textColorState;
  const _setTextColor = typeof props.setTextColor === 'function' ? props.setTextColor : textColorState;
  const _textFontSize = typeof props.textFontSize !== 'undefined' ? props.textFontSize : textFontSizeState;
  const _setTextFontSize = typeof props.setTextFontSize === 'function' ? props.setTextFontSize : textFontSizeState;
  const animation = typeof props.animation !== 'undefined' ? props.animation : animationState;
  const _setAnimation = props.setAnimation ?? setAnimationState;
  const _animationSpeed = typeof props.animationSpeed !== 'undefined' ? props.animationSpeed : animationSpeedState;
  const _setAnimationSpeed = props.setAnimationSpeed ?? setAnimationSpeedState;

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        _setLogo(ev.target?.result as string);
        props.setLogo?.(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleLogoDragStart() {
    setDragging(true);
  }

  function handleLogoDrag(e: React.MouseEvent) {
    if (!dragging || !logoRef.current) return;
    const rect = logoRef.current.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    _setLogoPosition({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
  }

  function handleLogoDragEnd() {
    setDragging(false);
  }

  // Handler to auto-place logo in a zone
  function handleGuideZone(zone: string) {
    // Example: set logo position for each zone (tweak as needed for your 3D mapping)
    if (zone === 'front') props.setLogoPosition?.({ x: 0.5, y: 0.3 });
    if (zone === 'back') props.setLogoPosition?.({ x: 0.5, y: 0.7 });
    if (zone === 'leftSleeve') props.setLogoPosition?.({ x: 0.18, y: 0.5 });
    if (zone === 'rightSleeve') props.setLogoPosition?.({ x: 0.82, y: 0.5 });
  }

  function handleTextDragStart() {
    setTextDragging(true);
  }

  function handleTextDrag(e: React.MouseEvent) {
    if (!textDragging || !textRef.current) return;
    const rect = textRef.current.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    _setTextPosition({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
  }

  function handleTextDragEnd() {
    setTextDragging(false);
  }

  return (
    <div className="w-96 min-h-screen bg-white/60 backdrop-blur-2xl shadow-2xl border-l border-gray-200 p-6 overflow-y-auto relative rounded-l-3xl flex flex-col" style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.37)', borderLeft:'4px solid #a5b4fc'}}>
      {/* Animated gradient bar at top */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-fuchsia-400 to-yellow-300 animate-pulse rounded-t-3xl z-20" />
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-40 h-40 bg-pink-200 opacity-30 rounded-full blur-2xl top-0 left-1/2 -translate-x-1/2 animate-pulse" />
        <div className="absolute w-32 h-32 bg-blue-200 opacity-20 rounded-full blur-2xl bottom-10 left-10 animate-pulse delay-200" />
        <div className="absolute w-24 h-24 bg-yellow-200 opacity-20 rounded-full blur-2xl bottom-0 right-10 animate-pulse delay-500" />
      </div>
      <div className="relative z-10">
        <h2 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-fuchsia-500 to-yellow-500 drop-shadow-lg flex items-center gap-2">
          <Palette className="inline-block text-blue-400" size={32} />
          Customize Your Outfit
        </h2>
        
        {/* Position Guide (premium, modern, accessible) */}
        <PositionGuide onClickZone={handleGuideZone} />

        {/* Color Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Color</h3>
          <div className="flex gap-3 flex-wrap mb-3">
            {colors.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setColor(c)}
                className={`${styles.colorCircle} ${color === c ? styles.colorCircleSelected : ''}`}
                style={{ backgroundColor: c }}
                aria-label={`Select color ${c}`}
              />
            ))}
            {/* Custom color picker trigger */}
            <button
              type="button"
              onClick={() => setShowColorPicker((v) => !v)}
              className={`${styles.colorCircle} bg-gradient-to-br from-blue-400 to-fuchsia-500 text-white font-bold shadow-md flex items-center justify-center ${showColorPicker ? 'ring-2 ring-fuchsia-400' : ''}`}
              aria-label="Custom color picker"
            >
              +
            </button>
          </div>
          {/* Popover color picker */}
          {showColorPicker && (
            <div className={styles.colorPickerPopover}>
              <HexColorPicker color={color} onChange={setColor} />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{color}</span>
                <button
                  type="button"
                  className="text-xs text-blue-500 hover:underline"
                  onClick={() => setShowColorPicker(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Material Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Material</h3>
          <div className="grid grid-cols-2 gap-3">
            {materials.map((m) => (
              <button
                type="button"
                key={m}
                onClick={() => setMaterial(m)}
                className={`p-3 rounded-lg capitalize ${
                  material === m
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Size</h3>
          <div className="grid grid-cols-3 gap-3">
            {sizes.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setSize(s)}
                className={`p-3 rounded-lg ${
                  size === s
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Logo & Pattern Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Logo & Pattern</h3>
          <div className="flex gap-3 flex-wrap mb-4">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleLogoUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-fuchsia-400 text-white font-semibold shadow hover:scale-105 transition-transform"
            >
              {_logo ? 'Change Logo' : 'Add Logo'}
            </button>
            {_logo && (
              <img src={_logo} alt="Logo preview" className="w-10 h-10 object-contain border rounded bg-white" />
            )}
          </div>
          <div className="flex gap-3 flex-wrap mb-4">
            {textures.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  _setTexture(t);
                  props.setTexture?.(t);
                }}
                className={`w-12 h-12 rounded border-2 ${_texture === t ? 'border-blue-500' : 'border-gray-200'} bg-white p-1`}
              >
                <img src={t} alt="Texture" className="w-full h-full object-cover rounded" />
              </button>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            {patterns.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  _setPattern(p);
                  props.setPattern?.(p);
                }}
                className={`px-3 py-2 rounded-lg border-2 font-semibold capitalize ${_pattern === p ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
              >
                {p}
              </button>
            ))}
          </div>
          {_logo && (
            <div
              ref={logoRef}
              className={styles.logoDraggable + (dragging ? ' dragging' : '')}
              style={{
                left: `calc(${_logoPosition.x * 100}% - ${_logoScale * 24}vw / 2)` ,
                top: `calc(${_logoPosition.y * 100}% - ${_logoScale * 24}vw / 2)` ,
                width: `${_logoScale * 24}vw`,
                height: `${_logoScale * 24}vw`
              }}
              onMouseDown={handleLogoDragStart}
              onMouseMove={handleLogoDrag}
              onMouseUp={handleLogoDragEnd}
              onMouseLeave={handleLogoDragEnd}
              tabIndex={0}
              aria-label="Move logo"
              title="Move logo"
            >
              <img
                src={_logo}
                alt="Logo preview"
                draggable={false}
                title="Logo preview"
              />
              {/* Resize slider */}
              <input
                type="range"
                min={0.1}
                max={0.5}
                step={0.01}
                value={_logoScale}
                onChange={e => _setLogoScale(Number(e.target.value))}
                className="logo-resize-slider"
                aria-label="Resize logo"
                title="Resize logo"
              />
            </div>
          )}
        </div>

        {/* Text Design */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Text Design</h3>
          <div className="flex flex-wrap gap-2 mb-2 items-center">
            <input
              type="text"
              value={_textDesign}
              onChange={e => {
                _setTextDesign(e.target.value);
                props.setTextDesign?.(e.target.value);
              }}
              placeholder="Add your text (e.g. Slogan, Name)"
              className="p-2 rounded border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base font-semibold shadow-sm transition"
              maxLength={32}
              aria-label="Text design input"
            />
            <input
              type="color"
              value={_textColor}
              onChange={e => {
                _setTextColor(e.target.value);
                props.setTextColor?.(e.target.value);
              }}
              title="Text color"
              aria-label="Text color"
              className="w-8 h-8 border rounded"
            />
            <select
              value={_textFont}
              onChange={e => {
                _setTextFont(e.target.value);
                props.setTextFont?.(e.target.value);
              }}
              className="p-2 rounded border border-gray-300 text-base"
              aria-label="Font family"
            >
              <option value="Roboto">Roboto</option>
              <option value="Arial">Arial</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Comic Sans MS">Comic Sans</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
            <input
              type="number"
              min={10}
              max={64}
              value={_textFontSize}
              onChange={e => {
                _setTextFontSize(Number(e.target.value));
                props.setTextFontSize?.(Number(e.target.value));
              }}
              className="w-16 p-2 rounded border border-gray-300 text-base"
              aria-label="Font size"
              title="Font size"
            />
            <input
              type="range"
              min={-180}
              max={180}
              value={_textRotation}
              onChange={e => {
                _setTextRotation(Number(e.target.value));
                props.setTextRotation?.(Number(e.target.value));
              }}
              className="w-32 accent-blue-500"
              aria-label="Text rotation"
              title="Text rotation"
            />
            <span className="text-xs text-gray-500">Rotate: {_textRotation}&deg;</span>
          </div>
          {/* Outline and Shadow Controls */}
          <div className="flex flex-wrap gap-2 mb-2 items-center">
            <label className="flex items-center gap-1 text-xs">
              Outline
              <input
                type="color"
                value={textOutlineColor}
                onChange={e => setTextOutlineColor(e.target.value)}
                title="Outline color"
                className="w-6 h-6 border rounded ml-1"
              />
              <input
                type="number"
                min={0}
                max={10}
                value={textOutlineWidth}
                onChange={e => setTextOutlineWidth(Number(e.target.value))}
                className="w-12 p-1 rounded border border-gray-300 text-xs ml-1"
                title="Outline width"
              />
              px
            </label>
            <label className="flex items-center gap-1 text-xs">
              Shadow
              <input
                type="color"
                value={textShadowColor}
                onChange={e => setTextShadowColor(e.target.value)}
                title="Shadow color"
                className="w-6 h-6 border rounded ml-1"
              />
              <input
                type="number"
                min={0}
                max={20}
                value={textShadowBlur}
                onChange={e => setTextShadowBlur(Number(e.target.value))}
                className="w-12 p-1 rounded border border-gray-300 text-xs ml-1"
                title="Shadow blur"
              />
              blur
              <input
                type="number"
                min={-20}
                max={20}
                value={textShadowOffsetX}
                onChange={e => setTextShadowOffsetX(Number(e.target.value))}
                className="w-10 p-1 rounded border border-gray-300 text-xs ml-1"
                title="Shadow X offset"
              />
              x
              <input
                type="number"
                min={-20}
                max={20}
                value={textShadowOffsetY}
                onChange={e => setTextShadowOffsetY(Number(e.target.value))}
                className="w-10 p-1 rounded border border-gray-300 text-xs ml-1"
                title="Shadow Y offset"
              />
              y
            </label>
          </div>
          <div className={styles.logoArea + " logo-area relative mb-2"}>
            {_textDesign && (
              <div
                ref={textRef}
                className={styles.textDraggable + " absolute cursor-move select-none"}
                style={{
                  left: `calc(${_textPosition.x * 100}% - ${_textFontSize * 0.5}px)`,
                  top: `calc(${_textPosition.y * 100}% - ${_textFontSize * 0.7}px)`,
                  color: _textColor,
                  fontFamily: _textFont,
                  fontSize: `${_textFontSize}px`,
                  transform: `rotate(${_textRotation}deg)`,
                  WebkitTextStroke: `${textOutlineWidth}px ${textOutlineColor}`,
                  textShadow: `${textShadowOffsetX}px ${textShadowOffsetY}px ${textShadowBlur}px ${textShadowColor}`
                }}
                onMouseDown={handleTextDragStart}
                onMouseMove={handleTextDrag}
                onMouseUp={handleTextDragEnd}
                onMouseLeave={handleTextDragEnd}
                tabIndex={0}
                aria-label="Move text"
                title="Move text"
              >
                {_textDesign}
              </div>
            )}
          </div>
          <div className="text-xs text-gray-400 mb-2">Drag, rotate, resize, and style your text. It will appear as a design on the t-shirt.</div>
        </div>

        {/* Animation Selection */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold">Animation</h3>
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600 font-bold">Pro</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {animations.map((a) => (
              <button
                key={a.key}
                type="button"
                onClick={() => {
                  _setAnimation(a.key);
                  props.setAnimation?.(a.key);
                }}
                className={`flex flex-col items-center justify-center gap-1 p-4 rounded-xl font-semibold text-base shadow transition-all duration-150 border-2 ${
                  animation === a.key ? 'bg-blue-100 text-blue-600 border-blue-400 scale-105' : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-blue-50 hover:text-blue-500'
                }`}
              >
                <span className="text-2xl">{a.icon}</span>
                {a.label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Animation Speed</span>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{_animationSpeed}</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.01}
            value={_animationSpeed}
            onChange={e => {
              const v = parseFloat(e.target.value);
              _setAnimationSpeed(v);
              props.setAnimationSpeed?.(v);
            }}
            className="w-full accent-blue-500 h-2 rounded-lg bg-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          />
        </div>
      </div>
    </div>
  );
}