FROM node:20-slim AS base 
WORKDIR /app                                        
#  base is a cachable layer,A reusable template image with Node installed and working directory set.
FROM base AS deps                                   
# again starts from base, now this layer is deps
COPY package*.json ./
RUN npm ci
FROM base AS build                                  
# again starts from base, now this layer is build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build
FROM base AS prod                       
# again starts from base, now this layer is prod, this is the final image that will be used to run the application
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma            
# we copy only what is needed to run the application, this keeps the final image small and efficient.
COPY package*.json ./

EXPOSE 3000

CMD ["node", "dist/src/main.js"]


# This is how we do multi stage buids in Docker. Each stage starts from the base image and adds layers on top of it. The final stage (prod) only includes what is necessary to run the application, which helps to keep the image size small and efficient.