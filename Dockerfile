FROM node:16
RUN npm i -g serve
RUN rm -rf /static/
COPY build /static/
CMD serve --single /static