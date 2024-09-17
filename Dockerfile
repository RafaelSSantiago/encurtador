FROM node:20.11.1

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clean npm cache and update npm to the latest version
RUN npm cache clean --force && npm install -g npm@latest

# Retry npm install up to 3 times
RUN npm install || npm install || npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "dev"]