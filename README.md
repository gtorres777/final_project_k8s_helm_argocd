# Final Project

![Alt text](/kubernetes_architecture_diagram.png?raw=true "kubernetes architecture diagram")

Technologies used:
  - Kubernetes
  - Helm
  - ArgoCD
  - Cert-Manager
  - Nginx Ingress Controller
  - Prometheus and Grafana

## Description

In this project you can work in 3 different environments(dev, stage and prod), each one of these with its own configurations and images that can be tested locally with docker compose in the ```react-node-app``` folder. Each branch has its own github actions to perfom the linter, tests and build and push the new image to dockerhub and also change the tag in the ```values.yml``` file of the helm chart associated for each environment  

## Usage

In order to run this project in your kubernetes cluster, the following requeriments need to be installed:

  - **Nginx Ingress Controller** --> To autoprovision an NLB in AWS and expose the ingress objects within the EKS kubernetes cluster

    Run ```kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.1/deploy/static/provider/aws/deploy.yaml``` to install the crds and services of the Nginx Ingress Controller


  - **Metrics-server** --> To allow the implementation of horizontal pod autoscaler for the production microservice within the EKS kubernetes cluster

    Run ```kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml``` to install the metrics-server


  - **ArgoCD** --> To allow GitOps for the kubernetes infrastructure objects within the kubernetes cluster

    Run ```kubectl create namespace argocd``` to create the namespace for argocd

    Run ```kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml``` to install the crds and services of argocd

    Run ```kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d ``` to obtain the admin password to ingress the ArgoCD UI

    Run ```kubectl port-forward svc/argocd-server -n argocd 8080:443``` to portforward our localhost 8080 port to access the ArgoCD UI 

    Open [http://localhost:8080](http://localhost:8080) to view it in the browser the ArgoCD UI.


  - **Postgres Custom Client** --> To create the users and databases within the RDS PostgreSQL instance

    Run ```kubectl apply -f https://raw.githubusercontent.com/gtorres777/psql_client/main/k8s-psql.yaml``` to install a custom postgres psql client to access RDS

    Run ```kubectl exec -it name_of_psql_pod_running bash``` according to the id provided for the pod running the psql client, to execute bash and ingress the pod

    Run ```psql --host=name_of_the_endpoint_of_your_rds --port=5432 --username=postgres --password``` according to the endpoint provided for the RDS instance running, access with the psql client and create de databases and users for each environment


  - **Change values for the Route53 dns** --> To update the values for the cnames in the registered domain in Route53 with the current dns_name of the NLB running in AWS


  - **Execute the folder of apps in ArgoCD** --> To install all the applications and environments within the EKS cluster

    Within the ArgoCD UI create a new application and copy the content of the file ```final-project-app-argocd.yaml``` to create all the resources needed for the final project

