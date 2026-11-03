/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type NotificationBackgroundType = 'solid' | 'gradient' | 'glass';
export type NotificationLayoutMode = 'floating-card' | 'dynamic-island' | 'full-width-bar';
export type NotificationEntranceAnimation = 'slide-down' | 'spring-bounce' | 'liquid-pop' | 'flip-fade' | 'morph-expand';
export type NotificationBadgeStyle = 'squircle' | 'circle' | 'pill' | 'monochrome' | 'glow';
export type NotificationSoundType = 'pixel-ping' | 'gentle-chime' | 'pebble-pop' | 'modern-blip' | 'none';
export type NotificationFontFamily = 'Plus Jakarta Sans' | 'Outfit' | 'Syne' | 'Urbanist' | 'JetBrains Mono';

export interface AppRule {
  id: string;
  name: string;
  packageName: string;
  icon: string;
  defaultColor: string;
  accentColor: string;
  glowColor: string;
  enabled: boolean;
  priority: 'normal' | 'high' | 'urgent';
  sound: NotificationSoundType;
  customSoundEnabled: boolean;
  allowQuickReply: boolean;
  customBadgeText?: string;
}

export interface NotificationConfig {
  // Apariencia
  bgType: NotificationBackgroundType;
  bgColor: string;
  bgGradientEnd: string;
  bgGradientAngle: number;
  bgOpacity: number; // 20 to 100
  backdropBlur: number; // 0 to 30px
  borderRadius: number; // 0 to 36px
  borderWidth: number; // 0 to 4px
  borderColor: string;
  neonGlow: boolean;
  neonGlowColor: string;
  neonGlowSpread: number; // 0 to 30px
  shadowDepth: 'none' | 'subtle' | 'medium' | 'deep' | 'neon';

  // Personalización
  fontFamily: NotificationFontFamily;
  titleSize: number; // 12 to 18px
  titleWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  messageSize: number; // 11 to 16px
  textColor: string;
  subtextColor: string;
  badgeStyle: NotificationBadgeStyle;
  badgeSize: 'sm' | 'md' | 'lg';
  actionButtonStyle: 'filled' | 'glass' | 'outline';
  showTimestamp: boolean;
  showAppName: boolean;
  showDismissBar: boolean;
  showQuickReply: boolean;

  // Animaciones
  entranceAnim: NotificationEntranceAnimation;
  durationSeconds: number; // 3, 5, 8, 12, or 0 (permanent)
  curveSpeed: 'normal' | 'fast' | 'smooth' | 'bouncy';
  sound: NotificationSoundType;
  soundVolume: number; // 0 to 1
  hapticFeedback: boolean;

  // Posición
  layoutMode: NotificationLayoutMode;
  topMargin: number; // 8 to 60px
  widthPercent: number; // 80 to 98%
  alignment: 'center' | 'left' | 'right';

  // Aplicaciones
  appRules: Record<string, AppRule>;
}

export type DemoNotificationType = 'message' | 'call' | 'media' | 'alert' | 'quick-note';

export interface DemoNotification {
  id: string;
  appId: string;
  appName: string;
  sender: string;
  title: string;
  message: string;
  timestamp: string;
  avatar?: string;
  type: DemoNotificationType;
  media?: {
    track: string;
    artist: string;
    isPlaying: boolean;
    duration: string;
    progressPercent: number;
  };
  actions?: Array<{
    id: string;
    label: string;
    actionType: 'reply' | 'call' | 'dismiss' | 'action' | 'media-toggle';
    variant?: 'primary' | 'danger' | 'ghost';
  }>;
}

export interface SystemPermissionStatus {
  overlayPermission: boolean;
  notificationAccess: boolean;
  postNotifications: boolean;
  batteryOptimization: boolean;
}

export interface PresetProfile {
  id: string;
  name: string;
  description: string;
  accent: string;
  config: NotificationConfig;
}
