pipeline {
    agent any
    environment {
        EMAIL_RECIPIENT = "jasmeen4783.be23@chitkara.edu.in"
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
                bat 'npm run lint'  // Example: Assuming ESLint is configured
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Performing security scan...'
                bat 'trivy fs .'  // Trivy can still be used if scanning the filesystem
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
                bat 'scp -r . user@staging-server:/deploy/'  // Modify according to your deploy structure
            }
        }

        stage('Integration Tests on Staging') {
            steps {
                echo 'Running integration tests on Staging...'
                bat 'curl -X GET http://staging-server/health-check'
            }
        }

        stage('Deploy to Production') {
            steps {
                echo 'Deploying to Production Server...'
                bat 'scp -r . user@production-server:/deploy/'  // Modify as needed
            }
        }
    }
}
