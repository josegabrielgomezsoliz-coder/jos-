/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Palette, Sparkles, Layers, Sliders, Box } from 'lucide-react';
import { NotificationConfig } from '../../types/notifications';

interface AparienciaTabProps {
  config: NotificationConfig;
  onChange: (updated: Partial<NotificationConfig>) => void;
}

export const AparienciaTab: React.FC<AparienciaTabProps> = ({ config, onChange }) => {
  const PRESET_COLORS = [
    { name: 'Onyx Slate', hex: '#0f172a' },
    { name: 'Pure OLED', hex: '#000000' },
    { name: 'Cyber Blue', hex: '#081a2e' },
    { name: 'Deep Emerald', hex: '#064e3b' },
    { name: 'Crimson Wine', hex: '#4c0519' },
    { name: 'Midnight Violet', hex: '#1e1b4b' },
  ];

  const GLOW_COLORS = [
    { name: 'Cyan Neon', hex: '#06b6d4' },
    { name: 'Emerald Glow', hex: '#10b981' },
    { name: 'Purple Pulse', hex: '#a855f7' },
    { name: 'Amber Warmth', hex: '#f59e0b' },
    { name: 'Rose Red', hex: '#f43f5e' },
    { name: 'Ice White', hex: '#e2e8f0' },
  ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Palette className="w-4 h-4 text-cyan-400" />
          <span>Apariencia y Estilo Visual</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Personaliza el color de fondo, transparencia, bordes y efecto de resplandor luminoso.
        </p>
      </div>

      {/* Tipo de Fondo */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Tipo de Fondo</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'solid', label: 'Sólido' },
            { id: 'gradient', label: 'Degradado' },
            { id: 'glass', label: 'Glassmorphism' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => onChange({ bgType: type.id as NotificationConfig['bgType'] })}
              className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                config.bgType === type.id
                  ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-sm shadow-cyan-950'
                  : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Color Palette Buttons */}
        <div className="pt-2">
          <span className="text-[11px] text-slate-400 block mb-2">Paleta Base Rápida</span>
          <div className="flex items-center gap-2 flex-wrap">
            {PRESET_COLORS.map((col) => (
              <button
                key={col.hex}
                onClick={() => onChange({ bgColor: col.hex })}
                className={`w-7 h-7 rounded-full border-2 transition-transform active:scale-90 ${
                  config.bgColor.toLowerCase() === col.hex.toLowerCase()
                    ? 'border-cyan-400 scale-110 shadow-md shadow-cyan-900/50'
                    : 'border-slate-700 hover:border-slate-500'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-[10px] text-slate-400">Custom</span>
              <input
                type="color"
                value={config.bgColor.slice(0, 7)}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="w-7 h-7 rounded-lg bg-transparent border border-slate-700 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Gradient Secondary Color if Gradient mode */}
        {config.bgType === 'gradient' && (
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-300">Color Secundario del Degradado</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.bgGradientEnd.slice(0, 7)}
                onChange={(e) => onChange({ bgGradientEnd: e.target.value })}
                className="w-7 h-7 rounded-lg bg-transparent border border-slate-700 cursor-pointer"
              />
              <span className="text-[11px] font-mono text-slate-400">{config.bgGradientEnd}</span>
            </div>
          </div>
        )}
      </div>

      {/* Transparencia y Desenfoque (Blur) */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-4">
        <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Opacidad del Fondo</span>
          </span>
          <span className="text-xs font-mono text-cyan-400">{config.bgOpacity}%</span>
        </label>
        <input
          type="range"
          min="20"
          max="100"
          value={config.bgOpacity}
          onChange={(e) => onChange({ bgOpacity: Number(e.target.value) })}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        <div className="pt-2">
          <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
            <span>Desenfoque de Fondo (Backdrop Blur)</span>
            <span className="text-xs font-mono text-cyan-400">{config.backdropBlur}px</span>
          </label>
          <input
            type="range"
            min="0"
            max="32"
            value={config.backdropBlur}
            onChange={(e) => onChange({ backdropBlur: Number(e.target.value) })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-2"
          />
        </div>
      </div>

      {/* Bordes y Curvatura de Esquinas */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-4">
        <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Box className="w-3.5 h-3.5 text-cyan-400" />
            <span>Radio de Esquinas (Curvatura)</span>
          </span>
          <span className="text-xs font-mono text-cyan-400">{config.borderRadius}px</span>
        </label>
        <input
          type="range"
          min="0"
          max="36"
          value={config.borderRadius}
          onChange={(e) => onChange({ borderRadius: Number(e.target.value) })}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span>0px (Recto)</span>
          <span>16px (Estándar)</span>
          <span>24px (Moderno)</span>
          <span>36px (Píldora)</span>
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-300">Grosor de Borde</span>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((w) => (
              <button
                key={w}
                onClick={() => onChange({ borderWidth: w })}
                className={`w-7 h-7 rounded-lg text-xs font-mono border transition-all ${
                  config.borderWidth === w
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {w}px
              </button>
            ))}
          </div>
        </div>

        {config.borderWidth > 0 && (
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-300">Color del Borde</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.borderColor.slice(0, 7)}
                onChange={(e) => onChange({ borderColor: e.target.value })}
                className="w-7 h-7 rounded-lg bg-transparent border border-slate-700 cursor-pointer"
              />
              <span className="text-[11px] font-mono text-slate-400">{config.borderColor}</span>
            </div>
          </div>
        )}
      </div>

      {/* Resplandor Luminoso (Neon Glow) */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-2 cursor-pointer">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resplandor Neón Perimetral</span>
          </label>
          <button
            onClick={() => onChange({ neonGlow: !config.neonGlow })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              config.neonGlow ? 'bg-cyan-500' : 'bg-slate-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                config.neonGlow ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {config.neonGlow && (
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2 flex-wrap">
              {GLOW_COLORS.map((glow) => (
                <button
                  key={glow.hex}
                  onClick={() => onChange({ neonGlowColor: glow.hex })}
                  className={`w-6 h-6 rounded-full border-2 transition-transform active:scale-90 ${
                    config.neonGlowColor.toLowerCase() === glow.hex.toLowerCase()
                      ? 'border-white scale-110 shadow-lg'
                      : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: glow.hex, boxShadow: `0 0 10px ${glow.hex}` }}
                  title={glow.name}
                />
              ))}
              <input
                type="color"
                value={config.neonGlowColor.slice(0, 7)}
                onChange={(e) => onChange({ neonGlowColor: e.target.value })}
                className="w-6 h-6 rounded-md bg-transparent border border-slate-700 cursor-pointer ml-auto"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Intensidad de Resplandor</span>
                <span className="font-mono text-cyan-400">{config.neonGlowSpread}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="30"
                value={config.neonGlowSpread}
                onChange={(e) => onChange({ neonGlowSpread: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
