let EffectAPI = {
    effect: {},
    entity: {},
    register: function(obj){
        obj.tick = obj.tick || function(e, t, l){};
        obj.over = obj.over || function(e, l){};
        this.effect[obj.id] = obj;
    },
    add: function(ent, id, time, level){
        if(!this.entity[ent]) this.entity[ent] = {};
        if(this.entity[ent][id]){
            this.entity[ent][id].time = time;
            this.entity[ent][id].level = level;
            this.entity[ent][id].tick = this.effect[id].tick;
            this.entity[ent][id].over = this.effect[id].over;
        }else{
            this.entity[ent][id] = {};
            this.entity[ent][id].time = time;
            this.entity[ent][id].level = level;
            this.entity[ent][id].tick = this.effect[id].tick;
            this.entity[ent][id].over = this.effect[id].over;
        }
    },
    clear: function(ent, id){
        if(typeof id == "string"){
            this.entity[ent][id].over(ent, this.entity[ent][id].level);
            delete this.entity[ent][id];
        }else{
            Entity.clearEffect(ent, id)
        }
    },
    clearAll: function(ent){
        Entity.clearEffects(ent);
        let effects = Object.keys(this.entity[ent]);
        for(let i in effects){
            let obj = this.entity[ent][effects[i]];
            obj.over(ent, obj.level);
        }
        this.entity[ent] = {};
    },
    getEntity: function (ent){
        return this.entity[ent] || {};
    }
};
Callback.addCallback("LocalTick", function(){
    let ents = Object.keys(EffectAPI.entity);
    for(let i in ents){
        let effects = Object.keys(EffectAPI.entity[ents[i]]);
        for(let e in effects){
            let obj = EffectAPI.entity[ents[i]][effects[e]];
            obj.time--;
            obj.tick(parseInt(ents[i]), obj.time, obj.level);
            if(obj.time <= 0){
                obj.over(parseInt(ents[i]), obj.level)
                EffectAPI.clear(ents[i], effects[e]);
            }
        }
    }
});

EffectAPI.register({
    id: "aspects",
    tick: function(ent, time, level){
        if(MagicCore.isClass(ent)){
            let obj = MagicCore.getValue(ent);
            let r = Math.floor(Math.random()*(1*level));
            if(obj.Aspects + r <= obj.AspectsNow) obj.Aspects += r;
            classPlayer[ent] = obj;
            Network.sendToServer("aw.sp", classPlayer);
        }
    }
});
EffectAPI.register({
    id: "fly",
    tick: function(ent, time, level){
        PlayerAC.setFly(ent, true);
    },
    over: function(ent, level){
        PlayerAC.setFly(ent, false);
    }
});