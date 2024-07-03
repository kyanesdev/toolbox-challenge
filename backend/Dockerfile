# Dockerfile para el backend

# Usar la imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app/backend

# Copiar los archivos de configuración del backend al contenedor
COPY package*.json ./

# Instalar las dependencias del backend
RUN npm install

# Copiar el resto de los archivos del backend al contenedor
COPY . .

# Exponer el puerto en el que se ejecuta el backend (ajústalo según sea necesario)
EXPOSE 5000

# Comando para ejecutar el backend
CMD ["node", "server.js"]
