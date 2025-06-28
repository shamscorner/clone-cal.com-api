import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  OperationObject,
  PathItemObject,
  PathsObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const HttpMethods: (keyof PathItemObject)[] = [
  'get',
  'post',
  'put',
  'delete',
  'patch',
  'options',
  'head',
];

function isOperationObject(obj: any): obj is OperationObject {
  return Boolean(obj && typeof obj === 'object' && 'tags' in obj);
}

function customTagSort(a: string, b: string): number {
  const platformPrefix = 'Platform';
  const orgsPrefix = 'Orgs';

  if (a.startsWith(platformPrefix) && !b.startsWith(platformPrefix)) {
    return -1;
  }
  if (!a.startsWith(platformPrefix) && b.startsWith(platformPrefix)) {
    return 1;
  }

  if (a.startsWith(orgsPrefix) && !b.startsWith(orgsPrefix)) {
    return -1;
  }
  if (!a.startsWith(orgsPrefix) && b.startsWith(orgsPrefix)) {
    return 1;
  }

  return a.localeCompare(b);
}

function groupAndSortPathsByFirstTag(paths: PathsObject): PathsObject {
  const groupedPaths: { [key: string]: PathsObject } = {};

  Object.keys(paths).forEach((pathKey) => {
    const pathItem = paths[pathKey];

    HttpMethods.forEach((method) => {
      const operation = pathItem[method];

      if (
        isOperationObject(operation) &&
        operation.tags &&
        operation.tags.length > 0
      ) {
        const firstTag = operation.tags[0];

        if (!groupedPaths[firstTag]) {
          groupedPaths[firstTag] = {};
        }

        groupedPaths[firstTag][pathKey] = pathItem;
      }
    });
  });

  const sortedTags = Object.keys(groupedPaths).sort(customTagSort);
  const sortedPaths: PathsObject = {};

  sortedTags.forEach((tag) => {
    Object.assign(sortedPaths, groupedPaths[tag]);
  });

  return sortedPaths;
}

export function generateSwagger(app: NestExpressApplication) {
  const logger = new Logger('App');
  logger.log(`Generating Swagger documentation...\n`);

  const config = new DocumentBuilder().setTitle('Cal.com API v2').build();
  const document = SwaggerModule.createDocument(app, config);
  document.paths = groupAndSortPathsByFirstTag(document.paths);

  SwaggerModule.setup('docs', app, document, {
    customCss: '.swagger-ui .topbar { display: none }',
  });

  logger.log(`Swagger documentation available in the "/docs" endpoint\n`);
}
