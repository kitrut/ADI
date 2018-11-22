export class Servicio_API{
    constructor(url){
        this.API_URL = url;
    }
    obtenerPuntos(){
        return fetch(this.API_URL+'/api/points')
            .then(function(response){
                if(response.ok)
                    return response.json();
            })
    }
    getPunto(id){
        return fetch(this.API_URL+'/api/points/'+id)
            .then(function(response){
                if(response.ok)
                    return response.json();
            })
    }
    obtenerTipos(){
        return fetch(this.API_URL+'/api/types')
            .then(function(response){
                if(response.ok)
                    return response.json();
            })
    }
    borrarPunto(id){
        return fetch(this.API_URL+'/api/points/'+id, {
            method: 'DELETE',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.1omsSUiynMH5b3QMpOxjwxflAWJilYvVWvzu8riGeuE"})
        }).then(function (respuesta) {
            if (respuesta.ok)
               return respuesta.json()
        })
    }
    crearPunto(item){
        return fetch(this.API_URL+'/api/points', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({"name":"Punto nuevo","coordX":"1","coordY":"2","coordZ":"3","type":"2","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.1omsSUiynMH5b3QMpOxjwxflAWJilYvVWvzu8riGeuE"})
        }).then(function (respuesta) {
            if (respuesta.ok)
               return respuesta.json()
        })
    }
}