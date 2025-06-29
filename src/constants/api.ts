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
export type API_VERSIONS_TYPE = typeof API_VERSIONS;

// Request headers
export const X_CAL_SECRET_KEY = 'x-cal-secret-key';
export const X_CAL_CLIENT_ID = 'x-cal-client-id';
export const X_CAL_PLATFORM_EMBED = 'x-cal-platform-embed';

// Response status codes
export const SUCCESS_STATUS = 'success';
export const ERROR_STATUS = 'error';
export const REDIRECT_STATUS = 'redirect';

// Client Errors (4xx)
export const BAD_REQUEST = 'BAD_REQUEST';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export const FORBIDDEN = 'FORBIDDEN';
export const NOT_FOUND = 'NOT_FOUND';
export const METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED';
export const UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY';
export const ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_IS_EXPIRED';
export const INVALID_ACCESS_TOKEN = 'Invalid Access Token.';
export const CONFLICT = 'CONFLICT';

// Server Errors (5xx)
export const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';

// Custom Errors
export const INVALID_PARAMETER = 'INVALID_PARAMETER';
export const MISSING_PARAMETER = 'MISSING_PARAMETER';
export const INVALID_API_KEY = 'INVALID_API_KEY';
export const RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND';
export const DUPLICATE_RESOURCE = 'DUPLICATE_RESOURCE';

export const API_ERROR_CODES = [
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  METHOD_NOT_ALLOWED,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
  INVALID_PARAMETER,
  MISSING_PARAMETER,
  INVALID_API_KEY,
  RESOURCE_NOT_FOUND,
  DUPLICATE_RESOURCE,
] as const;
