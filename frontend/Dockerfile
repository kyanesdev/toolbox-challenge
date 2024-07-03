# Dockerfile para el frontend

# Usar la imagen base de Node.js
FROM node:16

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app/frontend

# Copiar los archivos de configuración del frontend al contenedor
COPY package*.json ./

# Instalar las dependencias del frontend
RUN npm install

# Copiar el resto de los archivos del frontend al contenedor
COPY . .

# Construir la aplicación React
RUN npm run build

# Exponer el puerto en el que se ejecuta el frontend (ajústalo según sea necesario)
EXPOSE 3001

# Comando para ejecutar el servidor de producción del frontend
CMD ["npm", "start"]
