import type { Response as BaseResponse } from 'express';

import { API_ERROR_CODES, ERROR_STATUS, SUCCESS_STATUS } from '@/constants/api';

export type ApiSuccessResponse<T> = { status: typeof SUCCESS_STATUS; data: T };
export type ApiSuccessResponseWithoutData = { status: typeof SUCCESS_STATUS };

export type API_ERROR_CODES_TYPE = (typeof API_ERROR_CODES)[number];

export type ErrorType = {
  code: API_ERROR_CODES_TYPE;
  message?: string;
  details?: string | string[] | object;
};

export type ApiErrorResponse = {
  status: typeof ERROR_STATUS;
  timestamp?: string;
  path?: string;
  error: ErrorType;
};

export type ApiResponse<T = undefined> = T extends undefined
  ? ApiSuccessResponseWithoutData | ApiErrorResponse
  : ApiSuccessResponse<T> | ApiErrorResponse;

export type Response<T = unknown> = BaseResponse<ApiResponse<T>>;
