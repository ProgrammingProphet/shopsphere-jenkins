pipeline {
    agent any

    // environment {
    //     DOCKER_USERNAME = credentials('docker-creds').username
    //     DOCKER_PASSWORD = credentials('docker-creds').password
    //     IMAGE_TAG = "v1.0.${BUILD_NUMBER}"
    // }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ProgrammingProphet/shopsphere-jenkins.git'
            }
        }

        // stage('Detect Changes') {
        //     steps {
        //         script {
        //             def changedFiles = sh(
        //                 script: "git diff --name-only HEAD~1 HEAD",
        //                 returnStdout: true
        //             ).trim()

        //             env.USER_CHANGED = changedFiles.contains('user-service') ? 'true' : 'false'
        //             env.PRODUCT_CHANGED = changedFiles.contains('product-service') ? 'true' : 'false'
        //             env.ORDER_CHANGED = changedFiles.contains('order-service') ? 'true' : 'false'
        //             env.FRONTEND_CHANGED = changedFiles.contains('frontend') ? 'true' : 'false'
        //         }
        //     }
        // }

        // stage('Docker Login') {
        //     steps {
        //         sh '''
        //         echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
        //         '''
        //     }
        // }
        // stage('Docker Login') {
        //     steps {
        //         withCredentials([usernamePassword(
        //             credentialsId: 'docker-creds',
        //             usernameVariable: 'DOCKER_USER',
        //             passwordVariable: 'DOCKER_PASS'
        //     )]) {
        //         sh '''
        //         echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
        //         '''
        //         }
        //     }
        // }

        // stage('Build & Push') {
        //     parallel {

        //         stage('User Service') {
        //             when { expression { env.USER_CHANGED == 'true' } }
        //             steps {
        //                 sh '''
        //                 docker build -t $DOCKER_USERNAME/shopsphere-user:latest ./user-service
        //                 docker tag $DOCKER_USERNAME/shopsphere-user:latest $DOCKER_USERNAME/shopsphere-user:$IMAGE_TAG
        //                 docker push $DOCKER_USERNAME/shopsphere-user:latest
        //                 docker push $DOCKER_USERNAME/shopsphere-user:$IMAGE_TAG
        //                 '''
        //             }
        //         }

        //         stage('Product Service') {
        //             when { expression { env.PRODUCT_CHANGED == 'true' } }
        //             steps {
        //                 sh '''
        //                 docker build -t $DOCKER_USERNAME/shopsphere-product:latest ./product-service
        //                 docker tag $DOCKER_USERNAME/shopsphere-product:latest $DOCKER_USERNAME/shopsphere-product:$IMAGE_TAG
        //                 docker push $DOCKER_USERNAME/shopsphere-product:latest
        //                 docker push $DOCKER_USERNAME/shopsphere-product:$IMAGE_TAG
        //                 '''
        //             }
        //         }

        //         stage('Order Service') {
        //             when { expression { env.ORDER_CHANGED == 'true' } }
        //             steps {
        //                 sh '''
        //                 docker build -t $DOCKER_USERNAME/shopsphere-order:latest ./order-service
        //                 docker tag $DOCKER_USERNAME/shopsphere-order:latest $DOCKER_USERNAME/shopsphere-order:$IMAGE_TAG
        //                 docker push $DOCKER_USERNAME/shopsphere-order:latest
        //                 docker push $DOCKER_USERNAME/shopsphere-order:$IMAGE_TAG
        //                 '''
        //             }
        //         }

        //         stage('Frontend') {
        //             when { expression { env.FRONTEND_CHANGED == 'true' } }
        //             steps {
        //                 sh '''
        //                 docker build -t $DOCKER_USERNAME/shopsphere-frontend:latest ./frontend
        //                 docker tag $DOCKER_USERNAME/shopsphere-frontend:latest $DOCKER_USERNAME/shopsphere-frontend:$IMAGE_TAG
        //                 docker push $DOCKER_USERNAME/shopsphere-frontend:latest
        //                 docker push $DOCKER_USERNAME/shopsphere-frontend:$IMAGE_TAG
        //                 '''
        //             }
        //         }
        //     }
        // }

        stage('Deploy') {
            steps {
                sshagent(['server-ssh-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@141.148.213.176 << EOF
                        cd ~/DevOps/shopsphere-jenkins

                        echo "Stopping old containers..."
                        docker-compose down

                        echo "Pulling latest images..."
                        docker-compose pull

                        echo "Starting containers..."
                        docker-compose up -d

                        echo "Restart gateway..."
                        docker-compose up -d --no-deps nginx-gateway
                    EOF
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                 script {
                    retry(5) {
                        sleep(10)
                        sh 'curl -f http://141.148.213.176/users/actuator/health'
                    }
                    retry(5) {
                        sleep(10)
                        sh 'curl -f http://141.148.213.176/products/actuator/health'
                    }
                    retry(5) {
                        sleep(10)
                        sh 'curl -f http://141.148.213.176/orders/actuator/health'
                    }

                    echo "All services are UP"
                }
            }
        }
    }
}