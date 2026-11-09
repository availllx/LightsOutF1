/**
 * Shared F1 UI utilities — podium colors, borders, and display helpers.
 * Aligned with F1 Design System tokens:
 * - P1: #e10600 (F1 signature racing red)
 * - P2: #c0c0c8 (Precision silver)
 * - P3: #cd7f32 (Motorsport bronze)
 */

/** Left-border accent class for podium positions */
export function podiumBorderClass(position: number): string {
  if (position === 1) return "border-l-[3px] border-l-[#e10600]";
  if (position === 2) return "border-l-[3px] border-l-[#c0c0c8]";
  if (position === 3) return "border-l-[3px] border-l-[#cd7f32]";
  return "border-l-[3px] border-l-transparent";
}

/** Text color for podium positions */
export function podiumTextClass(position: number): string {
  if (position === 1) return "text-[#e10600]";
  if (position === 2) return "text-[#d0d0d8]";
  if (position === 3) return "text-[#cd7f32]";
  return "text-white";
}

/** Background tint for podium positions */
export function podiumBgClass(position: number): string {
  if (position === 1) return "bg-[#e10600]/10";
  if (position === 2) return "bg-white/5";
  if (position === 3) return "bg-[#cd7f32]/10";
  return "bg-transparent";
}

/** Pad a number to two digits (e.g. 3 → "03"). */
export function padTwo(n: number): string {
  return String(n).padStart(2, "0");
}
