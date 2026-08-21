FROM node:lts AS base

WORKDIR /home/app

RUN corepack enable && \
    corepack prepare yarn@4.18.0 --activate

COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install --immutable --network-timeout 120000 && \
    chown -R node:node /home/app

COPY --chown=node:node . .

USER node

FROM base AS test

CMD ["sh", "-c", "yarn nuxt prepare && yarn vitest run --reporter=verbose 2>&1; EXIT_CODE=$?; echo ''; echo '=== LINT ==='; yarn lint 2>&1; LINT_EXIT=$?; echo ''; echo \"Tests exit: $EXIT_CODE | Lint exit: $LINT_EXIT\"; if [ $EXIT_CODE -ne 0 ] || [ $LINT_EXIT -ne 0 ]; then exit 1; fi"]

FROM base AS dev

EXPOSE 3000

CMD ["yarn", "dev", "--host", "0.0.0.0", "--port", "3000"]
