pipeline {
    agent any

    parameters {
        string(name: 'SPEC', defaultValue: 'acceso-a-index.cy.js', description: 'Especifica el archivo de prueba de Cypress a ejecutar')
        choice(name: 'BROWSER', choices: ['chrome', 'firefox'], description: 'Selecciona el navegador para ejecutar las pruebas')
    }

    options {
        ansiColor('xterm')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('testing') {
            steps {
                echo "Ejecutando pruebas de Cypress en ${params.SPEC} usando ${params.BROWSER}"

                script {
                    docker.image('cypress/included:13.7.0').inside('--entrypoint=""') {
                        sh """
                        npm install
                        npx cypress run --spec cypress/e2e/${params.SPEC} --browser ${params.BROWSER}
                        """
                    }
                }
            }
        }

        stage('deploying') {
            steps {
                echo "desplegando la aplicación"
            }
        }
    }

    post {
        always {
            publishHTML([
                allowMissing: true,
                keepAll: true,
                alwaysLinkToLastBuild: true,
                reportDir: 'cypress/reports',
                reportFiles: 'index.html',
                reportName: 'HTML Report'
            ])
        }
    }
}