# Word type count lambda API

To deploy make sure you have sst stack setup on your AWS account and run:

```
pnpm sst deploy --stage prod
```

output should be:

```
SST v2.36.0

➜ App: word-count-lambda-sst2
Stage: prod
Region: us-east-1
Account: 863159954110

Building static site packages/web

> web@0.0.0 build /home/capaj/word-count-lambda-sst2/packages/web
> tsc && vite build

vite v4.5.0 building for production...
✓ 30 modules transformed.
dist/index.html 0.40 kB │ gzip: 0.27 kB
dist/assets/index-d8845442.js 143.72 kB │ gzip: 46.30 kB
✓ built in 570ms
✔ Building...

| API PUBLISH_ASSETS_COMPLETE
| API AWS::CloudFormation::Stack UPDATE_COMPLETE
⠋ Deploying...

✔ Deployed:
API
ApiEndpoint: https://i3h8vgr0oh.execute-api.us-east-1.amazonaws.com
SiteUrl: https://d1im4oskzkkzef.cloudfront.net
```

### Tests

Lambda has a few specs. You can run them with `pnpm test` in root.
