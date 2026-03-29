---
name: deploy
description: Run tests, build production bundle, and push to staging
disable-model-invocation: true
---

Deploy the application to the staging area. Follow these steps in order, stopping immediately if any step fails:

1. **Run all tests**
   ```
   npm test
   ```
   If tests fail, stop and report the failures. Do not proceed.

2. **Build the production bundle**
   ```
   npm run build
   ```
   If the build fails, stop and report the errors. Do not proceed.

3. **Push to staging**
   ```
   git push origin HEAD:staging
   ```
   If the push fails, report the error.

Report the outcome of each step as you go. If all steps succeed, confirm the deploy to staging is complete.
