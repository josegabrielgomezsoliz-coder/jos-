/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppRule, NotificationConfig, PresetProfile } from '../types/notifications';

export const DEFAULT_APP_RULES: Record<string, AppRule> = {
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp',
    packageName: 'com.whatsapp',
    icon: 'MessageCircle',
    defaultColor: '#25D366',
    accentColor: '#25D366',
    glowColor: '#25d36666',
    enabled: true,
    priority: 'high',
    sound: 'pebble-pop',
    customSoundEnabled: true,
    allowQuickReply: true,
    customBadgeText: 'WA',
  },
  telegram: {
    id: 'telegram',
    name: 'Telegram',
    packageName: 'org.telegram.messenger',
    icon: 'Send',
    defaultColor: '#229ED9',
    accentColor: '#0088cc',
    glowColor: '#0088cc66',
    enabled: true,
    priority: 'high',
    sound: 'pixel-ping',
    customSoundEnabled: true,
    allowQuickReply: true,
    customBadgeText: 'TG',
  },
  spotify: {
    id: 'spotify',
    name: 'Spotify',
    packageName: 'com.spotify.music',
    icon: 'Music',
    defaultColor: '#1DB954',
    accentColor: '#1ed760',
    glowColor: '#1ed76066',
    enabled: true,
    priority: 'normal',
    sound: 'none',
    customSoundEnabled: false,
    allowQuickReply: false,
    customBadgeText: 'Music',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    packageName: 'com.instagram.android',
    icon: 'Camera',
    defaultColor: '#E1306C',
    accentColor: '#F77737',
    glowColor: '#e1306c66',
    enabled: true,
    priority: 'normal',
    sound: 'modern-blip',
    customSoundEnabled: true,
    allowQuickReply: true,
    customBadgeText: 'IG',
  },
  gmail: {
    id: 'gmail',
    name: 'Gmail',
    packageName: 'com.google.android.gm',
    icon: 'Mail',
    defaultColor: '#EA4335',
    accentColor: '#ea4335',
    glowColor: '#ea433566',
    enabled: true,
    priority: 'normal',
    sound: 'gentle-chime',
    customSoundEnabled: true,
    allowQuickReply: false,
    customBadgeText: 'Mail',
  },
  phone: {
    id: 'phone',
    name: 'Llamadas (Teléfono)',
    packageName: 'com.google.android.dialer',
    icon: 'PhoneCall',
    defaultColor: '#34A853',
    accentColor: '#34a853',
    glowColor: '#34a85388',
    enabled: true,
    priority: 'urgent',
    sound: 'gentle-chime',
    customSoundEnabled: true,
    allowQuickReply: false,
    customBadgeText: 'Llamada',
  },
  slack: {
    id: 'slack',
    name: 'Slack',
    packageName: 'com.Slack',
    icon: 'Hash',
    defaultColor: '#611f69',
    accentColor: '#4A154B',
    glowColor: '#ecb22e66',
    enabled: true,
    priority: 'high',
    sound: 'pixel-ping',
    customSoundEnabled: true,
    allowQuickReply: true,
    customBadgeText: 'Work',
  },
  system: {
    id: 'system',
    name: 'Sistema Android',
    packageName: 'android',
    icon: 'ShieldAlert',
    defaultColor: '#38bdf8',
    accentColor: '#0ea5e9',
    glowColor: '#38bdf866',
    enabled: true,
    priority: 'high',
    sound: 'pixel-ping',
    customSoundEnabled: true,
    allowQuickReply: false,
    customBadgeText: 'Sistema',
  },
};

