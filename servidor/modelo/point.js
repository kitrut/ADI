Point = {
    id:0,
    name:" ",
    coordX:0,
    coordY:0,
    coordZ:0,
    where:function(){
        return this.coordX+","+this.coordY;
    }
}

module.exports = Point;