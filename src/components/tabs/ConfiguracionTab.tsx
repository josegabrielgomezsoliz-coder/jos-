/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Download, 
  Upload, 
  RotateCcw, 
  Code2, 
  Check, 
  Copy, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink 
} from 'lucide-react';
import { NotificationConfig, PresetProfile, SystemPermissionStatus } from '../../types/notifications';
import { 
  PRESET_PROFILES, 
  DEFAULT_CONFIG, 
  generateKotlinOverlayService, 
  generateKotlinNotificationListener 
} from '../../services/storage';

interface ConfiguracionTabProps {
  config: NotificationConfig;
  onChange: (updated: NotificationConfig) => void;
  onApplyPreset: (preset: PresetProfile) => void;
  onResetToDefault: () => void;
}

export const ConfiguracionTab: React.FC<ConfiguracionTabProps> = ({
  config,
  onChange,
  onApplyPreset,
  onResetToDefault,
}) => {
  const [permissions, setPermissions] = useState<SystemPermissionStatus>({
    overlayPermission: true,
    notificationAccess: true,
    postNotifications: true,
    batteryOptimization: true,
  });

  const [activeCodeTab, setActiveCodeTab] = useState<'service' | 'listener'>('service');
  const [copiedCode, setCopiedCode] = useState(false);
  const [importStatus, setImportStatus] = useState<string>('');

  const togglePermission = (key: keyof SystemPermissionStatus) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const copyCode = () => {
    const code =
      activeCodeTab === 'service'
        ? generateKotlinOverlayService(config)
        : generateKotlinNotificationListener();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const exportConfigJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `notificaciones-config-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importConfigJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          onChange({
            ...DEFAULT_CONFIG,
            ...parsed,
          });
          setImportStatus('Configuración importada con éxito.');
          setTimeout(() => setImportStatus(''), 3000);
        } catch {
          setImportStatus('El archivo JSON no es válido.');
        }
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Settings className="w-4 h-4 text-cyan-400" />
          <span>Configuración del Sistema y Presets</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Gestiona perfiles visuales, permisos oficiales de Android 14+ y código fuente nativo.
        </p>
      </div>

      {/* Selector de Presets Visuales */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Perfiles Preestablecidos (Presets)</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {PRESET_PROFILES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onApplyPreset(preset)}
              className="p-3 rounded-xl border border-slate-800 hover:border-cyan-500/40 bg-slate-800/40 hover:bg-slate-800/80 text-left transition-all active:scale-[0.98] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {preset.name}
                  </span>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: preset.accent }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {preset.description}
                </p>
              </div>
              <span className="text-[10px] text-cyan-400 mt-2 font-medium">Aplicar Perfil</span>
            </button>
          ))}
        </div>
      </div>

      {/* Arquitectura y Permisos Android 14+ */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Permisos y Compatibilidad con Android 14 & 15</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            Para respetar las políticas de seguridad de Google Play y Android 14+, esta app utiliza
            las APIs oficiales de superposición (<span className="text-cyan-300 font-mono">WindowManager</span>) y el servicio de escucha de notificaciones (<span className="text-cyan-300 font-mono">NotificationListenerService</span>), garantizando máxima estabilidad sin requerir Root ni modificar paquetes del sistema original.
          </p>
        </div>

        <div className="space-y-2.5 pt-1">
          {[
            {
              key: 'overlayPermission' as const,
              title: 'Superposición sobre otras aplicaciones',
              api: 'android.permission.SYSTEM_ALERT_WINDOW',
              desc: 'Permite dibujar las notificaciones flotantes premium sobre cualquier aplicación en ejecución.',
            },
            {
              key: 'notificationAccess' as const,
              title: 'Acceso a Notificaciones',
              api: 'android.service.notification.NotificationListenerService',
              desc: 'Permite recibir y procesar las alertas del sistema para transformarlas con tu estilo personalizado.',
            },
            {
              key: 'postNotifications' as const,
              title: 'Publicar Notificaciones en Tiempo Real',
              api: 'android.permission.POST_NOTIFICATIONS (Android 13+)',
              desc: 'Requerido para la emisión de eventos y respuestas rápidas.',
            },
            {
              key: 'batteryOptimization' as const,
              title: 'Exención de Ahorro de Batería (Doze)',
              api: 'REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
              desc: 'Evita que el sistema cierre el servicio de notificaciones en reposo.',
            },
          ].map((perm) => (
            <div
              key={perm.key}
              className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-white">{perm.title}</span>
                  {permissions[perm.key] ? (
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Concedido
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Requerido
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-mono text-cyan-400/80 truncate mt-0.5">{perm.api}</div>
                <p className="text-[11px] text-slate-400 mt-0.5">{perm.desc}</p>
              </div>

              <button
                onClick={() => togglePermission(perm.key)}
                className={`w-10 h-5.5 rounded-full transition-colors relative p-0.5 shrink-0 ${
                  permissions[perm.key] ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                    permissions[perm.key] ? 'translate-x-4.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Exportador de Código Kotlin para Android Studio */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Código Nativo Android Kotlin (Listo para Compilar)</span>
          </label>
          <button
            onClick={copyCode}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedCode ? '¡Copiado!' : 'Copiar Código'}</span>
          </button>
        </div>

        {/* Code Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveCodeTab('service')}
            className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${
              activeCodeTab === 'service'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            FloatingHeadsUpService.kt
          </button>
          <button
            onClick={() => setActiveCodeTab('listener')}
            className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${
              activeCodeTab === 'listener'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            HeadsUpInterceptorService.kt
          </button>
        </div>

        {/* Code Block Container */}
        <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 max-h-56 overflow-y-auto p-3 text-xs font-mono text-slate-300">
          <pre className="text-[11px] leading-relaxed">
            {activeCodeTab === 'service'
              ? generateKotlinOverlayService(config)
              : generateKotlinNotificationListener()}
          </pre>
        </div>
      </div>

      {/* Exportar / Importar / Restablecer */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <label className="text-xs font-medium text-slate-300 block">
          Copia de Seguridad y Restauración
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportConfigJson}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium flex items-center gap-1.5 transition-all active:scale-95 border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exportar Perfil (.JSON)</span>
          </button>

          <label className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium flex items-center gap-1.5 transition-all active:scale-95 border border-slate-700 cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Importar Perfil</span>
            <input
              type="file"
              accept=".json"
              onChange={importConfigJson}
              className="hidden"
            />
          </label>

          <button
            onClick={onResetToDefault}
            className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-medium flex items-center gap-1.5 transition-all active:scale-95 border border-rose-500/20 ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Fábrica</span>
          </button>
        </div>

        {importStatus && (
          <div className="text-xs text-cyan-400 font-medium pt-1">{importStatus}</div>
        )}
      </div>
    </div>
  );
};
