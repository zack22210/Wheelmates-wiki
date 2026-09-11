export type BannerFormat = "728x90" | "300x250" | "468x60" | "160x600" | "160x300" | "320x50";

export interface BannerConfig {
  key: string;
  width: number;
  height: number;
  htmlPath: string;
}

const BANNER_SPECS: Record<
  BannerFormat,
  { width: number; height: number; htmlPath: string; fallbackKey: string; envKey: string | undefined }
> = {
  "728x90": {
    width: 728,
    height: 90,
    htmlPath: "/ads/banner-728x90",
    fallbackKey: "868b5066f64fd75fff8dc83031cf0e77",
    envKey: process.env.NEXT_PUBLIC_AD_BANNER_728X90,
  },
  "300x250": {
    width: 300,
    height: 250,
    htmlPath: "/ads/banner-300x250",
    fallbackKey: "",
    envKey: process.env.NEXT_PUBLIC_AD_BANNER_300X250,
  },
  "468x60": {
    width: 468,
    height: 60,
    htmlPath: "/ads/banner-468x60",
    fallbackKey: "",
    envKey: process.env.NEXT_PUBLIC_AD_BANNER_468X60,
  },
  "160x600": {
    width: 160,
    height: 600,
    htmlPath: "/ads/banner-160x600",
    fallbackKey: "",
    envKey: process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600,
  },
  "160x300": {
    width: 160,
    height: 300,
    htmlPath: "/ads/banner-160x300",
    fallbackKey: "5b6dec58e28d6437e4ea3938ef40b1a0",
    envKey: process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300,
  },
  "320x50": {
    width: 320,
    height: 50,
    htmlPath: "/ads/banner-320x50",
    fallbackKey: "cf37f798be2e1edd6a4b54a58e83b52e",
    envKey: process.env.NEXT_PUBLIC_AD_MOBILE_320X50,
  },
};

export const GOOGLE_ADSENSE_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
export const AD_NATIVE_BANNER_KEY =
  process.env.NEXT_PUBLIC_AD_NATIVE_BANNER?.trim() || "3fe3943c3b3af1709633e30d40f528b0";
export const AD_NATIVE_BANNER_SCRIPT =
  process.env.NEXT_PUBLIC_AD_NATIVE_SCRIPT?.trim() ||
  "https://pl31211927.profitableratecpmnetwork.com/3fe3943c3b3af1709633e30d40f528b0/invoke.js";

export function getBannerConfig(format: BannerFormat): BannerConfig | null {
  const spec = BANNER_SPECS[format];
  const key = spec.envKey?.trim() || spec.fallbackKey;
  if (!key) return null;
  return { key, width: spec.width, height: spec.height, htmlPath: spec.htmlPath };
}

export function buildBannerSrcDoc(format: BannerFormat): string | null {
  const config = getBannerConfig(format);
  if (!config) return null;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        key: "${config.key}",
        format: "iframe",
        height: ${config.height},
        width: ${config.width},
        params: {},
      };
    </script>
    <script type="text/javascript" src="https://www.highperformanceformat.com/${config.key}/invoke.js"></script>
  </body>
</html>`;
}
