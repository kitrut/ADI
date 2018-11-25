export class Servicio_API{
    constructor(url){
        this.API_URL = url;
    }
    obtenerPuntos(page){
        return fetch(this.API_URL+'/api/points?limit=5&offset='+page)
            .then(function(response){
                if(response.ok)
                    return response.json();
            })
    }
    obtenerKML(){
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
    obtenerTipos(page){
        return fetch(this.API_URL+'/api/types?limit=5&offset='+page)//?limit='+limit+'&offset='+page)
            .then(function(response){
                if(response.ok)
                    return response.json();
            })
    }
    getTipo(id){
        return fetch(this.API_URL+'/api/types/'+id)
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
            return respuesta.status
        })
    }
    borrarTipo(id){
        return fetch(this.API_URL+'/api/types/'+id, {
            method: 'DELETE',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.1omsSUiynMH5b3QMpOxjwxflAWJilYvVWvzu8riGeuE"})
        }).then(function (respuesta) {
            return respuesta.status
        })
    }
    crearPunto(name,coordx,coordy,coordz,type,token){
        return fetch(this.API_URL+'/api/points', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({"name":name,"coordX":coordx,"coordY":coordy,"coordZ":coordz,"type":type,"token":token})
        }).then(function (respuesta) {
            return respuesta.status
        })
    }
    actualizaPunto(id,name,coordx,coordy,coordz,type,token){
        return fetch(this.API_URL+'/api/points/'+id, {
            method: 'PUT',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({"name":name,"coordX":coordx,"coordY":coordy,"coordZ":coordz,"type":type,"token":token})
        }).then(function (respuesta) {
            return respuesta.status
        })
    }
    login(usuario,password){
        return fetch(this.API_URL+'/login', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({"usuario":usuario,"password":password})
        }).then(function (respuesta) {
            return respuesta
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
            return respuesta
        })
    }
}