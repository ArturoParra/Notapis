# ----- Etapa 1: CONSTRUIR LA APP -----
# Usamos una imagen de OpenJDK 17 completa para construir el .jar
FROM openjdk:17-jdk-slim AS builder

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de Maven y descargamos dependencias
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

# Copiamos el resto del código fuente y construimos el proyecto
COPY src ./src
RUN ./mvnw clean package -DskipTests


# ----- Etapa 2: CREAR LA IMAGEN FINAL -----
# Usamos una imagen ligera (slim) solo con lo necesario para EJECUTAR
FROM openjdk:17-jdk-slim

# Creamos un usuario no-root por seguridad
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copiamos SÓLO el .jar construido de la etapa anterior
COPY --from=builder /app/target/*.jar app.jar

# El puerto que expone tu app de Spring Boot
EXPOSE 8080

# Damos permisos al nuevo usuario
USER appuser

# El comando para correr la app
ENTRYPOINT ["java", "-jar", "/app.jar"]