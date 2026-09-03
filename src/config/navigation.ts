export type NavigationItem = {
  key: string;
  path: string;
  isContentType: boolean;
};

// Populate only after reviewed keyword categories exist. Keep keys synchronized
// with en.json, CONTENT_GROUP_CONFIG, content directories, and sitemap output.
export const NAVIGATION_CONFIG: readonly NavigationItem[] = [
  {key: 'guide', path: '/guide', isContentType: true},
  {key: 'multiplayer', path: '/multiplayer', isContentType: true},
  {key: 'collectibles', path: '/collectibles', isContentType: true},
  {key: 'gadgets', path: '/gadgets', isContentType: true},
  {key: 'achievements', path: '/achievements', isContentType: true},
  {key: 'controls', path: '/controls', isContentType: true},
  {key: 'technical', path: '/technical', isContentType: true},
  {key: 'information', path: '/information', isContentType: true}
];

export const CONTENT_TYPES = NAVIGATION_CONFIG
  .filter((item) => item.isContentType)
  .map((item) => item.key) as readonly string[];

export type ContentType = string;
