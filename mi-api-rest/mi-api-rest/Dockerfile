# 1. IMAGEN BASE: OpenJDK17
FROM openjdk:17-jdk-slim

# 2. ARGUMENTO: Define una variable para el nombre del archivo JAR.
# Esto hace más fácil cambiar el nombre si es necesario.
ARG JAR_FILE=target/*.jar

# 3. COPIAR: Copia el archivo .jar desde tu computadora (la carpeta target)
# hacia el interior de la imagen de Docker. Le renombramos a app.jar para tener un nombre fijo.
COPY ${JAR_FILE} app.jar

# 4. EXPONER PUERTO: Informa a Docker que el contenedor escuchará
# en el puerto 8080 en tiempo de ejecución. (El puerto por defecto de Spring Boot).
EXPOSE 8080

# 5. COMANDO DE EJECUCIÓN: La instrucción final para correr tu aplicación
# cuando el contenedor se inicie.
ENTRYPOINT ["java", "-jar", "/app.jar"]