# Se utiliza la imagen de node
FROM node:latest

# Se establece el directorio de trabajo
WORKDIR /fullstack-app/site

# Se copian los archivos necesarios al contenedor
COPY site/package.json .
COPY site/src/ ./src

# Se instalan las dependencias
RUN npm install --production

# Se expone el puerto que utiliza la aplicación
EXPOSE 8080

# Se ejecuta el comando para iniciar la aplicación
CMD ["npm", "start"]