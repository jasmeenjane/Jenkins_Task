pipeline {
    agent any
    environment {
        EMAIL_RECIPIENT = "jasmeen4783.be23@chitkara.edu.in"
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'mvn clean package'  // Example for Java using Maven
            }
        }

        stage('Unit and Integration Tests') {
            steps {
                echo 'Running unit and integration tests...'
                sh 'mvn test'  // Example for Java
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
                sh 'sonar-scanner'  // Example using SonarQube
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Performing security scan...'
                sh 'trivy fs .'  // Example using Trivy for security scanning
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
                sh 'scp target/app.jar user@staging-server:/deploy/'  // Example
            }
        }

        stage('Integration Tests on Staging') {
            steps {
                echo 'Running integration tests on Staging...'
                sh 'curl -X GET http://staging-server/health-check'  // Example
            }
        }

        stage('Deploy to Production') {
            steps {
                echo 'Deploying to Production Server...'
                sh 'scp target/app.jar user@production-server:/deploy/'  // Example
            }
        }
    }
}