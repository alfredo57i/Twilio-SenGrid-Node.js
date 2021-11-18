const express = require('express');//npm i express
const twilio = require('twilio');//npm i twilio
const sendgrid = require('@sendgrid/mail');//npm install --save @sendgrid/mail
require('dotenv').config();//npm i dotenv ==> Para correr las variables de entorno

const app = express();
const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Puerto de la aplicación
const PORT = process.env.PORT || 5000;
//Variables de entorno
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const apiSendGrid =  process.env.SENDGRID_API_KEY;
const emailSendGrid = process.env.EMAIL_SENDGRID; // Email Verificado SendGrid

//Ruta inicio
router.get('/', (req, res) => {
    res.send("<center style='color:grey;margin-top:50px;'><h1>App Servicios</h1><h2>Twilio SendGrid</h2></center>");
});

//Ruta Mensajes de texto
//Recibe por POST los parámetros (celular,mensaje)
router.post('/sms', (req, res) => {
    const client = new twilio(accountSid, authToken);
    client.messages
        .create({            
            to: '+57' + req.body.celular,
            //Variable de entorno con el número de twilio
            from: twilioPhone,
            body: req.body.mensaje,
        })
        .then((message) => {
            res.send('Mensaje enviado - SID: ' + message.sid);
        })
        .catch(err => {
            res.send('Error al enviar el mensaje: ' + err);
        });

})

//Ruta email
//Recibe por POST los parámetros (destino,asunto,mensaje)
router.post('/email', (req, res) => {
    sendgrid.setApiKey(apiSendGrid)
    const msg = {
        to: req.body.destino, 
        from: emailSendGrid,
        subject: req.body.asunto,
        html: req.body.mensaje,
    }
    sendgrid.send(msg)
        .then((response) => {
            res.send('Mensaje enviado: '+response)
        })
        .catch((err) => {
            console.error(err)
            res.send("Error al enviar el mensaje: "+err)
        })
})

//Ejecutar las rutas
app.use(router);

//Iniciar el servidor
app.listen(PORT, () => {
    console.log("Servidor iniciado http://localhost:" + PORT);
})