/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { 
  MessageCircle, 
  Send, 
  Music, 
  Camera, 
  Mail, 
  PhoneCall, 
  PhoneOff, 
  Phone, 
  Hash, 
  ShieldAlert, 
  X, 
  CornerDownLeft, 
  Play, 
  Pause, 
  SkipForward, 
  CheckCheck
} from 'lucide-react';
import { DemoNotification, NotificationConfig } from '../types/notifications';

interface FloatingHeadsUpNotificationProps {
  notification: DemoNotification | null;
  config: NotificationConfig;
  onDismiss: () => void;
  onQuickReplySent?: (replyText: string) => void;
  isWithinPhoneFrame?: boolean;
}

export const FloatingHeadsUpNotification: React.FC<FloatingHeadsUpNotificationProps> = ({
  notification,
  config,
  onDismiss,
  onQuickReplySent,
  isWithinPhoneFrame = false,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isReplied, setIsReplied] = useState(false);
  const [isPlayingMedia, setIsPlayingMedia] = useState(true);
  const [callActive, setCallActive] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);

  // Reset internal states on new notification
  useEffect(() => {
    setIsReplying(false);
    setReplyText('');
    setIsReplied(false);
    setCallActive(false);
    setCallSeconds(0);
    if (notification?.media) {
      setIsPlayingMedia(notification.media.isPlaying);
    }
  }, [notification?.id]);

  // Call timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callActive) {
      interval = setInterval(() => setCallSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [callActive]);

  // Auto-dismiss countdown
  useEffect(() => {
    if (!notification || isReplying || callActive) return;
    if (config.durationSeconds <= 0) return; // Permanent until user action

    const timer = setTimeout(() => {
      onDismiss();
    }, config.durationSeconds * 1000);

    return () => clearTimeout(timer);
  }, [notification?.id, isReplying, callActive, config.durationSeconds, onDismiss]);

  const appRule = useMemo(() => {
    if (!notification) return null;
    return config.appRules[notification.appId] || null;
  }, [notification, config.appRules]);

  const accentColor = appRule?.accentColor || config.borderColor || '#38bdf8';
  const effectiveGlow = config.neonGlow
    ? `0 0 ${config.neonGlowSpread}px ${appRule?.glowColor || config.neonGlowColor}`
    : 'none';

  // Format call duration
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  // Render App Icon
  const renderAppIcon = () => {
    const iconProps = { className: 'w-4 h-4 text-white' };
    switch (notification?.appId) {
      case 'whatsapp':
        return <MessageCircle {...iconProps} />;
      case 'telegram':
        return <Send {...iconProps} />;
      case 'spotify':
        return <Music {...iconProps} />;
      case 'instagram':
        return <Camera {...iconProps} />;
      case 'gmail':
        return <Mail {...iconProps} />;
      case 'phone':
        return <PhoneCall {...iconProps} />;
      case 'slack':
        return <Hash {...iconProps} />;
      default:
        return <ShieldAlert {...iconProps} />;
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Swipe up or horizontal flick to dismiss
    if (info.offset.y < -30 || Math.abs(info.offset.x) > 90) {
      onDismiss();
    }
  };

  const submitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setIsReplied(true);
    setIsReplying(false);
    if (onQuickReplySent) {
      onQuickReplySent(replyText);
    }
    setTimeout(() => {
      onDismiss();
    }, 1500);
  };

  // Entrance animation variants
  const getMotionVariants = () => {
    switch (config.entranceAnim) {
      case 'spring-bounce':
        return {
          initial: { y: -80, opacity: 0, scale: 0.94 },
          animate: { y: 0, opacity: 1, scale: 1 },
          exit: { y: -70, opacity: 0, scale: 0.95 },
          transition: { type: 'spring' as const, damping: 14, stiffness: 220 },
        };
      case 'liquid-pop':
        return {
          initial: { y: -50, scale: 0.8, opacity: 0 },
          animate: { y: 0, scale: 1, opacity: 1 },
          exit: { y: -40, scale: 0.9, opacity: 0 },
          transition: { type: 'spring' as const, damping: 11, stiffness: 300 },
        };
      case 'flip-fade':
        return {
          initial: { y: -40, rotateX: 30, opacity: 0 },
          animate: { y: 0, rotateX: 0, opacity: 1 },
          exit: { y: -30, rotateX: -20, opacity: 0 },
          transition: { duration: 0.28, ease: 'easeOut' as const },
        };
      case 'morph-expand':
        return {
          initial: { y: -30, scaleX: 0.6, scaleY: 0.6, opacity: 0 },
          animate: { y: 0, scaleX: 1, scaleY: 1, opacity: 1 },
          exit: { y: -30, scaleX: 0.8, opacity: 0 },
          transition: { type: 'spring' as const, damping: 16, stiffness: 240 },
        };
      case 'slide-down':
      default:
        return {
          initial: { y: -90, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: -80, opacity: 0 },
          transition: { duration: 0.24, ease: 'easeOut' as const },
        };
    }
  };

  const motionConfig = getMotionVariants();

  // Container styling
  const containerStyle: React.CSSProperties = {
    fontFamily: config.fontFamily,
    borderRadius: `${config.borderRadius}px`,
    borderWidth: `${config.borderWidth}px`,
    borderColor: config.borderColor,
    width: config.layoutMode === 'full-width-bar' ? '96%' : `${config.widthPercent}%`,
    maxWidth: isWithinPhoneFrame ? '94%' : '560px',
    boxShadow:
      config.shadowDepth === 'neon'
        ? `${effectiveGlow}, 0 20px 25px -5px rgba(0, 0, 0, 0.5)`
        : config.shadowDepth === 'deep'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        : config.shadowDepth === 'medium'
        ? '0 10px 15px -3px rgba(0, 0, 0, 0.4)'
        : 'none',
    backgroundColor:
      config.bgType === 'solid'
        ? `${config.bgColor}${Math.round((config.bgOpacity / 100) * 255).toString(16).padStart(2, '0')}`
        : undefined,
    backgroundImage:
      config.bgType === 'gradient'
        ? `linear-gradient(${config.bgGradientAngle}deg, ${config.bgColor}${Math.round((config.bgOpacity / 100) * 255).toString(16).padStart(2, '0')}, ${config.bgGradientEnd}${Math.round((config.bgOpacity / 100) * 255).toString(16).padStart(2, '0')})`
        : config.bgType === 'glass'
        ? `linear-gradient(135deg, ${config.bgColor}${Math.round((config.bgOpacity / 100) * 255).toString(16).padStart(2, '0')}, rgba(15, 23, 42, 0.7))`
        : undefined,
    backdropFilter: `blur(${config.backdropBlur}px)`,
    WebkitBackdropFilter: `blur(${config.backdropBlur}px)`,
  };

  // Badge shape helper
  const getBadgeShapeClass = () => {
    switch (config.badgeStyle) {
      case 'circle':
        return 'rounded-full';
      case 'pill':
        return 'rounded-lg px-2';
      case 'monochrome':
        return 'rounded-xl grayscale';
      case 'glow':
        return 'rounded-xl ring-2 ring-cyan-400/60 ring-offset-1 ring-offset-slate-900';
      case 'squircle':
      default:
        return 'rounded-2xl';
    }
  };

  if (!notification) return null;

  return (
    <AnimatePresence>
      <div
        className={`pointer-events-none z-50 flex items-center justify-center ${
          isWithinPhoneFrame ? 'absolute inset-x-0' : 'fixed inset-x-0'
        }`}
        style={{
          top: `${isWithinPhoneFrame ? config.topMargin + 12 : config.topMargin}px`,
        }}
      >
        <motion.div
          drag="y"
          dragConstraints={{ top: -100, bottom: 20 }}
          dragElastic={{ top: 0.3, bottom: 0.1 }}
          onDragEnd={handleDragEnd}
          initial={motionConfig.initial}
          animate={motionConfig.animate}
          exit={motionConfig.exit}
          transition={motionConfig.transition}
          style={containerStyle}
          className={`pointer-events-auto relative overflow-hidden text-slate-100 transition-all select-none cursor-grab active:cursor-grabbing ${
            config.layoutMode === 'dynamic-island'
              ? 'p-2.5 px-4 shadow-xl'
              : 'p-3.5 shadow-2xl'
          }`}
        >
          {/* Subtle grab bar on top */}
          <div className="w-8 h-1 bg-white/20 hover:bg-white/40 rounded-full mx-auto mb-2 transition-colors cursor-pointer" />

          {/* Incoming Call Layout */}
          {notification.type === 'call' ? (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 flex items-center justify-center ${getBadgeShapeClass()} shadow-md`}
                  style={{ backgroundColor: appRule?.accentColor || '#10b981' }}
                >
                  <Phone className={`w-5 h-5 text-white ${callActive ? '' : 'animate-bounce'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-medium">
                      {callActive ? 'Llamada en curso' : 'Llamada entrante'}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {callActive ? formatTime(callSeconds) : 'Móvil'}
                    </span>
                  </div>
                  <h4
                    className="truncate font-semibold text-white tracking-tight"
                    style={{ fontSize: `${config.titleSize}px` }}
                  >
                    {notification.sender}
                  </h4>
                  <p className="text-xs text-slate-300 truncate">
                    {callActive ? 'Audio HD activo · 00:00' : 'Desliza para responder'}
                  </p>
                </div>
              </div>

              {/* Call Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                {callActive ? (
                  <button
                    onClick={() => {
                      setCallActive(false);
                      onDismiss();
                    }}
                    className="col-span-2 h-10 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                  >
                    <PhoneOff className="w-4 h-4" />
                    Finalizar llamada
                  </button>
                ) : (
                  <>
                    <button
                      onClick={onDismiss}
                      className="h-10 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                    >
                      <PhoneOff className="w-4 h-4" />
                      Rechazar
                    </button>
                    <button
                      onClick={() => setCallActive(true)}
                      className="h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40 transition-transform active:scale-95"
                    >
                      <Phone className="w-4 h-4" />
                      Contestar
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : notification.type === 'media' ? (
            /* Spotify / Media Player Layout */
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 flex items-center justify-center shrink-0 ${getBadgeShapeClass()} shadow-md`}
                  style={{ backgroundColor: appRule?.accentColor || '#1db954' }}
                >
                  <Music className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="text-emerald-400 font-medium">Spotify Music</span>
                    <span>{notification.timestamp}</span>
                  </div>
                  <h4
                    className="truncate font-semibold text-white tracking-tight"
                    style={{ fontSize: `${config.titleSize}px` }}
                  >
                    {notification.media?.track || notification.title}
                  </h4>
                  <p
                    className="text-xs text-slate-300 truncate"
                    style={{ fontSize: `${config.messageSize}px` }}
                  >
                    {notification.media?.artist || notification.message}
                  </p>
                </div>

                {/* Media Playback Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setIsPlayingMedia(!isPlayingMedia)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-transform active:scale-90"
                    title={isPlayingMedia ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlayingMedia ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <button
                    onClick={() => onDismiss()}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 flex items-center justify-center transition-transform active:scale-90"
                    title="Siguiente pista"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${notification.media?.progressPercent || 48}%` }}
                />
              </div>
            </div>
          ) : (
            /* Messaging / Standard Alert Layout */
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                {/* App / Sender Icon */}
                <div
                  className={`w-9 h-9 flex items-center justify-center shrink-0 ${getBadgeShapeClass()} shadow-md`}
                  style={{ backgroundColor: appRule?.accentColor || accentColor }}
                >
                  {renderAppIcon()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 truncate">
                      {config.showAppName && (
                        <span
                          className="text-xs font-semibold uppercase tracking-wider"
                          style={{ color: appRule?.accentColor || '#38bdf8' }}
                        >
                          {notification.appName}
                        </span>
                      )}
                      {config.showAppName && config.showTimestamp && (
                        <span className="text-slate-500 text-xs">·</span>
                      )}
                      {config.showTimestamp && (
                        <span className="text-[11px] text-slate-400">{notification.timestamp}</span>
                      )}
                    </div>

                    <button
                      onClick={onDismiss}
                      className="text-slate-400 hover:text-white p-1 -mr-1 rounded-full hover:bg-white/10 transition-colors"
                      title="Cerrar notificación"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4
                    className="truncate tracking-tight font-semibold text-white mt-0.5"
                    style={{
                      fontSize: `${config.titleSize}px`,
                      fontWeight:
                        config.titleWeight === 'bold'
                          ? 700
                          : config.titleWeight === 'semibold'
                          ? 600
                          : config.titleWeight === 'medium'
                          ? 500
                          : 400,
                    }}
                  >
                    {notification.sender || notification.title}
                  </h4>

                  <p
                    className="line-clamp-2 text-slate-300 leading-snug mt-0.5"
                    style={{
                      fontSize: `${config.messageSize}px`,
                      color: config.subtextColor,
                    }}
                  >
                    {notification.message}
                  </p>
                </div>
              </div>

              {/* Replied Toast Feedback */}
              {isReplied && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg mt-1 animate-fadeIn">
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Respuesta rápida enviada con éxito</span>
                </div>
              )}

              {/* Inline Quick Reply Input Form */}
              {isReplying && !isReplied && (
                <form onSubmit={submitReply} className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Escribe una respuesta rápida..."
                    autoFocus
                    className="flex-1 bg-black/40 border border-white/20 focus:border-cyan-400 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-400 outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1 transition-transform active:scale-95"
                  >
                    <Send className="w-3 h-3" />
                    <span>Enviar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsReplying(false)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              {/* Quick Actions (Reply, Mark as Read, Dismiss) */}
              {!isReplying && !isReplied && config.showQuickReply && (
                <div className="flex items-center gap-2 pt-1 border-t border-white/10 mt-1">
                  {appRule?.allowQuickReply !== false && (
                    <button
                      onClick={() => setIsReplying(true)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors active:scale-95"
                    >
                      <CornerDownLeft className="w-3 h-3 text-cyan-400" />
                      <span>Responder</span>
                    </button>
                  )}
                  <button
                    onClick={onDismiss}
                    className="px-2.5 py-1 rounded-lg bg-transparent hover:bg-white/10 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors"
                  >
                    <span>Marcar leído</span>
                  </button>
                  <button
                    onClick={onDismiss}
                    className="px-2.5 py-1 rounded-lg bg-transparent hover:bg-white/10 text-slate-400 hover:text-slate-200 text-xs font-medium ml-auto transition-colors"
                  >
                    <span>Descartar</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Dismiss progress timer bar (at the bottom of the card) */}
          {config.showDismissBar && config.durationSeconds > 0 && !isReplying && !callActive && (
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: config.durationSeconds, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-[2px]"
              style={{
                backgroundColor: appRule?.accentColor || config.borderColor || '#38bdf8',
                opacity: 0.8,
              }}
            />
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
