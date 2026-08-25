# Stage 1: build the Angular application
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency manifests first so Docker can cache npm install.
COPY package.json package-lock.json ./
RUN npm ci

# Copy the application source and create the production build.
COPY . .
RUN npm run build

# Stage 2: serve only the built files with Nginx.
FROM nginx:alpine

COPY --from=build /app/dist/progressa-web/browser /usr/share/nginx/html

EXPOSE 80
