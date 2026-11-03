/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Move, AlignCenter, LayoutTemplate, Layers } from 'lucide-react';
import { NotificationConfig, NotificationLayoutMode } from '../../types/notifications';

interface PosicionTabProps {
  config: NotificationConfig;
  onChange: (updated: Partial<NotificationConfig>) => void;
}

export const PosicionTab: React.FC<PosicionTabProps> = ({ config, onChange }) => {
  const LAYOUT_MODES: Array<{
    id: NotificationLayoutMode;
    label: string;
    desc: string;
  }> = [
    {
      id: 'floating-card',
      label: 'Tarjeta Flotante Heads-Up',
      desc: 'Panel flotante desacoplado con margen perimetral y sombra',
    },
    {
      id: 'dynamic-island',
      label: 'Dynamic Island Notch',
      desc: 'Píldora ultra-compacta anclada bajo el recorte de la cámara frontal',
    },
    {
      id: 'full-width-bar',
      label: 'Barra Extendida de Borde a Borde',
      desc: 'Ocupa el 96% del ancho superior con estilo de panel de sistema',
    },
  ];

  const SHADOW_DEPTHS = [
    { id: 'none', label: 'Sin Sombra' },
    { id: 'subtle', label: 'Sutil (Elevación 2dp)' },
    { id: 'medium', label: 'Media (Elevación 6dp)' },
    { id: 'deep', label: 'Profunda (Elevación 16dp)' },
    { id: 'neon', label: 'Aura Neón Luminosa' },
  ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Move className="w-4 h-4 text-cyan-400" />
          <span>Posición y Geometría en Pantalla</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Controla la ubicación vertical, márgenes respecto al notch y dimensiones relativas de la tarjeta.
        </p>
      </div>

      {/* Modo de Diseño */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
          <LayoutTemplate className="w-3.5 h-3.5 text-cyan-400" />
          <span>Modo de Integración en Pantalla</span>
        </label>
        <div className="grid grid-cols-1 gap-2.5">
          {LAYOUT_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                if (mode.id === 'dynamic-island') {
                  onChange({
                    layoutMode: mode.id,
                    borderRadius: 36,
                    topMargin: 10,
                    widthPercent: 86,
                  });
                } else if (mode.id === 'full-width-bar') {
                  onChange({
                    layoutMode: mode.id,
                    borderRadius: 14,
                    topMargin: 8,
                    widthPercent: 96,
                  });
                } else {
                  onChange({ layoutMode: mode.id });
                }
              }}
              className={`p-3 rounded-xl text-left border transition-all ${
                config.layoutMode === mode.id
                  ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-sm'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-medium text-white">{mode.label}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{mode.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Margen Superior (Distancia al notch) */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
            <span className="flex items-center gap-2">
              <Move className="w-3.5 h-3.5 text-cyan-400" />
              <span>Margen Superior (Distancia al Notch)</span>
            </span>
            <span className="font-mono text-cyan-400">{config.topMargin}px</span>
          </div>
          <input
            type="range"
            min="6"
            max="50"
            value={config.topMargin}
            onChange={(e) => onChange({ topMargin: Number(e.target.value) })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>Pegado arriba (6px)</span>
            <span>Estándar (16px)</span>
            <span>Bajo barra de estado (32px+)</span>
          </div>
        </div>

        {/* Ancho Relativo de la Notificación */}
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
            <span>Ancho de Tarjeta (% de Pantalla)</span>
            <span className="font-mono text-cyan-400">{config.widthPercent}%</span>
          </div>
          <input
            type="range"
            min="80"
            max="98"
            value={config.widthPercent}
            onChange={(e) => onChange({ widthPercent: Number(e.target.value) })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>Compacto (80%)</span>
            <span>Equilibrado (92%)</span>
            <span>Ancho total (98%)</span>
          </div>
        </div>
      </div>

      {/* Elevación y Profundidad */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Nivel de Elevación y Profundidad de Sombra</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SHADOW_DEPTHS.map((shadow) => (
            <button
              key={shadow.id}
              onClick={() => onChange({ shadowDepth: shadow.id as NotificationConfig['shadowDepth'] })}
              className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-all ${
                config.shadowDepth === shadow.id
                  ? 'bg-cyan-500/15 border-cyan-500 text-white'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {shadow.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
