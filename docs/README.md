# Reto 6: Base de datos no relacionales para almacenar datos en JSON
Este repositorio contiene el Reto 6, donde se describen los diferentes `endpoints` solicitados en cada Ciclo. Además, se estructuró de la siguiente manera: 

## Ciclo ID 1
Contiene el **backup** de la base de datos, colecciones e índices en el directorio `data`. Los archivos son los siguientes: 
1. La base de datos `sample_restaurants.json`, proveniente de la documentación oficial de [MongoDB](https://www.mongodb.com/docs/atlas/sample-data/sample-restaurants/), contiene la colección `restaurants`.
2. Los índices de la colección `restaurants` en el archivo `restaurants_indexes.json`.

## Ciclo ID 2
Este ciclo se centra en el desarrollo de una CRUD con API REST para manipular la información de los restaurantes. Además, se agregaron dos `enpoint` para agregar comentarios y calificar a los restaurantes. Los `endpoint` son los siguientes:

- `GET /api/restaurants`: Recupera la información de todos los restaurantes.
- `POST /api/restaurants`: Crea un nuevo restaurante.
- `PUT /api/restaurants/restaurant_id`: Actualiza la información de un restaurante a través de su ID.
- `DELETE /api/restaurants/restaurant_id`: Elimina un restaurante a través de su ID.

### Endpoints para Comentarios
- `GET /api/restaurants/comments`: Obtiene todos los comentarios de los restaurantes. 
- 