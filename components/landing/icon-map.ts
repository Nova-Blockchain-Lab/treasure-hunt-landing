import {
  MapPin, Sparkles, Smartphone, Users, Share2, TrendingUp, Trophy, QrCode,
  Nfc, Zap, BarChart3, Gift, Target, Clock, ShieldCheck, Wifi, Building2,
  GraduationCap, Store, PartyPopper, Award, CheckCircle2, Rocket, Heart,
  Megaphone, Map, Coins, Lock,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Curated icon set landing content can reference by name. Keep this list as the
// single source of allowed `icon` values for LandingBenefit. Falls back to
// Sparkles for an unknown name so a typo never breaks the build.
export const ICONS: Record<string, LucideIcon> = {
  MapPin, Sparkles, Smartphone, Users, Share2, TrendingUp, Trophy, QrCode,
  Nfc, Zap, BarChart3, Gift, Target, Clock, ShieldCheck, Wifi, Building2,
  GraduationCap, Store, PartyPopper, Award, CheckCircle2, Rocket, Heart,
  Megaphone, Map, Coins, Lock,
}

export function resolveIcon(name: string): LucideIcon {
  return ICONS[name] ?? Sparkles
}
