# Use the official SonarQube image
FROM sonarqube:latest

# Set environment variables for the SonarQube server
ENV SONARQUBE_JDBC_URL=jdbc:postgresql://db:5432/sonarqube
ENV SONARQUBE_JDBC_USERNAME=sonarqube
ENV SONARQUBE_JDBC_PASSWORD=sonarqube

# Expose the SonarQube port
EXPOSE 9000

# Entry point for SonarQube
CMD ["./bin/run.sh"]
