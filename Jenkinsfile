pipeline {
    agent any
    environment {
        EMAIL_RECIPIENT = "jasmeen4783.be23@chitkara.edu.in"
        STAGING_SERVER = 'staging.example.com'
        PROD_SERVER = 'prod.example.com'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                bat 'npm install'  // Installs dependencies
            }
        }

        stage('Unit and Integration Tests') {
            steps {
                echo 'Running unit and integration tests...'
                bat 'npm test'  // Runs your test scripts
            }
            post {
                always {
                    script {
                        def logContent = currentBuild.rawBuild.getLog(100).join("\n")
                        mail(
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
                // Add code analysis tools here, e.g., SonarQube
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Performing security scan...'
                // Add security scan tools here, e.g., OWASP ZAP
            }
            post {
                always {
                    script {
                        def logContent = currentBuild.rawBuild.getLog(100).join("\n")
                        mail(
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
                // Add deployment script for staging server
            }
        }

        stage('Integration Tests on Staging') {
            steps {
                echo 'Running integration tests on Staging...'
                // Add integration test scripts for staging
            }
        }

        stage('Deploy to Production') {
            steps {
                echo 'Deploying to Production Server...'
                // Add deployment script for production server
            }
        }
    }
    post {
        always {
            mail (to: "${EMAIL_RECIPIENT}",
                subject: "Jenkins Pipeline Execution",
                body: "Pipeline execution complete. Check Jenkins for details."
            )
        }
    }
}