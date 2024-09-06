FROM node
COPY . /client
WORKDIR /client
RUN npm install
EXPOSE 3001
CMD ["npm", "run", "dev"]