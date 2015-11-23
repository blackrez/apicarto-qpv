FROM node:5-wheezy
# replace this with your application's default port

EXPOSE 3000

COPY package.json /src/package.json
RUN cd /src; npm install
COPY . /src
CMD ["node", "/src/app.js"]
