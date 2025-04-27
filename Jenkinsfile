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
                bat 'npm install'
            }
        }

        stage('Unit and Integration Tests') {
            steps {
                script {
                    echo 'Running unit and integration tests...'
                    try {
                        bat 'npm test'
                    } catch (err) {
                        error "Unit and Integration Tests failed: ${err}"
                    }
                }
            }
            post {
                success {
                    script {
                        def logContent = getSafeLogs()
                        mail(
                            to: "${EMAIL_RECIPIENT}",
                            subject: "✅ Unit & Integration Tests Passed - ${currentBuild.fullDisplayName}",
                            body: "Tests passed successfully.\n\nLogs:\n${logContent}"
                        )
                    }
                }
                failure {
                    script {
                        def logContent = getSafeLogs()
                        mail(
                            to: "${EMAIL_RECIPIENT}",
                            subject: "❌ Unit & Integration Tests Failed - ${currentBuild.fullDisplayName}",
                            body: "Tests failed.\n\nLogs:\n${logContent}"
                        )
                    }
                }
            }
        }

        stage('Code Analysis') {
            steps {
                echo 'Analyzing code using ESLint...'
                bat 'npm run lint'
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Performing security scan using npm audit...'
                bat 'npm audit'
            }
            post {
                always {
                    script {
                        def logContent = getSafeLogs()
                        mail(
                            to: "${EMAIL_RECIPIENT}",
                            subject: "🔒 Security Scan Result - ${currentBuild.fullDisplayName}",
                            body: "Security scan completed.\n\nLogs:\n${logContent}"
                        )
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo "Deploying to Staging Server: ${STAGING_SERVER}"
                bat 'npm run deploy:staging'
            }
        }

        stage('Integration Tests on Staging') {
            steps {
                echo 'Running integration tests on Staging using Cypress...'
                bat 'npx cypress run --env staging'
            }
        }

        stage('Deploy to Production') {
            steps {
                echo "Deploying to Production Server: ${PROD_SERVER}"
                bat 'npm run deploy:production'
            }
        }
    }

    post {
        success {
            script {
                def logContent = getSafeLogs()
                mail(
                    to: "${EMAIL_RECIPIENT}",
                    subject: "✅ Pipeline Succeeded - ${currentBuild.fullDisplayName}",
                    body: "All stages completed successfully.\n\nLogs:\n${logContent}"
                )
            }
        }
        failure {
            script {
                def logContent = getSafeLogs()
                mail(
                    to: "${EMAIL_RECIPIENT}",
                    subject: "❌ Pipeline Failed - ${currentBuild.fullDisplayName}",
                    body: "Some stages failed.\n\nLogs:\n${logContent}"
                )
            }
        }
    }
}

def getSafeLogs() {
    def logs = ''
    try {
        logs = currentBuild.rawBuild.getLog(100).join("\n")
    } catch (e) {
        logs = "Could not fetch logs: ${e.message}"
    }
    return logs
}
