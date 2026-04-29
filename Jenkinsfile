pipeline {
    agent {
        docker {
            image 'cypress/included:13.6.0'
        }
    }

    parameters {
        string(name: 'SPEC', defaultValue: 'acceso-a-index.cy.js', description: 'Especifica el archivo de prueba de Cypress a ejecutar')
        choice(name: 'BROWSER', choices: ['chrome', 'firefox'], description: 'Selecciona el navegador para ejecutar las pruebas')
    }

    options {
        ansiColor('xterm')
    }

    stages {
        stage('Test') {
            steps {
                sh "npm install"
                sh "npx cypress run --spec cypress/e2e/${params.SPEC} --browser ${params.BROWSER}"
            }
        }
    }

    post {
        always {
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: false, 
                keepAll: true,
                reportDir: 'cypress/reports',
                reportFiles: 'index.html',
                reportName: 'HTML Report'
            ])
        }
    }
}