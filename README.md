# coder
En el pdf se puede visualizar el informe del performance solicitado

para utilizar el servicio web primero debes configurar el archivo .env (MONGOURI), (SECRET)

Si se quiere utilizar el login con facebook usar la variables: (FACEBOOK_ID), (FACEBOOK_SECRET)

y descomentar en el archivo server.js solamente el Strategy de facebook (lineas 89:103)
 
Para ejecutar modo fork en pm2:

```sh
pm2 start ./src/server.js --name="cluster" -- -p 8080
```

Para ejecutar modo cluster nativo:

```sh
node start ./src/server.js -p 8081 CLUSTER
```

Para ejecurtar modo Cluster en pm2:

```sh
pm2 start ./src/server.js --name="cluster" -- -p 8082 CLUSTER
```
```sh
pm2 start ./src/server.js --name="cluster" -- -p 8083 CLUSTER
```
```sh
pm2 start ./src/server.js --name="cluster" -- -p 8084 CLUSTER
```
```sh
pm2 start ./src/server.js --name="cluster" -- -p 8085 CLUSTER
```

NOTA: ya hay productos en la DB sqlite, 

aun asi, para reiniciar la DB de los productos ejecutar: 
```sh
npm run productos
```
