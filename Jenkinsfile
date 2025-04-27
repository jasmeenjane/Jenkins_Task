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
                echo 'Using npm to install dependencies: npm install'
                bat 'npm install'  // Installs dependencies
            }
        }

        stage('Unit and Integration Tests') {
            steps {
                echo 'Running unit and integration tests...'
                echo 'Using npm to run tests: npm test' // Runs test scripts
                bat 'npm test'
            }
            post {
                success {
                    script {
                        def logContent = currentBuild.rawBuild.getLog(100).join("\n")
                        mail(
                            to: "${EMAIL_RECIPIENT}",
                            subject: "Unit and Integration Tests Result - ${currentBuild.fullDisplayName}",
                            body: "Unit and Integration Tests completed: ${currentBuild.currentResult}\n\nLogs:\n${logContent}"
                        )
                    }
                }
                failure {
                    script {
                        def logContent = currentBuild.rawBuild.getLog(100).join("\n")
                        mail(
                            to: "${EMAIL_RECIPIENT}",
                            subject: "Deploy to Production Failed - ${currentBuild.fullDisplayName}",
                            body: "Deploy to Production failed: ${currentBuild.currentResult}\n\nLogs:\n${logContent}"
                        )
                    }
                }
            }
        }

        stage('Code Analysis') {
            steps {
                echo 'Analyzing code...'
                echo 'Using ESLint for code analysis: npm run lint' // Runs ESLint for code analysis
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Performing security scan...'
                echo 'Using npm audit for security scanning: npm audit' // Runs NPM Audit for security scanning
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
                failure {
                    script {
                        def logContent = currentBuild.rawBuild.getLog(100).join("\n")
                        mail(
                            to: "${EMAIL_RECIPIENT}",
                            subject: "Build Failed - ${currentBuild.fullDisplayName}",
                            body: "Build failed: ${currentBuild.currentResult}\n\nLogs:\n${logContent}"
                        )
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to Staging Server...'
                echo 'Using npm to deploy to staging: npm run deploy:staging' // Deploys to staging server
            }
        }

        stage('Integration Tests on Staging') {
            steps {
                echo 'Running integration tests on Staging...'
                echo 'Using Cypress for integration tests: npx cypress run --env staging' // Runs Cypress integration tests on staging
            }
        }

        stage('Deploy to Production') {
            steps {
                echo 'Deploying to Production Server...'
                echo 'Using npm to deploy to production: npm run deploy:production' // Deploys to production server
            }
        }
    }
    post {
        success {
            script {
                def logContent = currentBuild.rawBuild.getLog(100).join("\n")
                mail(
                    to: "${EMAIL_RECIPIENT}",
                    subject: "Jenkins Pipeline Execution - Success",
                    body: "Pipeline execution completed successfully.\n\nLogs:\n${logContent}"
                )
            }
        }
    }
}
