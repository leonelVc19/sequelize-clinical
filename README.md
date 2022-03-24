
Esta api de practica es realziada por juan leonel

Proyecto backend con nodejs, sequelize y mysql.

env vars
APP_PORT=(puerto de escucha.)
#Para las credenciales..
#crear documento .env para las variables de entorno. 
TOKEN_SECRET=tu_token_random

DB_USER_NAME=your_user
DB_USER_PWD=your_password
DB_NAME=your_database
DB_HOST=your_port

#Variables para que se envie el correo al usuario y asi lo recupere
SERVIDOR_SMTP=your_smtp_service
USUARIO_SMTP=your_email
PASSWORD_SMTP=your_password

#Para iniciar.

npm install

npm install -g nodemon

Conectar con la base de datos
Ya con la conexión, ejecutar estos dos comandos para 
crear la base de datos y las migraciones.

npx sequelize-cli db:create

npx sequelize-cli db:migrate

Para iniciar el server.

npm run dev

Listo.