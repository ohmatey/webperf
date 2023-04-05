FROM node:slim

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Set the working directory.
WORKDIR /usr/src/app

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
# RUN apt-get update && apt-get install curl gnupg -y \
#   && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#   && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#   && apt-get update \
#   && apt-get install google-chrome-stable -y --no-install-recommends \
#   && rm -rf /var/lib/apt/lists/*

# Copy the file from your host to your current location.
COPY . .

# Run the command inside your image filesystem.
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8080

# Build the app
RUN pnpm build

# Run the specified command within the container.
CMD [ "pnpm", "start" ]