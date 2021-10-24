FROM node:16-alpine
ENV PORT 4000

WORKDIR /graphqlapp
EXPOSE 4000

COPY package.json yarn.lock tsconfig.json /graphqlapp/
COPY ./ /graphqlapp/

RUN yarn global add nodemon
RUN yarn install

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/version || exit 1

EXPOSE ${PORT}

CMD ["yarn", "dev"]