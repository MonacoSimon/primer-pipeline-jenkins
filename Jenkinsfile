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
            stage('Setup') {
                steps {
                    sh '''
                        if ! command -v node &> /dev/null; then
                            curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
                            apt-get install -y nodejs
                        fi
                    '''
                }
        }
        
        stage('Test') {
            steps {
                sh '''
                    npm install
                    npx cypress run --spec "cypress/e2e/${SPEC}" --browser ${BROWSER} --headless
                '''
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