export const DEFAULT_CONFIG: NotificationConfig = {
  // Apariencia
  bgType: 'glass',
  bgColor: '#0f172a',
  bgGradientEnd: '#1e1b4b',
  bgGradientAngle: 135,
  bgOpacity: 85,
  backdropBlur: 16,
  borderRadius: 24,
  borderWidth: 1,
  borderColor: '#38bdf840',
  neonGlow: true,
  neonGlowColor: '#06b6d4',
  neonGlowSpread: 12,
  shadowDepth: 'neon',

  // Personalización
  fontFamily: 'Outfit',
  titleSize: 15,
  titleWeight: 'semibold',
  messageSize: 13,
  textColor: '#f8fafc',
  subtextColor: '#94a3b8',
  badgeStyle: 'squircle',
  badgeSize: 'md',
  actionButtonStyle: 'glass',
  showTimestamp: true,
  showAppName: true,
  showDismissBar: true,
  showQuickReply: true,

  // Animaciones
  entranceAnim: 'spring-bounce',
  durationSeconds: 5,
  curveSpeed: 'bouncy',
  sound: 'pixel-ping',
  soundVolume: 0.7,
  hapticFeedback: true,

  // Posición
  layoutMode: 'floating-card',
  topMargin: 16,
  widthPercent: 92,
  alignment: 'center',

  // Apps
  appRules: DEFAULT_APP_RULES,
};

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: 'cyber-neon',
    name: 'Cyber Neon Glow',
    description: 'Estilo futurista con halo cian pulsante y fondo oscuro translúcido',
    accent: '#06b6d4',
    config: {
      ...DEFAULT_CONFIG,
      bgType: 'glass',
      bgColor: '#080d1a',
      bgGradientEnd: '#0f172a',
      bgOpacity: 88,
      backdropBlur: 20,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: '#06b6d460',
      neonGlow: true,
      neonGlowColor: '#06b6d4',
      neonGlowSpread: 16,
      shadowDepth: 'neon',
      fontFamily: 'Outfit',
      entranceAnim: 'spring-bounce',
      sound: 'pixel-ping',
      badgeStyle: 'glow',
    },
  },
  {
    id: 'material-oled',
    name: 'Material You OLED',
    description: 'Negro puro optimizado para pantallas AMOLED con toques sutiles de color',
    accent: '#a855f7',
    config: {
      ...DEFAULT_CONFIG,
      bgType: 'solid',
      bgColor: '#000000',
      bgGradientEnd: '#111111',
      bgOpacity: 96,
      backdropBlur: 10,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: '#27272a',
      neonGlow: false,
      neonGlowColor: '#a855f7',
      neonGlowSpread: 6,
      shadowDepth: 'deep',
      fontFamily: 'Plus Jakarta Sans',
      entranceAnim: 'liquid-pop',
      sound: 'pebble-pop',
      badgeStyle: 'circle',
    },
  },
  {
    id: 'aurora-frost',
    name: 'Aurora Frost Glass',
    description: 'Efecto de cristal esmerilado con suave degradado esmeralda y violeta',
    accent: '#10b981',
    config: {
      ...DEFAULT_CONFIG,
      bgType: 'gradient',
      bgColor: '#064e3b',
      bgGradientEnd: '#1e1b4b',
      bgGradientAngle: 120,
      bgOpacity: 78,
      backdropBlur: 24,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#34d39940',
      neonGlow: true,
      neonGlowColor: '#10b981',
      neonGlowSpread: 10,
      shadowDepth: 'medium',
      fontFamily: 'Urbanist',
      entranceAnim: 'morph-expand',
      sound: 'gentle-chime',
      badgeStyle: 'squircle',
    },
  },
  {
    id: 'dynamic-pill',
    name: 'Dynamic Island Notch',
    description: 'Forma de píldora compacta inspirada en interfaces dinámicas superiores',
    accent: '#38bdf8',
    config: {
      ...DEFAULT_CONFIG,
      bgType: 'solid',
      bgColor: '#050505',
      bgGradientEnd: '#0a0a0a',
      bgOpacity: 98,
      backdropBlur: 14,
      borderRadius: 36,
      borderWidth: 1,
      borderColor: '#262626',
      neonGlow: false,
      neonGlowColor: '#38bdf8',
      neonGlowSpread: 4,
      shadowDepth: 'subtle',
      fontFamily: 'Outfit',
      layoutMode: 'dynamic-island',
      widthPercent: 84,
      topMargin: 10,
      entranceAnim: 'liquid-pop',
      sound: 'modern-blip',
      badgeStyle: 'circle',
    },
  },
  {
    id: 'minimal-titanium',
    name: 'Titanium Muted',
    description: 'Líneas limpias, tipografía sobria y acabados metálicos minimalistas',
    accent: '#94a3b8',
    config: {
      ...DEFAULT_CONFIG,
      bgType: 'solid',
      bgColor: '#18181b',
      bgGradientEnd: '#18181b',
      bgOpacity: 92,
      backdropBlur: 8,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#3f3f46',
      neonGlow: false,
      neonGlowColor: '#71717a',
      neonGlowSpread: 0,
      shadowDepth: 'medium',
      fontFamily: 'JetBrains Mono',
      entranceAnim: 'slide-down',
      sound: 'pebble-pop',
      badgeStyle: 'monochrome',
    },
  },
  {
    id: 'sunset-crimson',
    name: 'Sunset Crimson',
    description: 'Gradiente cálido con tonos vino, mandarina y resplandor cobrizo',
    accent: '#f43f5e',
    config: {
      ...DEFAULT_CONFIG,
      bgType: 'gradient',
      bgColor: '#4c0519',
      bgGradientEnd: '#7c2d12',
      bgGradientAngle: 145,
      bgOpacity: 84,
      backdropBlur: 18,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: '#fb718550',
      neonGlow: true,
      neonGlowColor: '#f43f5e',
      neonGlowSpread: 14,
      shadowDepth: 'neon',
      fontFamily: 'Syne',
      entranceAnim: 'flip-fade',
      sound: 'gentle-chime',
      badgeStyle: 'glow',
    },
  },
];

const STORAGE_KEY = 'notificaciones_app_config_v1';

