pipeline {
    agent any

    environment {
        // Docker Hub or other Docker registry details (if needed)
        DOCKER_CREDENTIALS_ID = 'jenkins-docker-hub' // Jenkins에 설정된 Docker 자격 증명 ID
    }

    stages {
        stage('Build Backend') {
            steps {
                script {
                    dir('BackEnd/AllEat') {
                        // Gradle 빌드
                        sh 'chmod +x gradlew'
                        sh './gradlew build'
                    }
                }
            }
        }
        stage('Build Backend Images') {
            steps {
                echo 'Building Backend Docker Images...'
                script {
                    // Build HappyRe Docker image
                    dir('BackEnd/AllEat') {
                        sh 'docker build -t happyjellyfish/alleat-image .'
                    }
                    // Build Fast_API Docker image
                    // dir('BackEnd/AllEat') {
                    //     sh 'docker build -t happyjellyfish/fastapi .'
                    // }
                }
            }
        }

        // stage('Build Frontend Image') {
        //     steps {
        //         echo 'Building Frontend Docker Image...'
        //         script {
        //             // Build Frontend Docker image
        //             dir('frontend') {
        //                 sh 'docker build -t happyjellyfish/frontend-image .'
        //             }

        //             dir('server'){
        //                 sh 'docker build -t happyjellyfish/webrtc-server .'
        //             }
        //         }
        //     }
        // }

        // stage('Push Docker Images') {
        //     steps {
        //         echo 'Pushing Docker Images to Registry...'
        //         script {
        //             withDockerRegistry(url: 'https://index.docker.io/v1/', credentialsId: "${env.DOCKER_CREDENTIALS_ID}") {
        //                 sh 'docker push happyjellyfish/alleat-image:latest'

        //             }
        //         }
        //     }
        // }

       stage('Cleanup Old Images') {
            steps {
                script {
                    sh '''
                    # Remove dangling images
                    docker image prune -f

                    # Remove images that start with 'happyjellyfish/' and do not have the 'latest' tag
                    docker images --filter "dangling=false" --format "{{.Repository}}:{{.Tag}}" | grep '^happyjellyfish/' | grep -v ':latest' | while read -r image; do
                        docker rmi -f "$image" || true
                    done
                    '''
                    
                }
            }
        }



        // stage('Deploy Containers') {
        //     steps {
        //         echo 'Deploying Docker Containers...'
        //         script {
        //             sh '''
        //             docker stop happyre-container
        //             docker rm happyre-container
        //             docker run -d --name happyre-container -p 8080:8080 happyre-image:latest
        //             '''
        //             sh '''
        //             docker stop frontend-container
        //             docker rm frontend-container
        //             docker run -d --name frontend-container -p 3000:3000 happyjellyfish/frontend-image:latest
        //             '''
        //         }
        //         //docker run -d --name fastapi-container -p 8000:8000 fastapi-image:latest
        //     }
        // }

        stage('Deploy using Docker Down') { 
            steps{
                echo 'Docker Compose... Down'
                sh 'docker-compose -f /home/docker-compose.yml down'
            }
        }          
        stage('Deploy using Docker Compose') { 
            steps{
                echo 'Deploying using Docker Compose...'
                sh 'docker-compose -f /home/docker-compose.yml up -d'
            }
        }  
    }

    post {
        always {
            // Clean up resources if necessary
            cleanWs()
        }
    }
}
