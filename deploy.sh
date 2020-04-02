TAG=0.2.4
IMAGE=ankitashrma/api-portal
# docker build process
docker build . -t api-portal
docker tag api-portal $IMAGE:$TAG
docker push $IMAGE:$TAG

