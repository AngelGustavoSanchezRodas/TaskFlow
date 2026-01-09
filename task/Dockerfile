# --- ETAPA 1: COCINAR (Build) ---
# Usamos Maven para crear el .jar aquí mismo
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# --- ETAPA 2: SERVIR (Run) ---
# Usamos Java ligero para correrlo
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]