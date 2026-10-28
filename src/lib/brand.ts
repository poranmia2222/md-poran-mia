/* Brand constants — shared by the code-generated favicon and apple-icon
   routes so the browser-tab mark always matches the navbar's lime "P" chip.

   The "P" glyph is drawn geometrically (a stem plus a rounded bowl with a
   punched-out hole) instead of typeset, so it stays pixel-stable across icon
   sizes and build environments without shipping or loading a font. */

export const BRAND = {
  bg: "#a3e635", // lime-400 — the navbar chip color
  fg: "#0a0d0a", // page dark — same glyph color as the navbar logo
} as const;

/* Geometry of the "P" mark on a `size`×`size` canvas, scaled off the 32px
   grid the navbar chip uses. All four layers are absolutely positioned from
   the top-left corner; `hole` and `voidRadius` punch the lime gap back into
   the bowl so the glyph reads as a letter even at favicon sizes. */
export function pMarkParts(size: number) {
  const k = size / 32;

  return {
    /** Backdrop — rounded like the navbar chip (radius ≈22%) */
    radius: 7 * k,
    /** Vertical stem of the P */
    stem: { left: 7 * k, top: 7 * k, width: 4 * k, height: 18 * k },
    /** Bowl shell — spans the stem's left edge to a semicircular right side */
    bowl: {
      left: 7 * k,
      top: 7 * k,
      width: 18 * k,
      height: 10 * k,
      radius: `0 ${5 * k}px ${5 * k}px 0`,
    },
    /** Punched-out inner gap of the bowl (same color as the backdrop) */
    hole: {
      left: 11 * k,
      top: 10.5 * k,
      width: 10.5 * k,
      height: 3 * k,
      radius: `0 ${1.5 * k}px ${1.5 * k}px 0`,
    },
  };
}
