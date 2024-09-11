declare module 'fastify-swagger' {
  import { FastifyPluginCallback } from 'fastify';

  interface SwaggerOptions {
    routePrefix?: string;
    swagger?: {
      info: {
        title: string;
        description: string;
        version: string;
      };
      consumes?: string[];
      produces?: string[];
    };
    exposeRoute?: boolean;
  }

  const fastifySwagger: FastifyPluginCallback<SwaggerOptions>;
  export default fastifySwagger;
}