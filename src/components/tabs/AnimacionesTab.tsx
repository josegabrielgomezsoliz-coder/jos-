/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Clock, Volume2, Vibrate, Play, Zap } from 'lucide-react';
import { NotificationConfig, NotificationEntranceAnimation, NotificationSoundType } from '../../types/notifications';
import { playNotificationSound, triggerHaptic } from '../../services/soundEffects';

interface AnimacionesTabProps {
  config: NotificationConfig;
  onChange: (updated: Partial<NotificationConfig>) => void;
  onPreviewAnimation?: () => void;
}

export const AnimacionesTab: React.FC<AnimacionesTabProps> = ({
  config,
  onChange,
  onPreviewAnimation,
}) => {
  const ENTRANCE_ANIMATIONS: Array<{
    id: NotificationEntranceAnimation;
    label: string;
    desc: string;
  }> = [
    {
      id: 'spring-bounce',
      label: 'Spring Bounce',
      desc: 'Efecto de rebote físico elástico suave',
    },
    {
      id: 'liquid-pop',
      label: 'Liquid Pop',
      desc: 'Expansión fluida desde el punto central',
    },
    {
      id: 'slide-down',
      label: 'Slide Clásico',
      desc: 'Deslizamiento vertical nativo Android',
    },
    {
      id: 'morph-expand',
      label: 'Morph Pill',
      desc: 'Transición desde píldora compacta a tarjeta completa',
    },
    {
      id: 'flip-fade',
      label: 'Flip 3D Fade',
      desc: 'Giro con perspectiva tridimensional sutil',
    },
  ];

  const SOUND_OPTIONS: Array<{ id: NotificationSoundType; label: string; desc: string }> = [
    { id: 'pixel-ping', label: 'Pixel Ping', desc: 'Doble tono nítido y moderno' },
    { id: 'pebble-pop', label: 'Pebble Pop', desc: 'Burbuja táctil cálida y suave' },
    { id: 'gentle-chime', label: 'Gentle Chime', desc: 'Campana de cristal armónica' },
    { id: 'modern-blip', label: 'Modern Blip', desc: 'Pulso electrónico minimalista' },
    { id: 'none', label: 'Silencioso', desc: 'Sin sonido de notificación' },
  ];

  const DURATIONS = [
    { value: 3, label: '3 seg' },
    { value: 5, label: '5 seg (Recomendado)' },
    { value: 8, label: '8 seg' },
    { value: 12, label: '12 seg' },
    { value: 0, label: 'Permanente (Hasta deslizar)' },
  ];

  const handleTestSound = (soundType: NotificationSoundType) => {
    playNotificationSound(soundType, config.soundVolume);
    if (config.hapticFeedback) {
      triggerHaptic(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Animaciones y Retroalimentación Táctil</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Configura la física de entrada, el tiempo de visualización y los efectos sonoros sintetizados.
        </p>
      </div>

      {/* Animación de Entrada */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Efecto de Aparición en Pantalla</span>
          </label>
          {onPreviewAnimation && (
            <button
              onClick={onPreviewAnimation}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 active:scale-95 transition-transform"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Probar entrada</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ENTRANCE_ANIMATIONS.map((anim) => (
            <button
              key={anim.id}
              onClick={() => {
                onChange({ entranceAnim: anim.id });
                if (onPreviewAnimation) onPreviewAnimation();
              }}
              className={`p-3 rounded-xl text-left border transition-all ${
                config.entranceAnim === anim.id
                  ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-sm'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-medium text-white">{anim.label}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{anim.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Duración de Aparición */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Tiempo de Permanencia Antes de Descartar</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {DURATIONS.map((dur) => (
            <button
              key={dur.value}
              onClick={() => onChange({ durationSeconds: dur.value })}
              className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                config.durationSeconds === dur.value
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {dur.label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 pt-1">
          Las notificaciones prioritarias (como llamadas) permanecerán visibles hasta que el usuario interactúe.
        </p>
      </div>

      {/* Sonido de Notificación Sintetizado */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-4">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
          <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Tono de Notificación Flotante (Web Audio)</span>
        </label>

        <div className="space-y-2">
          {SOUND_OPTIONS.map((snd) => (
            <div
              key={snd.id}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                config.sound === snd.id
                  ? 'bg-cyan-500/15 border-cyan-500/60 text-white'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                  onChange({ sound: snd.id });
                  handleTestSound(snd.id);
                }}
              >
                <div className="text-xs font-medium">{snd.label}</div>
                <div className="text-[10px] text-slate-400">{snd.desc}</div>
              </div>

              {snd.id !== 'none' && (
                <button
                  type="button"
                  onClick={() => handleTestSound(snd.id)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-400 text-xs flex items-center gap-1 transition-all active:scale-95"
                  title="Reproducir muestra de audio"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Escuchar</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Volumen de Audio */}
        {config.sound !== 'none' && (
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span>Volumen de Notificación</span>
              <span className="font-mono text-cyan-400">{Math.round(config.soundVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={config.soundVolume}
              onChange={(e) => onChange({ soundVolume: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        )}
      </div>

      {/* Vibración Háptica */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-slate-200 flex items-center gap-2">
            <Vibrate className="w-3.5 h-3.5 text-cyan-400" />
            <span>Retroalimentación Háptica (Vibración)</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Genera una pulsación física suave al recibir una alerta flotante
          </div>
        </div>

        <button
          onClick={() => {
            const next = !config.hapticFeedback;
            onChange({ hapticFeedback: next });
            if (next) triggerHaptic(true);
          }}
          className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
            config.hapticFeedback ? 'bg-cyan-500' : 'bg-slate-800'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white transition-transform ${
              config.hapticFeedback ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
