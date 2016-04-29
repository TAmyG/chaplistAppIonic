# PLUGINS CORDOVA
## phonegap-facebook-plugin
Open a terminal window and clone this repository on your computer:

 * $ git clone https://github.com/Wizcorp/phonegap-facebook-plugin.git

Using your terminal window, go to your Ionic app folder
If you want to build your app for iOS execute: ionic platform add ios
If you want to build your app for Android execute: ionic platform add android
Execute the following command on the terminal changing the variables with your own values:
The path you cloned the plugin to earlier
Replace APP_ID and APP_NAME variables with your Facebook app values

 * $ cordova -d plugin add phonegap-facebook-plugin --variable APP_ID="439513662912425" --variable APP_NAME="social_movil"
 
 [Tutorial de Referencia](https://ionicthemes.com/tutorials/about/native-facebook-login-with-ionic-framework)
 
## ionic-plugin-keyboard
Plugin para una fácil interacción con el teclado. [link](https://github.com/driftyco/ionic-plugin-keyboard)

 * $ cordova plugin add ionic-plugin-keyboard
 
## cordova-network-information
Provee información sobre la conexión a internet que posee el dispositivo.

 * $ cordova plugin add cordova-plugin-network-information


## cordova-plugin-geolocation
Plugin que permite obtener la posición mediante el gps del dispositivo mediante la longitud y latitud.

 * $ cordova plugin add cordova-plugin-geolocation


## cordova-plugin-device
Provee información del dispositivo como su modelo, uuid, etc.

 * $ cordova plugin add cordova-plugin-device
 
## cordova-plugin-whitelist
Permite definir una lista de sitios por los que es seguro navegar, de lo contrario lanza una excepción de seguridad

 * $ cordova plugin add cordova-plugin-whitelist

## cordova-plugin-statusbar
Permite manipular la barra de estado del smartphone

 * $ cordova plugin add cordova-plugin-statusbar
 
## SocialSharing-PhoneGap-Plugin 
 permite compartir por cualquier via
 
 * cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
 
## email-compose
 permite acceder a la app de correos del smartphone
 
 * cordova plugin add https://github.com/jcjee/email-composer.git
 
## cordova-plugin-inappbrowser
 permite acceder al navegador del smartphone
 
 * ionic plugin add cordova-plugin-inappbrowser
 
## cordova-plugin-splashscreen
 permite mostrar pantalla splash al arrancar la app
 
 * cordova plugin add cordova-plugin-splashscreen
## ng storage
Almacenamiento local especial para AngularJS

* $ bower install ngstorage

# IONMATERIAL
 * $ bower install ionic-material
 * $ bower install ion-md-input 
 * $ bower install robotodraft 
 
 [Ion Material](https://github.com/zachsoft/Ionic-Material)
 
 

# INFO. ADICIONAL

### ERROR SH1 GOOGLE ANDROID

Generar una nueva debug.keystore
$ keytool -genkey -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android -keyalg RSA -validity 14000

mover a /root/.android/  (eliminar la que ya existe)

ejecutar para ver el certificado, tener encuenta el alias y el correo con el que se creo anteriormente
$ keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore -list -v
