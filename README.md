# VirtualShowroom
Virtual Showroom for clothes entrepreneurship

----
Como probar la API? (lo hecho hasta ahora)
- Clonar el repositorio localmente
- Instalar dependencias necesarias a partir del requirements.txt (pip install -r requirements.txt)
- Configurar las variables de entorno segun el archivo env-example (crear un archivo .env en el mismo directorio dentro de la carpeta backend). Usar algun generador de SECRET KEY para la clave secreta de Django
- Ejecutar python manage.py makemigrations, y luego python manage.py migrate (esto crea la base de datos de sqlite3 para entornos de prueba)
- Ejecutar python manage.py createsuperuser para crear un usuario administrador
- Ejecutar python manage.py runserver para iniciar el servidor (por lo general se ejecuta en http://127.0.0.1:8000 (este link no funciona ya que no hay view asignada))
- Abrir en el navegador http://127.0.0.1:8000/admin e iniciar sesion con el superusuario creado.
- Comprobar que exista el model de Productos en el Admin, y crear uno o dos productos nuevos.
  
**Una vez creados y guardados los productos, se puede probar la API de la siguiente manera**
- Desde un navegador o desde Postman, con el servidor corriendo, ingresar a http://127.0.0.1:8000/api/products para obtener la lista de productos
- Desde un navegador o desde Postman, con el servidor corriendo, ingresar a http://127.0.0.1:8000/api/products/1 para obtener el detalle del producto 1 (se puede reemplazar el 1 por la PK de algun otro producto, y al API solo devolvera ese producto)
- Desde un navegador o desde Postman, con el servidor corriendo, ingresar a http://127.0.0.1:8000/api/products/?category=nombredecategoria para poder filtrar los productos por categoría.