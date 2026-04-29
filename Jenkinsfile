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

        stage('building') {
            steps {
                echo "construyendo la aplicación"
            }
        }

        stage('testing') {
            steps {
                echo "Ejecutando pruebas de Cypress en el archivo ${params.SPEC} usando el navegador ${params.BROWSER}"
                sh "npx cypress run --spec cypress/e2e/${params.SPEC} --browser ${params.BROWSER}"
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
            alwaysLinkToLastBuild: false,   // 🔥 ESTE ES EL QUE FALTA
            keepAll: true,
            reportDir: 'cypress/reports',
            reportFiles: 'index.html',
            reportName: 'HTML Report'
        ])
    }

}