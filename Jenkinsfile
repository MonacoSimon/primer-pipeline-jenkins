pipeline {
    agent {
        docker {
            image 'cypress/included:13.6.0'
        }
    }

    parameters {
        string(name: 'SPEC', defaultValue: 'acceso-a-index.cy.js', description: 'Archivo de Cypress')
        choice(name: 'BROWSER', choices: ['chrome', 'firefox'], description: 'Navegador')
    }

    stages {

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh "npx cypress run --spec cypress/e2e/${params.SPEC} --browser ${params.BROWSER}"
            }
        }
    }

    post {
        always {
            publishHTML([
                allowMissing: true,                 // 👈 clave para que no rompa
                alwaysLinkToLastBuild: false,       // 👈 obligatorio del plugin
                keepAll: true,
                reportDir: 'cypress/reports',
                reportFiles: 'index.html',
                reportName: 'HTML Report'
            ])
        }
    }
}