# reactapp-fetchapi


## Developing locally (back end API running in prod)
      Run npm install to install the dependencies.
      Run npm start to start the development server on port 3000.
      Open http://localhost:3000/ in your browser.


## Production Build (back end API running in prod)
Execute following steps sequentially to make stable npm build for productioin, create docker image, push docker image to acr and run helm chart in aks.

      npm run build 
      docker build -t reactapp-fetchapi:v2 . 
      docker tag reactapp-fetchapi:v2 devsupport.azurecr.io/reactapp-fetchapi:v2
      docker push devsupport.azurecr.io/reactapp-fetchapi:v21
      helm install -f .helm/values.yaml reactapp-fetchapi .helm
