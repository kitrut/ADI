/**
 * Clase encargada del login y registro en el servidor
 */
export class S_Usuario{
    /**
     * Constructor
     * @param {*} url Enlace de conexion al servidor 
     */
    constructor(url){
        this.API_URL = url;
    }
    /**
     * Comprueba si el usuario esta en la base de datos
     * @param {*} usuario user
     * @param {*} password pass
     */
    login(usuario,password){
        return fetch(this.API_URL+'/login', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({"usuario":usuario,"password":password})
        }).then(function (respuesta) {
            if (respuesta.ok)
                return respuesta.json()
        })
    }
    /**
     * Crea un nuevo usuario
     * @param {*} usuario user
     * @param {*} password pass
     */
    registro(usuario,password){
        return fetch(this.API_URL+'/registro', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({"usuario":usuario,"password":password})
        }).then(function (respuesta) {
            if (respuesta.ok)
                return respuesta.json()
        })
    }
}