# coder

Para utilizar el servicio web primero debes configurar el archivo .env dentro de la carpeta backend (para el caso de mongo)

Para cualquier servidor para ingresar productos al carrito solo hara falta pasarle el id del producto

Para mongo local utilizar la variable MONGOURI

Y ejecutar:
```sh
npm run startmongolocal
```
Para mongo cloud utilizar la variable MONGOCLOUD
```sh
npm run startmongocloud
```
Para firebase
```sh
npm run startfirebase
```

Para mysql ejectuar primero los siguientes comandos para crear las tablas necesarias
```sh
npm run createtables
```
```sh
npm run createtables1
```
Y ejecutar para levantar el servidor:
```sh
npm run startmysql
```
Nota: para el caso de mongo y firebase se puede insertar el producto con el carrito de una vez, en una propiedad 
- Ejemplo para mongo:
>{
>
>  "products": [
>  
>    "_id": "---id producto---"
>    
>  ]
>  
>}

- Ejemplo para firebase:
>{
>
>  products: [
>  
>    "id": "---id producto---"
>    
>    ]
>  
>}

En ambos casos se puede pasar un products vacio:

>{
>
>  "products": []
>
>}

En el caso de mysql se debe crear primero el carrito.

NOTA: para el frontend solo esta habilitado para trabajar con mysql y debe haber un carrito con id 1 para su correcto funcionamiento
