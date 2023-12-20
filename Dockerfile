# syntax=docker/dockerfile:1

# Use node image for base image for all stages.
FROM node:18.18.2-alpine as base

# Set working directory for all build stages.
WORKDIR /DASHBOARD-MIRANDA/

# Install xdg-utils to handle opening the browser
RUN apk add --no-cache xdg-utils

COPY public/ /OXY-PRO2/public
COPY src/ /DASHBOARD-MIRANDA/src
COPY package.json /DASHBOARD-MIRANDA/

RUN npm install

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm", "start"]