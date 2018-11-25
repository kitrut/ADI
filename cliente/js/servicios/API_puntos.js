/**
 * Clase encargada de la comunicación con el servidor para los CRUD de point y type
 */
export class Servicio_API{
    /** Constructor */
    constructor(url){
        this.API_URL = url;
    }
    /**
     * Obtiene los puntos de la base de datos paginados de 5 en 5
     * @param {*} page Pagina a la que deseas ir
     */
    obtenerPuntos(page){
        return fetch(this.API_URL+'/api/points?limit=5&offset='+page)
            .then(function(response){
                if(response.ok)
                    return response.json();
            })
    }
    /**
     * Obtiene todos los puntos de la base de datos para dibujarlos en el mapa usando el formato kml
     */
    obtenerKML(){
        return fetch(this.API_URL+'/api/points')
            .then(function(response){
                if(response.ok)
                    return response.json();
            })
    }
    /**
     * Obtiene la información de un único punto
     * @param {*} id ID del punto a buscar
     */
    getPunto(id){
        return fetch(this.API_URL+'/api/points/'+id)
            .then(function(response){
                if(response.ok)
                    return response.json();
            })
    }
    /**
     * Obtiene un subconjunto de tipos de la base de datos paginados de 5 en 5
     * @param {*} page Número de página que deseas ver
     */
    obtenerTipos(page){
        return fetch(this.API_URL+'/api/types?limit=5&offset='+page)//?limit='+limit+'&offset='+page)
            .then(function(response){
                if(response.ok)
                    return response.json();
            })
    }
    /**
     * Obtiene los detalles de un tipo en concreto
     * @param {*} id ID del tipo buscado
     */
    getTipo(id){
        return fetch(this.API_URL+'/api/types/'+id)
            .then(function(response){
                if(response.ok)
                    return response.json();
            })
    }
    /**
     * Borra un punto de la base de datos
     * @param {*} id ID que deseamos borrar
     */
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
    /**
     * Borra un tipo de la base de datos
     * @param {*} id Id que deseamos borrar
     */
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
    /**
     * Crea un nuevo punto en la base de datos
     * @param {*} name nombre del punto
     * @param {*} coordx  coordenada X
     * @param {*} coordy  coordenada Y
     * @param {*} coordz  coordenada Z
     * @param {*} type  ID del tipo de punto
     * @param {*} token token del usuario registrado
     */
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
    /**
     * Actualiza un nuevo punto en la base de datos
     * @param {*} name nombre del punto
     * @param {*} coordx  coordenada X
     * @param {*} coordy  coordenada Y
     * @param {*} coordz  coordenada Z
     * @param {*} type  ID del tipo de punto
     * @param {*} token token del usuario registrado
     */
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
}