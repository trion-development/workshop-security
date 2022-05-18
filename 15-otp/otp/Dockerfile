FROM trion/ng-cli as build

RUN git clone --depth 1 https://github.com/qoomon/otp-authenticator-webapp .
RUN npm ci
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html