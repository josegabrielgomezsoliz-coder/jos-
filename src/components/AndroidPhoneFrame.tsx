/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Search, Mic, Phone, MessageSquare, Chrome, Camera } from 'lucide-react';
import { DemoNotification, NotificationConfig } from '../types/notifications';
import { FloatingHeadsUpNotification } from './FloatingHeadsUpNotification';

interface AndroidPhoneFrameProps {
  notification: DemoNotification | null;
  config: NotificationConfig;
  onDismissNotification: () => void;
  onQuickReplySent?: (reply: string) => void;
  onTriggerTest?: () => void;
}

export const AndroidPhoneFrame: React.FC<AndroidPhoneFrameProps> = ({
  notification,
  config,
  onDismissNotification,
  onQuickReplySent,
  onTriggerTest,
}) => {
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[380px] h-[700px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700/50 flex flex-col overflow-hidden select-none">
      {/* Outer Phone Shell Reflection */}
      <div className="absolute inset-0 rounded-[44px] pointer-events-none border border-white/10" />

      {/* Screen Container */}
      <div className="relative flex-1 rounded-[38px] overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black flex flex-col justify-between">
        {/* Subtle Ambient Wallpaper Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-black pointer-events-none" />

        {/* Floating Heads-Up Notification Target */}
        <FloatingHeadsUpNotification
          notification={notification}
          config={config}
          onDismiss={onDismissNotification}
          onQuickReplySent={onQuickReplySent}
          isWithinPhoneFrame={true}
        />

        {/* Android 14 Status Bar */}
        <div className="relative z-30 px-6 pt-3 pb-2 flex items-center justify-between text-xs text-slate-300 font-medium">
          {/* Clock */}
          <span className="font-mono text-[13px] tracking-tight text-white">{currentTime}</span>

          {/* Punch-hole Front Camera */}
          <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          </div>

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-[10px] font-semibold text-slate-400">5G</span>
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] text-slate-400">98%</span>
              <BatteryMedium className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Home Screen Widgets & Content */}
        <div className="relative z-10 px-6 flex-1 flex flex-col justify-between pt-8 pb-4">
          {/* Android Clock Widget */}
          <div className="text-center mt-6">
            <h1 className="text-5xl font-light tracking-tight text-white/90 font-outfit">
              {currentTime}
            </h1>
            <p className="text-xs text-cyan-400/90 font-medium mt-1">
              Lunes, 2 de Noviembre · 22°C Soleado
            </p>
          </div>

          {/* Interactive Trigger Button inside Phone Simulator */}
          <div className="my-auto text-center px-4">
            <button
              onClick={onTriggerTest}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md transition-all active:scale-95 shadow-lg shadow-cyan-950/20"
            >
              <span>Disparar Notificación de Prueba</span>
            </button>
            <p className="text-[10px] text-slate-500 mt-2">
              Prueba los controles deslizando hacia arriba para descartar
            </p>
          </div>

          {/* Android Home Screen Grid */}
          <div className="flex flex-col gap-4">
            {/* Google Search Bar Mock */}
            <div className="h-10 bg-white/10 backdrop-blur-md rounded-full px-4 flex items-center justify-between border border-white/10 text-slate-400 text-xs shadow-inner">
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-[11px] text-slate-400">Buscar en el dispositivo...</span>
              </div>
              <Mic className="w-3.5 h-3.5 text-cyan-400" />
            </div>

            {/* Bottom Dock App Icons */}
            <div className="grid grid-cols-4 gap-3 py-2">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-950/40 cursor-pointer active:scale-90 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] text-slate-400">Teléfono</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-950/40 cursor-pointer active:scale-90 transition-transform">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] text-slate-400">Mensajes</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-950/40 cursor-pointer active:scale-90 transition-transform">
                  <Chrome className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] text-slate-400">Chrome</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl bg-slate-700 flex items-center justify-center shadow-lg shadow-slate-950/40 cursor-pointer active:scale-90 transition-transform">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] text-slate-400">Cámara</span>
              </div>
            </div>
          </div>
        </div>

        {/* Android 14 Home Gesture Navigation Pill */}
        <div className="relative z-30 pb-2 pt-1 flex justify-center">
          <div className="w-32 h-1 bg-white/40 rounded-full" />
        </div>
      </div>
    </div>
  );
};
