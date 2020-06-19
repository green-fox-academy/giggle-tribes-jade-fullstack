pipeline {
  agent {
    docker {
      image 'node:alpine'
    }
  }
  environment {
    AWS_CREDENTIALS = 'ikarasz-aws'
    S3_BUCKET = 'basic-react-project'
    S3_REGION = 'eu-central-1'
  }
  stages {
    stage('install dependencies') {
      steps {
        sh 'yarn install'
      }
    }
    stage('lint') {
      steps {
        sh 'yarn lint'
      }
    }
    stage('unit testing') {
      steps {
        sh 'yarn test:ci'
      }
      post {
        always {
          junit 'output/test-results/**/*.xml'
          publishHTML target: [
            allowMissing         : false,
            alwaysLinkToLastBuild: false,
            keepAll              : true,
            reportDir            : 'output/coverage/lcov-report',
            reportFiles          : 'index.html',
            reportName           : 'Coverage report'
          ]
        }
      }
    }
    stage('deploy') {
      when {
        branch 'master'
      }
      steps {
        sh 'yarn build'
        withAWS(region: env.S3_REGION, credentials: env.AWS_CREDENTIALS) {
            s3Upload(
              file: 'dist/',
              bucket: env.S3_BUCKET,
              path: '',
            )
        }
      }
    }
  }
  post {
    always {
      cleanWs()
    }
  }
}
