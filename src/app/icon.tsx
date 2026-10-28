import { ImageResponse } from "next/og";

import { BRAND, pMarkParts } from "@/lib/brand";

/* Code-generated favicon — the navbar's lime "P" chip as a 32×32 PNG.
   File-convention route, statically prerendered at build time. */

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const { radius, stem, bowl, hole } = pMarkParts(32);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          background: BRAND.bg,
          borderRadius: `${radius}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: stem.left,
            top: stem.top,
            width: stem.width,
            height: stem.height,
            background: BRAND.fg,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: bowl.left,
            top: bowl.top,
            width: bowl.width,
            height: bowl.height,
            background: BRAND.fg,
            borderRadius: bowl.radius,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: hole.left,
            top: hole.top,
            width: hole.width,
            height: hole.height,
            background: BRAND.bg,
            borderRadius: hole.radius,
          }}
        />
      </div>
    ),
    size,
  );
}
