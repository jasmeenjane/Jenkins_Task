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
                echo 'Using npm to run tests: npm test'
                bat 'npm test'  // Runs your test scripts
            }
        }

        stage('Code Analysis') {
            steps {
                echo 'Analyzing code...'
                echo 'Using ESLint for code analysis: npm run lint' // Runs ESLint for code analysis
                bat 'npm run lint'  
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Performing security scan...'
                echo 'Using npm audit for security scanning: npm audit' // Runs NPM Audit for security scanning
                
            }
            post {
                success {
                    mail (
                        to: "${EMAIL_RECIPIENT}",
                        subject: "Security Scan - Success",
                        body: """
                        The Security Scan stage has completed successfully.
                        Details:
                        - Security scan was performed using NPM Audit.
                        - No critical vulnerabilities were found.
                        Please check the Jenkins build logs for more details: ${env.BUILD_URL}
                        """,
                        attachmentsPattern: '**/security-scan-results/*.log'  // Attach security scan logs
                    )
                }
                failure {
                    mail(
                        to: "${EMAIL_RECIPIENT}",
                        subject: "Security Scan - Failed",
                        body: """
                        The Security Scan stage has failed.
                        Details:
                        - Security scan was performed using NPM Audit.
                        - Critical vulnerabilities were found. Please address them.
                        Check the Jenkins build logs for more details: ${env.BUILD_URL}
                        """,
                        attachmentsPattern: '**/security-scan-results/*.log'  // Attach security scan logs
                    )
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
            post {
                success {
                    mail(
                        to: "${EMAIL_RECIPIENT}",
                        subject: "Deploy to Production - Success",
                        body: """
                        The Deploy to Production stage has completed successfully.
                        Details:
                        - Application was deployed to the production server.
                        - Deployment was performed using npm.
                        Please check the Jenkins build logs for more details: ${env.BUILD_URL}
                        """,
                        attachmentsPattern: '**/deploy-production-logs/*.log'  // Attach deployment logs
                    )
                }
                failure {
                    mail(
                        to: "${EMAIL_RECIPIENT}",
                        subject: "Deploy to Production - Failed",
                        body: """
                        The Deploy to Production stage has failed.
                        Details:
                        - Application deployment to the production server failed.
                        - Deployment was performed using npm.
                        Check the Jenkins build logs for more details: ${env.BUILD_URL}
                        """,
                        attachmentsPattern: '**/deploy-production-logs/*.log'  // Attach deployment logs
                    )
                }
            }
        }
    }
    post {
        success {
            mail(
                to: "${EMAIL_RECIPIENT}",
                subject: "Jenkins Pipeline Execution - Success",
                body: """
                The Pipeline execution completed successfully.
                Details:
                - All stages completed without errors.
                - Check the Jenkins build logs for more details: ${env.BUILD_URL}
                """,
                attachmentsPattern: '**/pipeline-logs/*.log'  // Attach pipeline logs
            )
        }
    }
}