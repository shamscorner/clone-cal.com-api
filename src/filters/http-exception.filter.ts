import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';

import { ERROR_STATUS } from '@/constants/api';
import { filterReqHeaders } from '@/lib/filterReqHeaders';
import { API_ERROR_CODES_TYPE, Response } from '@/types/app.types';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  private readonly logger = new Logger('HttpExceptionFilter');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    const requestId = request.headers['X-Request-Id'] ?? 'unknown-request-id';

    response.setHeader('X-Request-Id', requestId.toString());

    this.logger.error(`Http Exception Filter: ${exception?.message}`, {
      exception,
      body: request.body as Record<string, unknown>,
      headers: filterReqHeaders(request.headers),
      url: request.url,
      method: request.method,
      requestId,
    });

    response.status(statusCode).json({
      status: ERROR_STATUS,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: {
        code: exception.name as API_ERROR_CODES_TYPE,
        message: exception.message,
        details: exception.getResponse(),
      },
    });
  }
}