export function loadSavedConfig(): NotificationConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_CONFIG,
        ...parsed,
        appRules: {
          ...DEFAULT_APP_RULES,
          ...(parsed.appRules || {}),
        },
      };
    }
  } catch (err) {
    console.error('Error loading notification config:', err);
  }
  return DEFAULT_CONFIG;
}

export function saveConfigToStorage(config: NotificationConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Error saving notification config:', err);
  }
}

export function generateKotlinOverlayService(config: NotificationConfig): string {
  return `/**
 * Notificaciones Android 14+ Floating Overlay Service
 * Package: com.notificaciones.customizer.service
 * Target: Android 14 (API 34) & Android 15 (API 35)
 */
package com.notificaciones.customizer.service

import android.app.Service
import android.content.Context
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Build
import android.os.IBinder
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.WindowManager
import androidx.annotation.RequiresApi
import com.notificaciones.customizer.R
import com.notificaciones.customizer.databinding.LayoutCustomHeadsUpBinding

class FloatingHeadsUpService : Service() {

    private var windowManager: WindowManager? = null
    private var floatingView: View? = null
    private var binding: LayoutCustomHeadsUpBinding? = null

    override fun onBind(intent: Intent?): IBinder? = null

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate() {
        super.onCreate()
        windowManager = getSystemService(Context.WINDOW_SERVICE) as WindowManager
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val title = intent?.getStringExtra("TITLE") ?: "Notificación"
        val message = intent?.getStringExtra("MESSAGE") ?: ""
        val appPackage = intent?.getStringExtra("PACKAGE_NAME") ?: ""

        showFloatingNotification(title, message, appPackage)
        return START_NOT_STICKY
    }

    private fun showFloatingNotification(title: String, message: String, appPackage: String) {
        removeCurrentFloatingView()

        val layoutInflater = LayoutInflater.from(this)
        binding = LayoutCustomHeadsUpBinding.inflate(layoutInflater)
        floatingView = binding?.root

        // WindowManager setup for Android 14+ Floating Heads-up Overlay
        val layoutFlag = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
        } else {
            @Suppress("DEPRECATION")
            WindowManager.LayoutParams.TYPE_PHONE
        }

        val params = WindowManager.LayoutParams(
            (resources.displayMetrics.widthPixels * ${(config.widthPercent / 100).toFixed(2)}f).toInt(),
            WindowManager.LayoutParams.WRAP_CONTENT,
            layoutFlag,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
            WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN or
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
            PixelFormat.TRANSLUCENT
        ).apply {
            gravity = Gravity.TOP or Gravity.CENTER_HORIZONTAL
            y = ${config.topMargin} // Top offset in pixels
        }

        // Apply visual configuration generated from Notificaciones Studio
        binding?.let { b ->
            b.tvTitle.text = title
            b.tvMessage.text = message
            b.cardContainer.radius = ${config.borderRadius}f
            b.cardContainer.setCardBackgroundColor(android.graphics.Color.parseColor("${config.bgColor}"))
            b.cardContainer.alpha = ${(config.bgOpacity / 100).toFixed(2)}f
        }

        try {
            windowManager?.addView(floatingView, params)
            
            // Auto dismiss after duration
            val duration = ${config.durationSeconds}L * 1000L
            if (duration > 0) {
                floatingView?.postDelayed({
                    removeCurrentFloatingView()
                }, duration)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun removeCurrentFloatingView() {
        floatingView?.let {
            try {
                windowManager?.removeView(it)
            } catch (e: Exception) {
                // View already detached
            }
            floatingView = null
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        removeCurrentFloatingView()
    }
}`;
}

export function generateKotlinNotificationListener(): string {
  return `/**
 * Notificaciones Android 14+ Notification Listener Service
 * Package: com.notificaciones.customizer.service
 * Requires: android.permission.BIND_NOTIFICATION_LISTENER_SERVICE
 */
package com.notificaciones.customizer.service

import android.content.Intent
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification

class HeadsUpInterceptorService : NotificationListenerService() {

    override fun onNotificationPosted(sbn: StatusBarNotification?) {
        super.onNotificationPosted(sbn)
        if (sbn == null) return

        val packageName = sbn.packageName
        // Exclude system background noise or self
        if (packageName == applicationContext.packageName) return

        val extras = sbn.notification.extras
        val title = extras.getCharSequence("android.title")?.toString() ?: ""
        val text = extras.getCharSequence("android.text")?.toString() ?: ""

        if (title.isNotEmpty() || text.isNotEmpty()) {
            val intent = Intent(this, FloatingHeadsUpService::class.java).apply {
                putExtra("TITLE", title)
                putExtra("MESSAGE", text)
                putExtra("PACKAGE_NAME", packageName)
            }
            startService(intent)
        }
    }

    override fun onNotificationRemoved(sbn: StatusBarNotification?) {
        super.onNotificationRemoved(sbn)
    }
}`;
}
