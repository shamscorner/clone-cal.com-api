export const CAL_API_VERSION_HEADER = 'cal-api-version';

export const VERSION_2024_06_14 = '2024-06-14';
export const VERSION_2024_06_11 = '2024-06-11';
export const VERSION_2024_04_15 = '2024-04-15';
export const VERSION_2024_08_13 = '2024-08-13';
export const VERSION_2024_09_04 = '2024-09-04';

export const API_VERSIONS = [
  VERSION_2024_06_14,
  VERSION_2024_06_11,
  VERSION_2024_04_15,
  VERSION_2024_08_13,
  VERSION_2024_09_04,
] as const;

export type API_VERSIONS_ENUM = (typeof API_VERSIONS)[number];
