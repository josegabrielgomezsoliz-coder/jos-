/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Bell, 
  Palette, 
  Type, 
  Sparkles, 
  Move, 
  Smartphone, 
  Eye, 
  Settings, 
  Play, 
  SmartphoneCharging, 
  Maximize2, 
  Check, 
  Volume2
} from 'lucide-react';
import { 
  NotificationConfig, 
  DemoNotification, 
  PresetProfile 
} from './types/notifications';
import { 
  DEFAULT_CONFIG, 
  loadSavedConfig, 
  saveConfigToStorage, 
  PRESET_PROFILES 
} from './services/storage';
import { playNotificationSound, triggerHaptic } from './services/soundEffects';
import { AndroidPhoneFrame } from './components/AndroidPhoneFrame';
import { FloatingHeadsUpNotification } from './components/FloatingHeadsUpNotification';
import { AparienciaTab } from './components/tabs/AparienciaTab';
import { PersonalizacionTab } from './components/tabs/PersonalizacionTab';
import { AnimacionesTab } from './components/tabs/AnimacionesTab';
import { PosicionTab } from './components/tabs/PosicionTab';
import { AplicacionesTab } from './components/tabs/AplicacionesTab';
import { VistaPreviaTab } from './components/tabs/VistaPreviaTab';
import { ConfiguracionTab } from './components/tabs/ConfiguracionTab';

type TabKey = 'apariencia' | 'personalizacion' | 'animaciones' | 'posicion' | 'aplicaciones' | 'vista-previa' | 'configuracion';

