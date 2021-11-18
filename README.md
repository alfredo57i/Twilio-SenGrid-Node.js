## Servicios Twilio - SendGrid con Node.js
**Sistema de notificación por email y sms**
####

## Implementación

Instalar las dependencias.

```bash
npm install
```
Renombrar el archivo ***.env2*** a ***.env***. Y remplazar las credenciales de Twilio y SendGrid.

```bash
[default]
TWILIO_ACCOUNT_SID = 'Sid-de-twilio'
TWILIO_AUTH_TOKEN = 'token-de-twilio'
TWILIO_PHONE ='+1XXXXXXXXXXXX'
SENDGRID_API_KEY = 'API-key-sendgrid'
EMAIL_SENDGRID = 'email@verificado.com'
```

## Ejecutar el servidor

```bash
npm start
```
El servidor se ejecuta en la dirección: 

http://localhost:5000/
