import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { join } from 'node:path';
import fastifyFormbody from '@fastify/formbody';
import fastifyAutoload from '@fastify/autoload';

export class App {
  private readonly app: FastifyInstance;

  constructor(options?: FastifyServerOptions) {
    this.app = fastify(options);
  }

  build() {
    try {
      console.log(join(__dirname, 'controllers'),);
      this.register();
      return this;
    } catch (e: unknown) {
      this.app.log.error(e);
      throw new Error('Failed to build app', { cause: e });
    }
  }

  async start(): Promise<App> {
    try {
      await this.app.listen({ port: 3333 });
      this.app.log.info('Api started successfully');

      return this;
    } catch (error) {
      this.app.log.error(error);

      throw new Error('Failed to start Api');
    }
  }

  private register(): void {
    this.app.register(fastifyFormbody);
    this.app.register(fastifyAutoload, {
      dir: join(__dirname, 'controllers'),
      dirNameRoutePrefix: false,
      ignorePattern: /.*(?!route|schemas)\.ts|\.js$/u,
      indexPattern: /.*route|schemas(\.ts|\.js)$/u,
    });
  }
}
