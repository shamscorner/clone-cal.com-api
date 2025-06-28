import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import { filterReqHeaders } from '@/lib/filterReqHeaders';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  private readonly logger = new Logger('RequestIdMiddleware - NestMiddleware');

  use(req: Request, _: Response, next: NextFunction) {
    const requestId = uuid();
    req.headers['X-Request-Id'] = requestId;

    const { method, headers, baseUrl } = req;
    const requestBody = req.body as Record<string, unknown> | undefined;
    let jsonBodyString = '{}';

    try {
      if (requestBody && typeof requestBody === 'object') {
        jsonBodyString = JSON.stringify(requestBody);
      }
    } catch {
      this.logger.error('Could not parse request body');
    }

    this.logger.log('Incoming Request', {
      requestId,
      method,
      url: baseUrl,
      headers: filterReqHeaders(headers),
      requestBody: jsonBodyString,
      timestamp: new Date().toISOString(),
    });

    next();
  }
}
