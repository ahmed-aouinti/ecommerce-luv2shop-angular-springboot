#
# Build stage
#
FROM maven:3.6.0-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package


#
# Package stage
#
FROM openjdk:11-jre-slim
COPY --from=builder /app/target/spring-boot-ecommerce-0.0.1-SNAPSHOT.jar /app.jar
EXPOSE 8443
WORKDIR /app
LABEL name="spring-boot-ecommerce" version="0.0.1-SNAPSHOT"
ENTRYPOINT ["java", "server.ssl.key-store-password=secret", "-jar", "/app.jar"]
