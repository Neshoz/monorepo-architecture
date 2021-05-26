FROM node:12.22.1

WORKDIR /Users/kevinnemec/Development/mediatool-poc

# Install dependencies early so that if some files in our app
# change, Docker won't have to download the dependencies again,
# and instead will start from the next step ("COPY . .").
COPY ./package.json .
COPY ./yarn.lock .
COPY ./packages/build-tools/package.json ./packages/build-tools/
COPY ./packages/core/package.json ./packages/core/
COPY ./packages/hub/package.json ./packages/hub/
COPY ./packages/tools/package.json ./packages/tools/
COPY ./packages/ui/package.json ./packages/ui/
RUN yarn

# Copy all files of our app (except files specified in the .dockerignore)
COPY . .
RUN yarn

# Build all the packages
RUN yarn ui build
RUN yarn tools build
RUN yarn hub build
RUN yarn core build

# Port
EXPOSE 8000

# Run the app
CMD ["yarn", "start"]