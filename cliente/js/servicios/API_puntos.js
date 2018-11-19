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
}