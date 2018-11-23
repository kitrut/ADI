export class S_Usuario{
    constructor(url){
        this.API_URL = url;
    }
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