docker build -t sanjyoth/multi-client:latest -t sanjyoth/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t sanjyoth/multi-server:latest -t sanjyoth/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t sanjyoth/multi-worker:latest -t sanjyoth/multi-worker:$SHA -f ./worker/Dockerfile ./worker
docker push sanjyoth/multi-client:latest
docker push sanjyoth/multi-server:latest
docker push sanjyoth/multi-worker:latest
docker push sanjyoth/multi-client:$SHA
docker push sanjyoth/multi-server:$SHA
docker push sanjyoth/multi-worker:$SHA
kubectl apply -f k8s
kubectl set image deployments/server-deployment server=sanjyoth/multi-server:$SHA
kubectl set image deployments/worker-deployment worker=sanjyoth/multi-worker:$SHA
kubectl set image deployments/client-deployment client=sanjyoth/multi-client:$SHA
