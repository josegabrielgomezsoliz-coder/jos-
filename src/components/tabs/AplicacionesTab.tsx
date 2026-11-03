/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Smartphone, 
  MessageCircle, 
  Send, 
  Music, 
  Camera, 
  Mail, 
  PhoneCall, 
  Hash, 
  ShieldAlert, 
  Play, 
  Sliders, 
  Check, 
  Volume2
} from 'lucide-react';
import { AppRule, NotificationConfig, NotificationSoundType } from '../../types/notifications';
import { playNotificationSound } from '../../services/soundEffects';

interface AplicacionesTabProps {
  config: NotificationConfig;
  onChange: (updated: Partial<NotificationConfig>) => void;
  onTriggerAppTest: (appId: string) => void;
}

export const AplicacionesTab: React.FC<AplicacionesTabProps> = ({
  config,
  onChange,
  onTriggerAppTest,
}) => {
  const [selectedAppId, setSelectedAppId] = useState<string>('whatsapp');

  const apps = Object.values(config.appRules);
  const selectedApp = config.appRules[selectedAppId] || apps[0];

  const updateAppRule = (appId: string, patch: Partial<AppRule>) => {
    const current = config.appRules[appId];
    if (!current) return;
    const updated = {
      ...config.appRules,
      [appId]: {
        ...current,
        ...patch,
      },
    };
    onChange({ appRules: updated });
  };

  const getAppIcon = (id: string) => {
    const props = { className: 'w-4 h-4 text-white' };
    switch (id) {
      case 'whatsapp':
        return <MessageCircle {...props} />;
      case 'telegram':
        return <Send {...props} />;
      case 'spotify':
        return <Music {...props} />;
      case 'instagram':
        return <Camera {...props} />;
      case 'gmail':
        return <Mail {...props} />;
      case 'phone':
        return <PhoneCall {...props} />;
      case 'slack':
        return <Hash {...props} />;
      default:
        return <ShieldAlert {...props} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-cyan-400" />
          <span>Reglas por Aplicación</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Asigna colores de acento, prioridades y comportamientos personalizados para cada aplicación instalada.
        </p>
      </div>

      {/* App Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {apps.map((app) => {
          const isSelected = selectedAppId === app.id;
          return (
            <button
              key={app.id}
              onClick={() => setSelectedAppId(app.id)}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                isSelected
                  ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-sm'
                  : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow"
                style={{ backgroundColor: app.accentColor }}
              >
                {getAppIcon(app.id)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-white truncate">{app.name}</div>
                <div className="text-[10px] text-slate-500 truncate">
                  {app.enabled ? 'Activa' : 'Desactivada'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected App Configuration Card */}
      {selectedApp && (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md"
                style={{ backgroundColor: selectedApp.accentColor }}
              >
                {getAppIcon(selectedApp.id)}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{selectedApp.name}</h4>
                <span className="text-[11px] font-mono text-slate-400">{selectedApp.packageName}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onTriggerAppTest(selectedApp.id)}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-medium flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Probar Notificación</span>
              </button>
            </div>
          </div>

          {/* Toggle Activar/Desactivar */}
          <div className="flex items-center justify-between py-1">
            <div>
              <div className="text-xs font-medium text-slate-200">
                Personalizar notificaciones de {selectedApp.name}
              </div>
              <div className="text-[11px] text-slate-400">
                Si se desactiva, usará el estilo general predeterminado
              </div>
            </div>
            <button
              onClick={() => updateAppRule(selectedApp.id, { enabled: !selectedApp.enabled })}
              className={`w-10 h-5.5 rounded-full transition-colors relative p-0.5 ${
                selectedApp.enabled ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                  selectedApp.enabled ? 'translate-x-4.5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Color de Acento y Resplandor de la App */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <div>
              <label className="text-xs text-slate-300 block mb-1.5">Color de Acento / Badge</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={selectedApp.accentColor.slice(0, 7)}
                  onChange={(e) => updateAppRule(selectedApp.id, { accentColor: e.target.value })}
                  className="w-8 h-8 rounded-lg bg-transparent border border-slate-700 cursor-pointer"
                />
                <span className="text-xs font-mono text-slate-300">{selectedApp.accentColor}</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1.5">Nivel de Prioridad Android</label>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'normal', label: 'Normal' },
                  { id: 'high', label: 'Alta' },
                  { id: 'urgent', label: 'Urgente' },
                ].map((prio) => (
                  <button
                    key={prio.id}
                    onClick={() =>
                      updateAppRule(selectedApp.id, {
                        priority: prio.id as AppRule['priority'],
                      })
                    }
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                      selectedApp.priority === prio.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {prio.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Reply for messaging apps */}
          {['whatsapp', 'telegram', 'slack', 'instagram'].includes(selectedApp.id) && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div>
                <div className="text-xs font-medium text-slate-200">
                  Respuesta Rápida Directa en Pantalla
                </div>
                <div className="text-[11px] text-slate-400">
                  Muestra un campo de texto para contestar sin abrir la app
                </div>
              </div>
              <button
                onClick={() =>
                  updateAppRule(selectedApp.id, { allowQuickReply: !selectedApp.allowQuickReply })
                }
                className={`w-10 h-5.5 rounded-full transition-colors relative p-0.5 ${
                  selectedApp.allowQuickReply ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                    selectedApp.allowQuickReply ? 'translate-x-4.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          )}

          {/* Sonido específico de la App */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-slate-300 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tono Exclusivo para {selectedApp.name}</span>
              </label>
              <button
                onClick={() => playNotificationSound(selectedApp.sound, config.soundVolume)}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Escuchar</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { id: 'pixel-ping', label: 'Pixel Ping' },
                { id: 'pebble-pop', label: 'Pebble Pop' },
                { id: 'gentle-chime', label: 'Gentle Chime' },
                { id: 'none', label: 'Silencioso' },
              ].map((snd) => (
                <button
                  key={snd.id}
                  onClick={() => {
                    updateAppRule(selectedApp.id, { sound: snd.id as NotificationSoundType });
                    playNotificationSound(snd.id as NotificationSoundType, config.soundVolume);
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                    selectedApp.sound === snd.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {snd.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
