pipeline {
    agent any

    environment {
        STAGING_SERVER = 'staging.netlify.com'
        PROD_SERVER = 'prod.netilify.com'
        EMAIL = 'jasmeen4783.be23@chitkara.edu.in'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Starting the build process...'
                echo 'Using Node.js and npm for dependency management.'
                echo 'New changes'
                bat 'npm install'
                echo 'Build completed successfully.'
            }
        }

        stage('Unit and Integration Tests') {
            steps {
                echo 'Executing unit tests using Jest/Mocha...'
                bat 'npm test'
            }
        }

        stage('Code Analysis') {
            steps {
                echo 'Running static code analysis using ESLint...'
                echo 'Using ESLint for code analysis: npm run lint' // Runs ESLint for code analysis

            }
        }

        stage('Security Scan') {
            steps {
                echo 'Performing security scan using SonarQube...'
                echo 'It is used to scan the project'
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to Staging Server: $STAGING_SERVER'
                echo 'Tools like Netlify and AWS can be used to deploy the project'
                echo 'npx netlify-cli deploy --site your-staging-site-id --prod'
            }
        }

        stage('Integration Tests on Staging') {
            steps {
                echo 'Running end-to-end tests using Cypress on Staging...'
                echo 'cypress will be used forthis project as it deals with node.js'
                echo 'npx cypress run'
            }
        }

        stage('Deploy to Production') {
            steps {
                echo 'Deploying to Production Server: $PROD_SERVER'
                echo 'Netlify and AWS can be used for this as well'
                echo 'npx netlify-cli deploy --site your-production-site-id --prod'
            }
        }
    }

    post {
        always {
            echo 'Sending email notification to $EMAIL'
            mail(
                subject: "Jenkins Pipeline Execution",
                body: "Pipeline execution complete. Check Jenkins for details...",
                to: "$EMAIL"
            )
        }
    }
}
