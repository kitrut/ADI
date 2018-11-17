export class Servicio_API{
    constructor(url){
        this.API_URL = url;
    }
    obtenerPuntos(){
        return fetch(this.API_URL)
            .then(function(response){
                if(response.ok)
                    return response.json();
            })
    }
}