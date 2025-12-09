# ==========================================
# Etapa 1: CONSTRUIR LA APP (Builder)
# ==========================================
# ¡OJO! Usamos "jdk" aquí porque necesitamos compilar (javac)
FROM eclipse-temurin:17-jdk AS builder

WORKDIR /app

# 1. Copiamos archivos de configuración de Maven
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# 2. EL ARREGLO PARA WINDOWS:
# Corrige los saltos de línea (\r) y da permisos de ejecución al mvnw
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

# 3. Descarga dependencias (Caché)
RUN ./mvnw dependency:go-offline

# 4. Copia el código fuente y compila
COPY src ./src
RUN ./mvnw clean package -DskipTests

# ==========================================
# Etapa 2: IMAGEN FINAL (Runner)
# ==========================================
# Usamos "jre" (Runtime) porque es más ligera y segura para producción
# Usamos la versión normal (Debian) para que funcionen tus comandos useradd
FROM eclipse-temurin:17-jre

WORKDIR /app

# Creamos usuario (funciona bien porque esta imagen es Debian, no Alpine)
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copiamos SÓLO el .jar construido de la etapa anterior
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

# Usamos el usuario limitado
USER appuser

ENTRYPOINT ["java", "-jar", "app.jar"]