export default function App() {
  const [config, setConfig] = useState<NotificationConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<TabKey>('apariencia');
  const [activeNotification, setActiveNotification] = useState<DemoNotification | null>(null);
  const [viewMode, setViewMode] = useState<'phone' | 'fullscreen'>('phone');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load configuration from localStorage on mount
  useEffect(() => {
    const loaded = loadSavedConfig();
    setConfig(loaded);

    // Initial demo notification
    setTimeout(() => {
      triggerDemoNotification({
        id: 'initial-demo',
        appId: 'whatsapp',
        appName: 'WhatsApp',
        sender: 'Elena Morales',
        title: 'Elena Morales',
        message: '¡Hola! Tu nuevo panel de notificaciones flotantes está activo.',
        timestamp: 'Ahora',
        type: 'message',
      });
    }, 600);
  }, []);

  // Save config on changes
  const updateConfig = (patch: Partial<NotificationConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...patch };
      saveConfigToStorage(next);
      return next;
    });
  };

  // Trigger notification helper with sound and haptic feedback
  const triggerDemoNotification = useCallback(
    (notif: DemoNotification) => {
      setActiveNotification(null);
      setTimeout(() => {
        setActiveNotification(notif);
        const appRule = config.appRules[notif.appId];
        const soundToPlay = appRule?.customSoundEnabled ? appRule.sound : config.sound;
        playNotificationSound(soundToPlay, config.soundVolume);
        if (config.hapticFeedback) {
          triggerHaptic(true);
        }
      }, 50);
    },
    [config]
  );

  const triggerDefaultDemo = () => {
    triggerDemoNotification({
      id: `demo-${Date.now()}`,
      appId: 'whatsapp',
      appName: 'WhatsApp',
      sender: 'Elena Morales',
      title: 'Elena Morales',
      message: '¿Nos vemos a las 8 para cenar? Avísame si reservas tú.',
      timestamp: 'Ahora mismo',
      type: 'message',
    });
  };

  const handleApplyPreset = (preset: PresetProfile) => {
    setConfig(preset.config);
    saveConfigToStorage(preset.config);
    showToast(`Perfil "${preset.name}" aplicado con éxito`);
    triggerDemoNotification({
      id: `preset-${Date.now()}`,
      appId: 'system',
      appName: 'Sistema Android',
      sender: 'Perfil Actualizado',
      title: preset.name,
      message: preset.description,
      timestamp: 'Ahora',
      type: 'alert',
    });
  };

  const handleResetToDefault = () => {
    setConfig(DEFAULT_CONFIG);
    saveConfigToStorage(DEFAULT_CONFIG);
    showToast('Configuraciones restablecidas a valores de fábrica');
    triggerDemoNotification({
      id: `reset-${Date.now()}`,
      appId: 'system',
      appName: 'Sistema Android',
      sender: 'Valores Predeterminados',
      title: 'Restablecido',
      message: 'Todas las preferencias han vuelto a su estado original.',
      timestamp: 'Ahora',
      type: 'alert',
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const TABS: Array<{ id: TabKey; label: string; icon: React.ReactNode }> = [
    { id: 'apariencia', label: 'Apariencia', icon: <Palette className="w-4 h-4" /> },
    { id: 'personalizacion', label: 'Personalización', icon: <Type className="w-4 h-4" /> },
    { id: 'animaciones', label: 'Animaciones', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'posicion', label: 'Posición', icon: <Move className="w-4 h-4" /> },
    { id: 'aplicaciones', label: 'Aplicaciones', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'vista-previa', label: 'Vista previa', icon: <Eye className="w-4 h-4" /> },
    { id: 'configuracion', label: 'Configuración', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Real Fullscreen Notification Overlay (When in Fullscreen view mode) */}
      {viewMode === 'fullscreen' && activeNotification && (
        <FloatingHeadsUpNotification
          notification={activeNotification}
          config={config}
          onDismiss={() => setActiveNotification(null)}
          onQuickReplySent={(reply) => {
            showToast(`Respuesta enviada: "${reply}"`);
          }}
          isWithinPhoneFrame={false}
        />
      )}

      {/* Top Bar Header */}
      <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-950/50">
            <Bell className="w-5 h-5 text-slate-950 fill-current" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white font-outfit">
              Notificaciones
            </h1>
            <div className="text-[10px] text-slate-400 -mt-0.5 font-medium">
              Panel Heads-Up Android 14+
            </div>
          </div>
        </div>

        {/* Zone 2: Fast View Mode Toggles */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setViewMode('phone')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all ${
              viewMode === 'phone'
                ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <SmartphoneCharging className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Teléfono Android</span>
          </button>
          <button
            onClick={() => {
              setViewMode('fullscreen');
              if (!activeNotification) triggerDefaultDemo();
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all ${
              viewMode === 'fullscreen'
                ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Overlay Completo</span>
          </button>
        </div>

        {/* Zone 3: Primary Action Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={triggerDefaultDemo}
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-cyan-950/40 transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Disparar Notificación</span>
            <span className="sm:hidden">Probar</span>
          </button>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Android Phone Frame Simulator */}
        <section className="lg:col-span-5 flex flex-col items-center">
          <div className="sticky top-24 w-full">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Simulador de Pantalla Android</span>
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-cyan-400/90">
                  {config.layoutMode === 'dynamic-island'
                    ? 'Dynamic Island'
                    : config.layoutMode === 'full-width-bar'
                    ? 'Barra Completa'
                    : 'Tarjeta Heads-Up'}
                </span>
              </div>
            </div>

            {/* Android 14 Smartphone Mockup */}
            <AndroidPhoneFrame
              notification={activeNotification}
              config={config}
              onDismissNotification={() => setActiveNotification(null)}
              onQuickReplySent={(reply) => {
                showToast(`Respuesta rápida: "${reply}"`);
              }}
              onTriggerTest={triggerDefaultDemo}
            />

            {/* Hint & quick instructions */}
            <div className="mt-3 text-center px-4">
              <p className="text-[11px] text-slate-500">
                Interactúa con la notificación: desliza verticalmente para descartar o presiona Responder para contestar.
              </p>
            </div>
          </div>
        </section>

        {/* Right Column: Complete 7-Tab Android Control Panel */}
        <section className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-4 sm:p-6 shadow-xl backdrop-blur-sm flex flex-col">
          {/* Scrollable Tab Navigation Bar */}
          <div className="flex items-center gap-1 overflow-x-auto pb-3 mb-6 border-b border-slate-800 scrollbar-none">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/50 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="min-h-[440px]">
            {activeTab === 'apariencia' && (
              <AparienciaTab config={config} onChange={updateConfig} />
            )}

            {activeTab === 'personalizacion' && (
              <PersonalizacionTab config={config} onChange={updateConfig} />
            )}

            {activeTab === 'animaciones' && (
              <AnimacionesTab
                config={config}
                onChange={updateConfig}
                onPreviewAnimation={triggerDefaultDemo}
              />
            )}

            {activeTab === 'posicion' && (
              <PosicionTab config={config} onChange={updateConfig} />
            )}

            {activeTab === 'aplicaciones' && (
              <AplicacionesTab
                config={config}
                onChange={updateConfig}
                onTriggerAppTest={(appId) => {
                  const rule = config.appRules[appId];
                  triggerDemoNotification({
                    id: `${appId}-${Date.now()}`,
                    appId: appId,
                    appName: rule?.name || 'App',
                    sender: rule?.name || 'Aplicación',
                    title: `Alerta de ${rule?.name}`,
                    message: `Mensaje de demostración de ${rule?.name} con estilo personalizado.`,
                    timestamp: 'Ahora mismo',
                    type: appId === 'phone' ? 'call' : appId === 'spotify' ? 'media' : 'message',
                  });
                }}
              />
            )}

            {activeTab === 'vista-previa' && (
              <VistaPreviaTab
                config={config}
                onTriggerNotification={triggerDemoNotification}
                activeNotification={activeNotification}
              />
            )}

            {activeTab === 'configuracion' && (
              <ConfiguracionTab
                config={config}
                onChange={(newCfg) => {
                  setConfig(newCfg);
                  saveConfigToStorage(newCfg);
                }}
                onApplyPreset={handleApplyPreset}
                onResetToDefault={handleResetToDefault}
              />
            )}
          </div>
        </section>
      </main>

      {/* Subtle Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500/40 text-cyan-200 text-xs px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 py-4 px-6 text-center text-xs text-slate-500">
        <div className="flex items-center justify-center gap-2">
          <span>Notificaciones Android</span>
          <span>·</span>
          <span>Arquitectura Heads-Up Overlay Android 14+</span>
          <span>·</span>
          <span>APIs Oficiales WindowManager & NotificationListener</span>
        </div>
      </footer>
    </div>
  );
}
