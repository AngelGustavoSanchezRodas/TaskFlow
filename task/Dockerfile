# 1. OPTIMIZACIÓN: Usamos 'jre-alpine'.
# 'jre': Solo lo necesario para correr (menos peso).
# 'alpine': Un Linux miniatura (como de 5MB).
FROM eclipse-temurin:21-jre-alpine

# 2. DIRECTORIO DE TRABAJO
WORKDIR /app

# 3. COPIA EL JAR
# (Nota: Esto asume que YA creaste el .jar con Maven en tu compu)
COPY target/*.jar app.jar

# 4. EJECUCIÓN
ENTRYPOINT ["java", "-jar", "/app/app.jar"]