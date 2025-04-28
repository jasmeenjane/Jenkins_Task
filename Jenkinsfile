pipeline {
    agent any

    environment {
        DEFAULT_RECIPIENT = 'harjot4780.be23@chitkara.edu.in'
        SMTP_HOST = 'smtp.gmail.com'
        SMTP_PORT = '465'
        SMTP_USER = 'jasmeen4783.be23@chitkara.edu.in'
        SMTP_PASSWORD = 'oeto xhzy suam vaed'
    }

    stages {
        stage('Build') {
            steps {
                echo "Stage 1: Building the code using Maven or Gradle"
            }
        }

        stage('Unit and Integration Tests') {
            steps {
                echo "Stage 2: Running Unit and Integration Tests using JUnit, Jacoco"
            }
            post {
                success {
                    emailext(
                        subject: "✅ Unit and Integration Tests Passed",
                        body: "Unit and Integration Test Stage was successful.",
                        to: "${env.DEFAULT_RECIPIENT}",
                        attachLog: true,
                        mimeType: 'text/plain'
                    )
                }
                failure {
                    emailext(
                        subject: "❌ Unit and Integration Tests Failed",
                        body: "Unit and Integration Test Stage failed.",
                        to: "${env.DEFAULT_RECIPIENT}",
                        attachLog: true,
                        mimeType: 'text/plain'
                    )
                }
            }
        }

        stage('Code Analysis') {
            steps {
                echo "Stage 3: Performing Code Analysis using SonarQube or Checkstyle"
            }
        }

        stage('Security Scan') {
            steps {
                echo "Stage 4: Performing Security Scan using OWASP Dependency-Check"
            }
            post {
                success {
                    emailext(
                        subject: "✅ Security Scan Passed",
                        body: "The security scan stage was successful.",
                        to: "${env.DEFAULT_RECIPIENT}",
                        attachLog: true
                    )
                }
                failure {
                    emailext(
                        subject: "❌ Security Scan Failed",
                        body: "The security scan stage failed.",
                        to: "${env.DEFAULT_RECIPIENT}",
                        attachLog: true
                    )
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo "Stage 5: Deploying to Staging Environment (e.g., using AWS CodeDeploy)"
            }
        }

        stage('Integration Tests on Staging') {
            steps {
                echo "Running Integration Tests on Staging (e.g., using Selenium or Postman)"
            }
            post {
                success {
                    emailext(
                        subject: "✅ Integration Tests on Staging Passed",
                        body: "Integration Tests on Staging stage was successful.",
                        to: "${env.DEFAULT_RECIPIENT}",
                        attachLog: true
                    )
                }
                failure {
                    emailext(
                        subject: "❌ Integration Tests on Staging Failed",
                        body: "Integration Tests on Staging Stage failed.",
                        to: "${env.DEFAULT_RECIPIENT}",
                        attachLog: true
                    )
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                echo "Stage 7: Deploying to Production Environment, e.g., using AWS"
            }
        }
    }

    post {
        always {
            script {
                echo "Pipeline execution completed. Email notifications sent with SSL (port 465)."
            }
        }
    }
}
