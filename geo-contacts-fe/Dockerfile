# Base image for development stage
FROM node:alpine as development
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 5173
CMD ["yarn", "dev"]

# Build stage for production
FROM node:alpine as production
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
RUN yarn build

# Use a lightweight Nginx image for serving the static content
FROM nginx:alpine as nginx
COPY --from=production /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
