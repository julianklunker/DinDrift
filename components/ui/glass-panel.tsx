import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Background tint of the glass. Defaults to a light translucent white for dark-text legibility. */
  glassColor?: string
}

/**
 * Frosted "liquid glass" container that mirrors the look of the Chatbot GlassButton
 * (components/ui/apple-tahoe-liquid-glass-button.tsx) — same backdrop blur + inset
 * light/dark reflex box-shadow stack — but as a content panel. Used behind the hero
 * text so it stays legible over the moving background video.
 */
export function GlassPanel({ className, children, glassColor, style, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn("glass-panel relative rounded-3xl", className)}
      style={{ backgroundColor: glassColor ?? "rgba(255, 255, 255, 0.14)", ...style }}
      {...props}
    >
      <style>{`
        .glass-panel {
          --glass-reflex-light: 1;
          --glass-reflex-dark: 1;
          backdrop-filter: blur(12px) saturate(150%);
          -webkit-backdrop-filter: blur(12px) saturate(150%);
          box-shadow:
            inset 0 0 0 1px color-mix(in srgb, white calc(var(--glass-reflex-light) * 10%), transparent),
            inset 1.8px 3px 0px -2px color-mix(in srgb, white calc(var(--glass-reflex-light) * 90%), transparent),
            inset -2px -2px 0px -2px color-mix(in srgb, white calc(var(--glass-reflex-light) * 80%), transparent),
            inset -3px -8px 1px -6px color-mix(in srgb, white calc(var(--glass-reflex-light) * 60%), transparent),
            inset -0.3px -1px 4px 0px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 12%), transparent),
            inset -1.5px 2.5px 0px -2px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 20%), transparent),
            inset 0px 3px 4px -2px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 20%), transparent),
            inset 2px -6.5px 1px -4px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 10%), transparent),
            0px 1px 5px 0px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 10%), transparent),
            0px 6px 16px 0px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 8%), transparent);
        }
      `}</style>
      {children}
    </div>
  )
}
