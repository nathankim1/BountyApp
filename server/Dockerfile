FROM node
COPY . /server
WORKDIR /server
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]