import { StackContext, Api, StaticSite } from 'sst/constructs'

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes: {
      'POST /wordTypeCount': 'packages/functions/src/lambda.handler'
    }
  })

  const web = new StaticSite(stack, 'web', {
    path: 'packages/web',
    buildOutput: 'dist',
    buildCommand: 'pnpm run build',
    environment: {
      VITE_APP_API_URL: api.url
    }
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteUrl: web.url
  })
}
