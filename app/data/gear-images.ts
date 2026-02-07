// app/data/gear-images.ts
export const GEAR_IMAGE_DIR = "/gear";
export const GEAR_IMAGE_EXTS = ["jpg", "jpeg", "png", "webp"] as const;

// cât de departe caută poze: 1..MAX
export const GEAR_IMAGE_MAX = 120;

// dacă lipsesc N poze la rând, se oprește scanarea (ca să nu caute până la MAX inutil)
export const GEAR_IMAGE_STOP_AFTER_MISSES = 40;
