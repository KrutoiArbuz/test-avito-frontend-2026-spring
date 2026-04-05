FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_API_BASE_URL
ARG VITE_OLLAMA_URL
ARG VITE_OLLAMA_MODEL

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_OLLAMA_URL=$VITE_OLLAMA_URL
ENV VITE_OLLAMA_MODEL=$VITE_OLLAMA_MODEL

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
