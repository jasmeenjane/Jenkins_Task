pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo "Stage 1: Building the code using Maven or Grad le"
            }
        }

        stage('Unit and Integration Tests') {
            steps {
                echo "Stage 2: Running Unit and Integration Tests using JUnit, Jacoco"
            }
            post {
                success {
                    emailext(
                        to: "harjot4780.be23@chitkara.edu.in",
                        subject: "Unit and Integration Test Stage: Success",
                        body: "Unit and Integration Test Stage was successful.",
                        attachLog: true
                    )
                }
                failure {
                    emailext(
                        to: "harjot4780.be23@chitkara.edu.in",
                        subject: "Unit and Integration Test Stage: Failure",
                        body: "Unit and Integration Test Stage failed.",
                        attachLog: true
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
                        to: "harjot4780.be23@chitkara.edu.in",
                        subject: "Security Scan Stage: Success",
                        body: "The security scan stage was successful.",
                        attachLog: true
                    )
                }
                failure {
                    emailext(
                        to: "harjot4780.be23@chitkara.edu.in",
                        subject: "Security Scan Stage: Failure",
                        body: "The security scan stage failed.",
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
                        to: "harjot4780.be23@chitkara.edu.in",
                        subject: "Integration Tests on Staging Stage: Success",
                        body: "Integration Tests on Staging stage was successful.",
                        attachLog: true
                    )
                }
                failure {
                    emailext(
                        to: "harjot4780.be23@chitkara.edu.in",
                        subject: "Integration Tests on Staging Stage: Failure",
                        body: "Integration Tests on Staging Stage failed.",
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
}
