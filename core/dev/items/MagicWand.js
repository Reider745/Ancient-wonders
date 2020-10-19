var Wands = {
    prot: {}, 
    code: {}, 
    stick: {}, 
    addStick: function (id){
        this.stick[id] = true;
    },
    isStick: function (id){
        if(this.stick[id]){
            return true;
        }else{
            return false;
        }
    }, 
    getCode: function (data){
        return this.code[data];
    }, 
    setPrototype: function(obj){
        prot[obj.id] = obj;
    }
};
Wands.addStick(264);