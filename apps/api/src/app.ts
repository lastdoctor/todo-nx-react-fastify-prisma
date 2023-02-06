import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { join } from 'node:path';
import fastifyFormbody from '@fastify/formbody';

export class App {
  private readonly app: FastifyInstance;

  constructor(options?: FastifyServerOptions) {
    this.app = fastify(options);
  }

  build() {
    try {
      this.
    } catch (e: unknown) {
      this.app.log.error(e);
      throw new Error('Failed to build app');
    }
  }

  async start(): Promise<App> {
    try {
      await this.app.listen();
      this.app.log.info('Api started successfully');

      return this;
    } catch (error) {
      this.app.log.error(error);

      throw new Error('Failed to start Api');
    }
  }

  private register(): void {
    this.app.register(fastifyFormbody);
    this.server.register(fastifyAutoload, {
      /* eslint-disable-next-line unicorn/prefer-module */
      dir: join(__dirname, 'components'),
      dirNameRoutePrefix: false,
      ignorePattern: /.*(?!route|schemas)\.ts|\.js$/u,
      indexPattern: /.*route|schemas(\.ts|\.js)$/u,
    });
      rejectUnauthorized: false,
    });
    this.server.register(fastifyCors);
    this.server.register(fastifyHelmet);
  }
}
