pipeline {
    agent any
    environment {
        EMAIL_RECIPIENT = "jasmeen4783.be23@chitkara.edu.in"
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                bat 'mvn clean package'  // Example for Java using Maven
            }
        }

        stage('Unit and Integration Tests') {
            steps {
                echo 'Running unit and integration tests...'
                bat 'mvn test'  // Example for Java
            }
            post {
                always {
                    script {
                        def logContent = currentBuild.rawBuild.getLog(100).join("\n")
                        emailext(
                            to: "${EMAIL_RECIPIENT}",
                            subject: "Test Stage Result - ${currentBuild.fullDisplayName}",
                            body: "Tests completed: ${currentBuild.currentResult}\n\nLogs:\n${logContent}"
                        )
                    }
                }
            }
        }

        stage('Code Analysis') {
            steps {
                echo 'Analyzing code...'
                bat 'sonar-scanner'  // Example using SonarQube
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Performing security scan...'
                bat 'trivy fs .'  // Example using Trivy for security scanning
            }
            post {
                always {
                    script {
                        def logContent = currentBuild.rawBuild.getLog(100).join("\n")
                        emailext(
                            to: "${EMAIL_RECIPIENT}",
                            subject: "Security Scan Result - ${currentBuild.fullDisplayName}",
                            body: "Security scan completed: ${currentBuild.currentResult}\n\nLogs:\n${logContent}"
                        )
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to Staging Server...'
                bat 'scp target/app.jar user@staging-server:/deploy/'  // Example
            }
        }

        stage('Integration Tests on Staging') {
            steps {
                echo 'Running integration tests on Staging...'
                bat 'curl -X GET http://staging-server/health-check'  // Example
            }
        }

        stage('Deploy to Production') {
            steps {
                echo 'Deploying to Production Server...'
                bat 'scp target/app.jar user@production-server:/deploy/'  // Example
            }
        }
    }
}