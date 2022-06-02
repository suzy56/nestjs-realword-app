FROM node:14-alpine AS dependencies
# 如果各公司有自己的私有源，可以替换registry地址,如使用官方源注释下一行
RUN npm config set registry https://registry.npm.taobao.org && npm install -g pnpm 
WORKDIR /usr/src/app
# COPY package.json pnpm-lock.yaml .npmrc ./
COPY . .
RUN pnpm install --prod

FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE 3000
# 避免二次构建再次全部安装使用yarn启动命令
CMD ["yarn", "start:prod"]



# FROM node:16-alpine AS dependencies
# WORKDIR /usr/src/app
# COPY package.json yarn.lock ./
# RUN yarn install --production

# FROM node:16-alpine
# WORKDIR /usr/src/app
# COPY . ./
# COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# EXPOSE 3000
# CMD [ "yarn", "start:prod" ]