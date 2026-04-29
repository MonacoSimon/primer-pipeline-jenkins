// pipeline {
//     agent any

//     parameters {
//         string(name: 'SPEC', defaultValue: 'acceso-a-index.cy.js', description: 'Especifica el archivo de prueba de Cypress a ejecutar')
//         choice(name: 'BROWSER', choices: ['chrome', 'firefox'], description: 'Selecciona el navegador para ejecutar las pruebas')
//     }

//     options {
//         ansiColor('xterm')
//     }

//     stages {
//         stage('instalacion'){
//             steps{
//                 echo "instalando dependencias"
//                 sh 'npm install'
//             }
//         }

//         stage('building') {
//             steps {
//                 echo "construyendo la aplicación"
//             }
//         }

//         stage('testing') {
//             steps {
//                 echo "Ejecutando pruebas de Cypress en el archivo ${params.SPEC} usando el navegador ${params.BROWSER}"
//                 sh "npx cypress run --spec cypress/e2e/${params.SPEC} --browser ${params.BROWSER}"
//             }
//         }

//         stage('deploying') {
//             steps {
//                 echo "desplegando la aplicación"
//             }
//         }
//     }

//     post {
//         always {
//             publishHTML([
//                 allowMissing: true,
//                 keepAll: true,
//                 alwaysLinkToLastBuild: true,
//                 reportDir: 'cypress/reports',
//                 reportFiles: 'index.html',
//                 reportName: 'HTML Report'
//             ])
//         }
//     }
// }
pipeline {
    agent any

    parameters {
        string(name: 'SPEC', defaultValue: 'acceso-a-index.cy.js', description: 'Archivo de prueba')
        choice(name: 'BROWSER', choices: ['chrome', 'firefox'], description: 'Navegador')
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

        stage('Testing (Docker Cypress)') {
            steps {
                script {
                    docker.image('cypress/included:13.7.0').inside {
                        sh '''
                        npm install
                        npx cypress run \
                        --spec cypress/e2e/${SPEC} \
                        --browser ${BROWSER}
                        '''
                    }
                }
            }
        }

        stage('Deploying') {
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