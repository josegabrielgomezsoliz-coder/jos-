/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Type, ShieldCheck, ToggleLeft, Sliders, CheckSquare } from 'lucide-react';
import { NotificationConfig, NotificationFontFamily } from '../../types/notifications';

interface PersonalizacionTabProps {
  config: NotificationConfig;
  onChange: (updated: Partial<NotificationConfig>) => void;
}

export const PersonalizacionTab: React.FC<PersonalizacionTabProps> = ({ config, onChange }) => {
  const FONTS: Array<{ id: NotificationFontFamily; label: string; sample: string }> = [
    { id: 'Outfit', label: 'Outfit (Modern & Clean)', sample: 'Heads-up Notification' },
    { id: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans (Editorial)', sample: 'Heads-up Notification' },
    { id: 'Syne', label: 'Syne (Futuristic & Bold)', sample: 'Heads-up Notification' },
    { id: 'Urbanist', label: 'Urbanist (Geometric & Sleek)', sample: 'Heads-up Notification' },
    { id: 'JetBrains Mono', label: 'JetBrains Mono (Tech & Minimal)', sample: 'Heads-up Notification' },
  ];

  const BADGE_STYLES = [
    { id: 'squircle', label: 'Squircle', desc: 'Curvatura suave Android 14' },
    { id: 'circle', label: 'Circular', desc: 'Círculo simétrico clásico' },
    { id: 'pill', label: 'Píldora', desc: 'Pastilla horizontal' },
    { id: 'glow', label: 'Resplandor', desc: 'Anillo luminoso neón' },
    { id: 'monochrome', label: 'Monocromo', desc: 'Elegante escala de grises' },
  ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Type className="w-4 h-4 text-cyan-400" />
          <span>Tipografía e Iconografía</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Ajusta fuentes, tamaños de texto, estilos de insignias de aplicaciones y botones interactivos.
        </p>
      </div>

      {/* Tipografía */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-4">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
          <Type className="w-3.5 h-3.5 text-cyan-400" />
          <span>Familia Tipográfica</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {FONTS.map((font) => (
            <button
              key={font.id}
              onClick={() => onChange({ fontFamily: font.id })}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                config.fontFamily === font.id
                  ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-sm'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <div className="text-xs font-semibold" style={{ fontFamily: font.id }}>
                {font.label}
              </div>
              <div
                className="text-[11px] text-slate-400 truncate mt-0.5"
                style={{ fontFamily: font.id }}
              >
                {font.sample}
              </div>
            </button>
          ))}
        </div>

        {/* Tamaño de Título y Cuerpo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span>Tamaño de Título</span>
              <span className="font-mono text-cyan-400">{config.titleSize}px</span>
            </div>
            <input
              type="range"
              min="13"
              max="18"
              value={config.titleSize}
              onChange={(e) => onChange({ titleSize: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span>Tamaño de Mensaje</span>
              <span className="font-mono text-cyan-400">{config.messageSize}px</span>
            </div>
            <input
              type="range"
              min="11"
              max="16"
              value={config.messageSize}
              onChange={(e) => onChange({ messageSize: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>

        {/* Peso tipográfico del título */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-300">Grosor de Fuente del Título</span>
          <div className="flex items-center gap-1.5">
            {[
              { id: 'normal', label: 'Regular' },
              { id: 'medium', label: 'Medium' },
              { id: 'semibold', label: 'Semibold' },
              { id: 'bold', label: 'Bold' },
            ].map((weight) => (
              <button
                key={weight.id}
                onClick={() => onChange({ titleWeight: weight.id as NotificationConfig['titleWeight'] })}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                  config.titleWeight === weight.id
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {weight.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Estilo de Iconos y Badges */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Diseño de Insignia de Aplicación (Icon Badge)</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BADGE_STYLES.map((badge) => (
            <button
              key={badge.id}
              onClick={() => onChange({ badgeStyle: badge.id as NotificationConfig['badgeStyle'] })}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                config.badgeStyle === badge.id
                  ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-sm'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-medium text-white">{badge.label}</div>
              <div className="text-[10px] text-slate-400 truncate">{badge.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Interruptores de Elementos Visuales */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-2 mb-2">
          <ToggleLeft className="w-3.5 h-3.5 text-cyan-400" />
          <span>Elementos Visibles en la Notificación</span>
        </label>

        {[
          {
            key: 'showAppName' as const,
            title: 'Nombre de Aplicación',
            desc: 'Muestra la etiqueta de la app (ej. WHATSAPP, SPOTIFY) en el encabezado',
            value: config.showAppName,
          },
          {
            key: 'showTimestamp' as const,
            title: 'Marca de Tiempo (Hora)',
            desc: 'Indica la hora exacta o el tiempo relativo transcurrido',
            value: config.showTimestamp,
          },
          {
            key: 'showQuickReply' as const,
            title: 'Botones de Acciones Rápidas',
            desc: 'Permite responder mensajes directamente desde la ventana flotante',
            value: config.showQuickReply,
          },
          {
            key: 'showDismissBar' as const,
            title: 'Barra de Progreso de Duración',
            desc: 'Línea visual en la base que indica cuándo se cerrará automáticamente',
            value: config.showDismissBar,
          },
        ].map((toggle) => (
          <div
            key={toggle.key}
            className="flex items-center justify-between p-2 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
          >
            <div>
              <div className="text-xs font-medium text-slate-200">{toggle.title}</div>
              <div className="text-[11px] text-slate-400">{toggle.desc}</div>
            </div>
            <button
              onClick={() => onChange({ [toggle.key]: !toggle.value })}
              className={`w-10 h-5.5 rounded-full transition-colors relative p-0.5 shrink-0 ${
                toggle.value ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                  toggle.value ? 'translate-x-4.5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
