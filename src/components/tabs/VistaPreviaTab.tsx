/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Eye, 
  Send, 
  PhoneCall, 
  Music, 
  Mail, 
  Bell, 
  BatteryLow, 
  Sparkles, 
  PlusCircle, 
  CheckCircle2, 
  Globe 
} from 'lucide-react';
import { DemoNotification, NotificationConfig } from '../../types/notifications';

interface VistaPreviaTabProps {
  config: NotificationConfig;
  onTriggerNotification: (notification: DemoNotification) => void;
  activeNotification: DemoNotification | null;
}

export const VistaPreviaTab: React.FC<VistaPreviaTabProps> = ({
  config,
  onTriggerNotification,
  activeNotification,
}) => {
  const [customTitle, setCustomTitle] = useState('Elena Morales');
  const [customMessage, setCustomMessage] = useState('¿Nos vemos a las 8 para cenar? Avísame si reservas tú.');
  const [customApp, setCustomApp] = useState('whatsapp');
  const [webNotificationStatus, setWebNotificationStatus] = useState<string>('');

  const PRESET_DEMOS: Array<{
    title: string;
    sender: string;
    message: string;
    appId: string;
    appName: string;
    type: DemoNotification['type'];
    media?: DemoNotification['media'];
    icon: React.ReactNode;
  }> = [
    {
      title: 'Elena Morales',
      sender: 'Elena Morales',
      message: '¿Nos vemos a las 8 para cenar? Avísame si reservas tú.',
      appId: 'whatsapp',
      appName: 'WhatsApp',
      type: 'message',
      icon: <Send className="w-4 h-4 text-emerald-400" />,
    },
    {
      title: 'Llamada Entrante',
      sender: 'Mamá ❤️',
      message: 'Llamada de voz entrante...',
      appId: 'phone',
      appName: 'Teléfono',
      type: 'call',
      icon: <PhoneCall className="w-4 h-4 text-emerald-500" />,
    },
    {
      title: 'Reproduciendo ahora',
      sender: 'Spotify',
      message: 'The Weeknd · Blinding Lights',
      appId: 'spotify',
      appName: 'Spotify Music',
      type: 'media',
      media: {
        track: 'Blinding Lights',
        artist: 'The Weeknd · After Hours',
        isPlaying: true,
        duration: '3:20',
        progressPercent: 62,
      },
      icon: <Music className="w-4 h-4 text-emerald-400" />,
    },
    {
      title: 'Google Cloud Platform',
      sender: 'Google Cloud Platform',
      message: 'Tu informe mensual de optimización y seguridad ya se encuentra listo para descargar.',
      appId: 'gmail',
      appName: 'Gmail',
      type: 'message',
      icon: <Mail className="w-4 h-4 text-rose-400" />,
    },
    {
      title: 'Android Developers',
      sender: 'Android Central',
      message: 'Android 15 QPR2 Beta añade nuevas APIs para personalizar notificaciones flotantes.',
      appId: 'telegram',
      appName: 'Telegram',
      type: 'message',
      icon: <Send className="w-4 h-4 text-sky-400" />,
    },
    {
      title: 'Batería baja (15%)',
      sender: 'Sistema Android',
      message: 'Activa el Ahorro de Batería extremo para mantener tu teléfono encendido.',
      appId: 'system',
      appName: 'Sistema Android',
      type: 'alert',
      icon: <BatteryLow className="w-4 h-4 text-amber-400" />,
    },
  ];

  const triggerPreset = (demo: typeof PRESET_DEMOS[0]) => {
    onTriggerNotification({
      id: `${demo.appId}-${Date.now()}`,
      appId: demo.appId,
      appName: demo.appName,
      sender: demo.sender,
      title: demo.title,
      message: demo.message,
      timestamp: 'Ahora mismo',
      type: demo.type,
      media: demo.media,
    });
  };

  const triggerCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;
    const rule = config.appRules[customApp];
    onTriggerNotification({
      id: `custom-${Date.now()}`,
      appId: customApp,
      appName: rule?.name || 'Aplicación',
      sender: customTitle.trim() || rule?.name || 'Notificación',
      title: customTitle.trim(),
      message: customMessage.trim(),
      timestamp: 'Ahora mismo',
      type: 'message',
    });
  };

  // Test real Web Notification API
  const testWebNotificationAPI = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setWebNotificationStatus('Tu navegador actual no soporta la API de Notificaciones web.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('Notificaciones Android Studio', {
          body: '¡Esta es una notificación real del sistema enviada desde tu navegador!',
          icon: '/favicon.ico',
        });
        setWebNotificationStatus('Notificación nativa disparada con éxito.');
      } else {
        setWebNotificationStatus('Permiso de notificaciones denegado en el navegador.');
      }
    } catch (err) {
      setWebNotificationStatus('Error al solicitar permiso de notificaciones.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span>Laboratorio de Pruebas en Tiempo Real</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Dispara simulaciones interactivas de notificaciones para evaluar el diseño, físicas y animaciones.
        </p>
      </div>

      {/* Quick Launch Preset Cards */}
      <div className="space-y-3">
        <label className="text-xs font-medium text-slate-300 block">
          Disparadores Rápidos de Demostración
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PRESET_DEMOS.map((demo, idx) => (
            <button
              key={idx}
              onClick={() => triggerPreset(demo)}
              className="p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-cyan-500/40 text-left transition-all active:scale-[0.98] group flex items-start gap-3 shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {demo.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white truncate">{demo.sender}</span>
                  <span className="text-[10px] text-cyan-400 font-mono group-hover:underline">
                    Lanzar
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{demo.message}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Notification Creator */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-4">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
          <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Crear Notificación Personalizada de Prueba</span>
        </label>

        <form onSubmit={triggerCustom} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Aplicación Origen</label>
              <select
                value={customApp}
                onChange={(e) => setCustomApp(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
              >
                {Object.values(config.appRules).map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Remitente / Título</label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 placeholder-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Cuerpo del Mensaje</label>
            <textarea
              rows={2}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Escribe el texto de la notificación..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 placeholder-slate-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 transition-all active:scale-[0.99]"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Disparar Notificación Ahora</span>
          </button>
        </form>
      </div>

      {/* Real Browser Notification API Trigger */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-slate-200 flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Notificación Nativa del Sistema Operativo</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Prueba la API nativa de notificaciones de tu navegador / dispositivo
          </div>
          {webNotificationStatus && (
            <div className="text-[11px] text-cyan-300 mt-1 font-medium">
              {webNotificationStatus}
            </div>
          )}
        </div>

        <button
          onClick={testWebNotificationAPI}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-cyan-300 font-medium whitespace-nowrap transition-colors active:scale-95"
        >
          Probar en Sistema
        </button>
      </div>
    </div>
  );
};
