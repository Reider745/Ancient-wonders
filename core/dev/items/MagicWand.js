const setTimeout = function(func, ticks){
    var upd = {
        ticks: 0,
        update: function(){
            this.ticks++
            if(this.ticks >= ticks){
                func();
                this.remove = true
            }
        }
    };
    Updatable.addUpdatable(upd);
}
var Wands = {
    prot: {},
    stick: {},
    data: {},
    icon: [],
    addStick: function(obj){
        obj.bonus = obj.bonus || {};
        obj.bonus.necromancer = obj.bonus.necromancer || 0;
        obj.bonus.Protection = obj.bonus.Protection || 0;
        obj.bonus.magis = obj.bonus.magis || 0;
        obj.bonus.aspects = obj.bonus.aspects || 0;
        this.stick[obj.id] = obj;
        Item.setToolRender(obj.id, true);
        Item.setMaxUseDuration(obj.id, obj.time);
        Item.setUseAnimation(obj.id, Native.ItemAnimation.bow);
        Item.registerIconOverrideFunction(obj.id, function(item, name){
            let extra = item.extra || new ItemExtraData();
            let texture = {
                name: extra.getString("texture", obj.texture.name || "noy"),
                meta: extra.getInt("meta", obj.texture.meta || 0),
            };
            return {name: texture.name, meta: texture.meta}

        });
        Item.registerNameOverrideFunction(obj.id, function(item, name) {
            item.extra = item.extra || new ItemExtraData();
              name = name + "\n " + Translation.translate(Item.getName(item.extra.getInt("event", 0), 0));
              let prot1 = Wands.getSpell(item.extra.getInt("spell", -1));
              for(let i in prot1){
                  name = name + "\n " + Translation.translate(Item.getName(Wands.getItemId(prot1[i]), 0));
              }
              return name;
        });
    },
    addIcon: function(id, name, meta){
        this.icon.push({
            name: name,
            meta: meta,
            id: id
        });
    },
    addIconAll: function(name, meta){
        let keys = Object.keys(this.stick);
        for(let i in keys){
            this.addIcon(parseInt(keys[i]), name, meta);
        }
    },
    getIconArr: function(id){
        if(this.stick[id]){
            let arr = [];
            arr[0] = {
                name: this.stick[id].texture.name || "noy",
                meta: this.stick[id].texture.meta || 0
            };
            for(let i in this.icon){
                if(id == this.icon[i].id) arr.push(this.icon[i]);
            }
            return arr;
        }else{
            return [];
        }
    },
    addEvent: function(item, player, name, packet){
        if(this.stick[item.id]){
            let extra = item.extra || new ItemExtraData();
            let prot = this.getPrototype(extra.getInt("event", 0));
            if(extra.getInt("event", 0)==0){
                PlayerAC.message(player, "нельзя использовать пустое заклинание");
            }
            let prot1 = this.getSpell(extra.getInt("spell", -1));
            if(prot.event == name){
                let time = 0;
                for(let i in prot1){
                    if(this.isCompatibility(extra.getInt("event", 0), this.getItemId(prot1[i]))){
                     let c = MagicCore.getValue(player);
                     let w = this.getStick(item.id);
                     let prot2 = this.getPrototype(this.getItemId(prot1[i]));
                     if(c.necromancer >= prot2.activate.necromancer - w.bonus.necromancer){
                        if(c.magis >= prot2.activate.magis - w.bonus.magis){
                            if(c.Protection >= prot2.activate.Protection - w.bonus.Protection){
                                if(c.Aspects >= prot2.activate.aspects - w.bonus.aspects){
                                    if(0 <= prot2.activate.aspects - w.bonus.aspects) c.Aspects -= prot2.activate.aspects - w.bonus.aspects;
                                    MagicCore.setParameters(player, c);
                                    packet.sroll = prot1;
                                    packet.srollType = extra.getInt("event", 0);
                                    packet.spellI = i;
                                    packet.type = name;

                                    prot.using(packet);
                                    setTimeout(function(){ 
                                    if(prot2.setFunction) prot2.setFunction(packet);
                                    }, time);
                                    time+=prot2.time || 0;
                                    }else{
                                         PlayerAC.message(player, "нужно " + (prot2.activate.aspects - w.bonus.aspects) + " аспектов, для заклинания: "+Item.getName(prot1[i]));
                                    }
                                }else{
                                     PlayerAC.message(player, "нужен Protection " + (prot2.activate.Protection - w.bonus.Protection)+", для заклинания: "+Item.getName(prot1[i]));
                                }
                            }else{
                                 PlayerAC.message(player, "нужен magic " + (prot2.activate.magis - w.bonus.magis)+", для заклинания: "+Item.getName(prot1[i]));
                            }
                        }else{
                             PlayerAC.message(player, "нужен necromancer " + (prot2.activate.necromancer - w.bonus.necromancer)+", для заклинания: "+Item.getName(prot1[i]));
                        }
                    }else{
                        PlayerAC.message(player, Item.getName(extra.getInt("event", 0))+" не совместимо с "+Item.getName(this.getItemId(prot1[i])));
                    }
                }
                if(prot1.length == 0){
                    PlayerAC.message(player, "нельзя использовать пустое заклинание");
                }
            }
        }
    },
    getItemId: function(data){
        if(typeof data == "object"){
            return data.id;
        }else{
            return data;
        }
    },
    emitterEntity: function(entity, obj){
        if(Wands.isCompatibility(obj.srollType, obj.sroll)){
            let prot = Wands.getPrototype(obj.srollType);
            if(prot.event == "itemUse"){
               let time = 0;
               for(let i in obj.sroll){
                   setTimeout(function(){ 
                       Wands.getPrototype(obj.sroll[i]).setFunction({coords: obj.packet.coords, block: obj.packet.block, player: entity, entity: entity});
                   }, time);
                   time+=Wands.getPrototype(obj.sroll[i]).time || 0;
               } 
            }
            if(prot.event == "usingReleased"){
               let time = 0;
               for(let i in obj.sroll){
                   setTimeout(function(){ 
                       Wands.getPrototype(obj.sroll[i]).setFunction({coords: {x:0,y:0,z:0}, block: {id:0,data:0}, player: entity, entity: entity});
                   }, time);
                   time+=Wands.getPrototype(obj.sroll[i]).time || 0;
               } 
            }
            if(prot.event == "playerAttack"){
               let time = 0;
               for(let i in obj.sroll){
                   setTimeout(function(){ 
                       Wands.getPrototype(obj.sroll[i]).setFunction({coords: {x:0,y:0,z:0}, block: {id:0,data:0}, player: entity, entity: obj.packet.entity});
                   }, time);
                   time+=Wands.getPrototype(obj.sroll[i]).time || 0;
               } 
            }
        }
    },
    setPrototype: function(id, obj){
        obj.activate = obj.activate || {};
        obj.activate.necromancer = obj.activate.necromancer || 0;
        obj.activate.Protection = obj.activate.Protection || 0;
        obj.activate.magis = obj.activate.magis || 0;
        obj.activate.aspects = obj.activate.aspects || 0;
        this.prot[id] = obj;
    },
    decor: {},
    registerSrollDecoration: function(id){
        this.decor[id] = {
            types: [],
        };
        this.setPrototype(id, {
            type: "function", 
            compatibility: [],
            setFunction: function(packet){
                for(let i in Wands.decor[id].types){
                    if(packet.type == Wands.decor[id].types[i].type){
                        Wands.decor[id].types[i].func(packet);
                    }
                }
            },
            installation: function(player, item){
                delItem(player, item);
            }
        })
        return {
            id: id,
            addType: function(name, func){
                Wands.decor[this.id].types.push({
                    type: name,
                    func: func
                });
            },
            getObject: function(){
                return Wands.decor[this.id];
            },
            getId: function(){
                return this.id;
            }
        };
    },
    getSrollDecoration: function(id){
        if(this.decor[id]){
            return {
                id: id,
                addType: function(name, func){
                    Wands.decor[this.id].types.push({
                        type: name,
                        func: func
                    });
                },
                getObject: function(){
                    return Wands.decor[this.id];
                },
                getId: function(){
                    return this.id;
                }
            };
        }else{
            return {};
        }
    },
    getStick: function(id){
        return this.stick[id];
    },
    getPrototype: function(id){
        return this.prot[id] || {type: "event",event: "noy",installation: function (player, item){}};
    },
    getSpell: function(data){
        return this.data["s" + data] || [];
    },
    isCompatibility: function(id1, id2){
        let code1 = this.getPrototype(id1);
        let code2 = this.getPrototype(id2);
        let compatibility = {};
        for(let i in code2.compatibility){
            let name = code2.compatibility[i];
            compatibility[name] = name;
        }
        if(id1 == compatibility[id1]){
            return false;
        }else{
            return true;
        }
    },
    getCompatibility: function(id){
        return this.prot[id].compatibility || [];
    },
    addCompatibility: function(id, type){
        this.prot[id].compatibility.push(type);
    }
};
Network.addClientPacket("aw.w", function(packetData) {
    Wcode = packetData;
});
Network.addClientPacket("aw.c", function(packetData) {
    classPlayer = packetData;
});
Network.addClientPacket("aw.text", function(packetData) {
    Game.message(packetData);
});
Network.addClientPacket("aw.setFly", function(packetData) {
    Player.setFlying(packetData.bool);
    Player.setFlyingEnabled(packetData.bool);
});
var PlayerAC = {
    message: function (player, text){
        var client = Network.getClientForPlayer(player);
        if(client != null){
            client.send("aw.text", text);
        }
    },
    setFly: function(player, bool){
        if(Player.isPlayer(player)){
            let client = Network.getClientForPlayer(player);
            if(client != null){
                client.send("aw.setFly", {
                    bool: bool
                });
            }
        }
    }
};
Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player){
    if(block.id!=BlockID.MagicConnector){
        Wands.addEvent(item, player, "itemUse", {coords: coords, block: block, player: player, entity: player});
    }
});
Callback.addCallback("ItemUsingComplete", function(item, player){
    Wands.addEvent(item, player, "usingReleased", {coords: {x:0,y:0,z:0}, block: {id:0,data:0}, player: player, entity: player});
});
Callback.addCallback("PlayerAttack", function(player, entity){
    let item = Entity.getCarriedItem(player);
    Wands.addEvent(item, player, "playerAttack", {coords: {x:0,y:0,z:0}, block: {id:0,data:0}, player: player, entity: entity});
});




if(config.debug.enabled){
IDRegistry.genItemID("awDebugWand"); 
Item.createItem("awDebugWand", "debug wand", {name: "stick", meta: 0}, {stack: 1});
Wands.addStick({
    id: ItemID.awDebugWand,
    time: 5,
    texture: {
        name: "stick"
    },
    bonus: {
        necromancer: 100,
        Protection: 100,
        magis: 100,
        aspects: 99999999
    }
});
Wands.addIcon(ItemID.awDebugWand, "coal", 0);
}

//сам код регистрации 
Wands.addStick({
    id: ItemID.magis_stick, 
    time: 20,
    texture: {
        name: "magis_stick"
    },
});
MagicCore.setUsingItem({id: ItemID.magis_stick, data: 0}, "magis", 10);
Wands.addStick({
    id: ItemID.magis_sword,
    time: 30,
    texture: {
        name: "magis_sword"
    },
    bonus: {
        necromancer: 10,
        Protection: -10,
        magis: 10,
        aspects: -10
    }
});
MagicCore.setUsingItem({id: ItemID.magis_sword, data: 0}, "Protection", 35);
Wands.addStick({
    id: ItemID.magis_pocox,
    time: 15,
    texture: {
        name: "magis_pocox"
    },
    bonus: {
        necromancer: -10,
        Protection: 5,
        magis: 10,
        aspects: -5
    }
});
if(config.beta_mode){
Wands.addStick({
    id: ItemID.deadAw,
    time: 10,
    texture: {
        name: "deadAw"
    },
    bonus: {
        necromancer: 15,
        Protection: 10,
        magis: 15,
        aspects: 10
    }
});
}





MagicCore.setUsingItem({id: ItemID.magis_pocox, data: 0}, "necromancer", 20);
Wands.setPrototype(ItemID.sroll1, {
    type: "event", 
    event: "itemUse", 
    using: function(packet){

    },
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll2, {
    type: "event", 
    event: "usingReleased", 
    using: function(packet){

    },
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll3, {
    type: "event", 
    event: "playerAttack", 
    using: function(packet){

    },
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll4, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        necromancer: 10,
        aspects: 10
    },
    setFunction: function(packet){
        MagicCore.damage(packet.entity, "magic", 3);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll5, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        magis: 10,
        aspects: 5
    },
    setFunction: function(packet){
        Entity.addEffect(packet.entity, 1, 2, 240, true, false);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll6, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        magis: 10,
        aspects: 20
    },
    setFunction: function(packet){
        Entity.healEntity(packet.entity, 5);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll7, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        magis: 15,
        aspects: 20
    },
    setFunction: function(packet){
        Entity.addEffect(packet.entity, 5, 3, 240, true, false);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll8, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        necromancer: 20
    },
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        let helt = Entity.getHealth(packet.entity)*3;
        if(c.Aspects >= helt){
            MagicCore.damage(packet.entity, "dead", 40);
            c.Aspects -= helt;
            MagicCore.setParameters(packet.player, c);
        }else{
            PlayerAC.message(packet.player, "для убийства даного моба нужно "+helt+" аспектов");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll9, {
    type: "function", 
    compatibility: [ItemID.sroll2, ItemID.sroll3], 
    activate: {
        magis: 5,
        aspects: 5
    },
    setFunction: function(packet){
        BlockSource.getDefaultForActor(packet.player).destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, true);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll10, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        necromancer: 15,
        aspects: 50
    },
    setFunction: function(packet){
        MagicCore.damage(packet.entity, "magic", 14);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll11, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        necromancer: 20,
        aspects: 100
    },
    setFunction: function(packet){
        MagicCore.damage(packet.entity, "magic", 58);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll12, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        magis: 15,
        aspects: 40
    },
    setFunction: function(packet){
        Entity.healEntity(packet.entity, 10);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll13, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        magis: 20,
        aspects: 80
    },
    setFunction: function(packet){
        Entity.healEntity(packet.entity, 20);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll14, {
    type: "function", 
    compatibility: [ItemID.sroll2, ItemID.sroll3],
    activate: {
        magis: 30
    },
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.Aspects + 10 <= c.AspectsNow){
           BlockSource.getDefaultForActor(packet.entity).destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, false);
            c.Aspects += 10;
            MagicCore.setParameters(packet.player, c);
        }else if(c.Aspects <= c.AspectsNow){
             BlockSource.getDefaultForActor(packet.entity).destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, false);
            c.Aspects = c.AspectsNow;
            MagicCore.setParameters(packet.player, c);
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll15, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 10,
        Protection: 40,
        aspects: 20
    },
    setFunction: function(packet){
        let pos = Entity.getPosition(packet.entity);
        let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(packet.entity));
        //Entity.setVelocity(packet.entity, 0, 0, 0);
        Entity.addVelocity(packet.entity, vel.x * 2, vel.y * 2, vel.z * 2);
        ParticlesAPI.spawnLine(ParticlesAPI.part2, pos.x, pos.y, pos.z, pos.x + (vel.x * 6), pos.y + (vel.y * 6), pos.z + (vel.z * 6), 10);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll16, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 15,
        Protection: 20,
        aspects: 10
    },
    setFunction: function(packet){
        let pos = Entity.getPosition(packet.entity);
        //Entity.setVelocity(packet.entity, 0, 0, 0);
        Entity.addVelocity(packet.entity, 0, 1, 0);
        ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-1, pos.z, 0.5, 11, 2);
        ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.8, pos.z, 0.7, 11, 2);
        //ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.5, pos.z, 1, 11, 2);
        ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.3, pos.z, 1.1, 11, 2);
        ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.1, pos.z, 1.1, 11, 2);
        //ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y+0.1, pos.z, 1.2, 11, 2);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll17, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 20,
        Protection: 30,
        aspects: 50
    },
    setFunction: function(packet){
        let pos = Entity.getPosition(packet.entity);
        for(let i = 0;i <= 20;i++){
            let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(packet.entity));
            vel.x += Math.random() - Math.random();
            vel.y += Math.random() - Math.random();
            vel.z += Math.random() - Math.random();
            for(let i = 0;i<50;i++){
                let coord = {
                    x: pos.x+(i * vel.x / 2),
                    y: pos.y+(i * vel.y / 2),
                    z: pos.z+(i * vel.z / 2)
                };
                let ent3 = Entity.getAllInRange(coord, 4);
                for(let i1 in ent3){
                    if(ent3[i1] != packet.entity) MagicCore.damage(ent3[i1], "magic", 4);
                }
                 if(BlockSource.getDefaultForActor(packet.entity).getBlockId(coord.x,coord.y,coord.z)!=0){
                    break;
                }
                Mp.spawnParticle(ParticlesAPI.part3, coord.x, coord.y, coord.z);
            }
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll18, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 10,
        Protection: 15,
        aspects: 20
    },
    setFunction: function(packet){
        ParticlesAPI.spawnShellEnt(ParticlesAPI.part3, packet.entity, 30, 4);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll19, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 5,
        Protection: 5,
        necromancer: 10,
        aspects: 15
    },
    setFunction: function(packet){
        Entity.addEffect(packet.entity, 10, 4, 300, true, false);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll20, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 15,
        necromancer: 5,
        aspects: 30
    },
    setFunction: function(packet){
        let pos = Entity.getPosition(packet.entity);
        let ents = Entity.getAllInRange(pos, 40);
        for(let i in ents){
            let pos1 = Entity.getPosition(ents[i]);
            let vel = {
                x: (pos.x - pos1.x) / 4,
                y: (pos.y - pos1.y) / 4,
                z: (pos.z - pos1.z) / 4
            };
            Mp.spawnParticle(ParticlesAPI.part1, pos1.x, pos1.y, pos1.z, vel.x, vel.y, vel.z);
            Entity.setVelocity(ents[i], vel.x, vel.y, vel.z);
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll21, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 5,
        necromancer: 30,
        aspects: 50
    },
    setFunction: function(packet){
        for(let i = 0;i <= Math.floor(Math.random()*3)+1;i++){
            let b = BlockSource.getDefaultForActor(packet.entity);
            let pos = Entity.getPosition(packet.entity);
            pos.x += (Math.random() * 8) - (Math.random() * 8);
            pos.z += (Math.random() * 8) - (Math.random() * 8);
            pos = GenerationUtils.findSurface(pos.x, pos.y, pos.z);
            let mob = b.spawnEntity(pos.x, pos.y + 1, pos.z, "aw:skeleton");
            Entity.setCarriedItem(mob, ItemID. magis_stick, 1, 0, null);
            entId[mob] = packet.entity;
            for(i = 0;i <= Math.floor(Math.random()*5)+5;i++){
                Mp.spawnParticle(ParticlesAPI.part1, pos.x + Math.random() - Math.random() - 1, pos.y, pos.z + Math.random() - Math.random() - 1, 0, 0.1, 0);
            }
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll22, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 5,
        necromancer: 30,
        aspects: 100
    },
    setFunction: function(packet){
        let pos = Entity.getPosition(packet.entity);
        pos.y+=0.5;
        let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(packet.entity));
        for(let i = 0;i<50;i++){
            let coord = {
                x: pos.x+(i * vel.x / 2),
                y: pos.y+(i * vel.y / 2),
                z: pos.z+(i * vel.z / 2)
            };
            let ent3 = Entity.getAllInRange(coord, 2);
            for(let i1 in ent3){
                if(ent3[i1] != packet.entity) MagicCore.damage(ent3[i1], "dead", 40);
            }
             if(BlockSource.getDefaultForActor(packet.entity).getBlockId(coord.x,coord.y,coord.z)!=0){
                break;
            }
            Mp.spawnParticle(ParticlesAPI.part4, coord.x, coord.y, coord.z);
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll23, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        Protection: 10,
        necromancer: 40,
        aspects: 250
    },
    setFunction: function(packet){
        for(let i = 0;i<=Math.floor(Math.random()*15);i++){
            let pos = Entity.getPosition(packet.entity);
            pos.x += ((Math.random()*8)-(Math.random()*8));
            pos.y += 5;
            pos.z += ((Math.random()*8)-(Math.random()*8));
            for(let i = 0;i<60;i++){
                let coord = {
                    x: pos.x,
                    y: pos.y+(i * -0.3),
                    z: pos.z
                };
                let ent3 = Entity.getAllInRange(coord, 2);
                for(let i1 in ent3){
                    if(ent3[i1] != packet.entity) MagicCore.damage(ent3[i1], "dead", 40);
                }
                 if(BlockSource.getDefaultForActor(packet.entity).getBlockId(coord.x,coord.y,coord.z)!=0){
                    break;
                }
                Mp.spawnParticle(ParticlesAPI.part4, coord.x, coord.y, coord.z);
            }
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll24, {
    type: "function", 
    compatibility: [ItemID.sroll1, ItemID.sroll3],
    activate: {
        magis: 55,
        necromancer: 15,
    },
    setFunction: function(packet){
        for(let i = 0;i<=Math.floor(Math.random()*15);i++){
            let pos = Entity.getPosition(packet.entity);
            let pos1 = pos;
            pos.x += ((Math.random()*8)-(Math.random()*8));
            pos.y += ((Math.random()*8)-(Math.random()*8));
            pos.z += ((Math.random()*8)-(Math.random()*8));
            let c = MagicCore.getValue(packet.player);
            if(Math.random()<=0.1){
                BlockSource.getDefaultForActor(packet.entity).explode(pos1.x, pos1.y, pos1.z, 4, false)
            }else if(c.AspectsNow >= c.Aspects+3){
                Mp.spawnParticle(ParticlesAPI.part2, pos1.x, pos1.y, pos1.z, 0, 0, 0);
               c.Aspects+=3;
               MagicCore.setParameters(packet.player, c);
            }
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll25, {
    type: "function", 
    compatibility: [ItemID.sroll1, ItemID.sroll3],
    activate: {
        magis: 55,
        necromancer: 50,
    },
    setFunction: function(packet){
        for(let i = 0;i<=Math.floor(Math.random()*18);i++){
            let pos = Entity.getPosition(packet.entity);
            let pos1 = pos;
            pos.x += ((Math.random()*8)-(Math.random()*8));
            pos.y += ((Math.random()*8)-(Math.random()*8));
            pos.z += ((Math.random()*8)-(Math.random()*8));
            let c = MagicCore.getValue(packet.player);
            if(Math.random()<=0.1){
                BlockSource.getDefaultForActor(packet.entity).explode(pos1.x, pos1.y, pos1.z, 4, false)
            }else if(c.AspectsNow >= c.Aspects+6){
                Mp.spawnParticle(ParticlesAPI.part2, pos1.x, pos1.y, pos1.z, 0, 0, 0);
               c.Aspects+=6;
               MagicCore.setParameters(packet.player, c);
            }
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll26, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 50,
        necromancer: 20,
        Protection: 15,
        aspects: 30
    },
    setFunction: function(packet){
        let pos = Entity.getPosition(packet.entity);
        let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(packet.entity));
        for(let i = 0;i<25;i++){
            let coord = {
                x: pos.x+(i * vel.x / 2),
                y: pos.y+0.5+(i * vel.y / 2),
                z: pos.z+(i * vel.z / 2)
            };
             if(BlockSource.getDefaultForActor(packet.entity).getBlockId(coord.x,coord.y,coord.z)!=0){
                BlockSource.getDefaultForActor(packet.entity).explode(coord.x, coord.y, coord.z, 8, false)
                break;
            }
            Mp.spawnParticle(ParticlesAPI.part3, coord.x, coord.y, coord.z);
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll27, {
    type: "function", 
    compatibility: [],
    time: 10,
    activate: {
        magis: 10,
    },
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll28, {
    type: "function", 
    compatibility: [],
    time: 20,
    activate: {
        magis: 10,
    },
    installation: function (player, item){
        delItem(player, item);
    }
});

Wands.setPrototype(ItemID.sroll29, {
  type: "function",
  compatibility: [ItemID.sroll1],
  activate: {
    magis: 10,
    Protection: 20
  },
  setFunction: function(packet) {
    EffectAPI.clearAll(packet.entity);
  },
  installation: function(player, item) {
    delItem(player, item);
  }
});

Wands.setPrototype(ItemID.sroll30, {
  type: "function",
  compatibility: [ItemID.sroll1, ItemID.sroll3],
  activate: {
    magis: 15,
    Protection: 10
  },
  setFunction: function(packet) {
    EffectAPI.add(packet.player, "fly", 20 * 30, 1);
  },
  installation: function(player, item) {
    delItem(player, item);
  }
});

//декоративные заклинания

let decor = Wands.registerSrollDecoration(ItemID.decor1);
decor.addType("usingReleased", function(packet){
   let pos = Entity.getPosition(packet.entity);
   ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x - .5, pos.y - .5, pos.z - .5, 0.5, 11, 2);
   ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x - .5, pos.y - 0.8 - .5, pos.z - .5, 0.7, 11, 2);
   ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x - .5, pos.y - 0.3 - .5, pos.z - .5, 1.1, 11, 2);
   ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x - .5, pos.y - 0.1 - .5, pos.z - .5, 1.1, 11, 2);
});
decor.addType("playerAttack", function(packet) {
  let pos = Entity.getPosition(packet.entity);
  ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x - .5, pos.y - 1 + .3, pos.z - .5, 0.5, 11, 2);
  ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x - .6, pos.y - 0.8 + .3, pos.z - .5, 0.7, 11, 2);
  ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x - .5, pos.y - 0.3 + .3, pos.z - .5, 1.1, 11, 2);
  ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x - .5, pos.y - 0.1 + .3, pos.z - .5, 1.1, 11, 2);
});
decor.addType("itemUse", function(packet) {
  let pos = packet.coords;
  ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y - 1 + 2, pos.z, 0.5, 11, 2);
  ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y - 0.8 + 2, pos.z, 0.7, 11, 2);
  ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y - 0.3 + 2, pos.z, 1.1, 11, 2);
  ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y - 0.1 + 2, pos.z, 1.1, 11, 2);
});

decor = Wands.registerSrollDecoration(ItemID.decor2);
decor.addType("usingReleased", function(packet) {
  let pos = Entity.getPosition(packet.entity);
  for (let i = 0; i <= 10; i++) {
    ParticlesAPI.spawnCircle(ParticlesAPI.part4, pos.x - .5, pos.y + 1 - 2.8, pos.z - .5, i / 2, 11 * i, 2);
  }
});
decor.addType("playerAttack", function(packet) {
  let pos = Entity.getPosition(packet.entity);
  for (let i = 0; i <= 10; i++) {
    ParticlesAPI.spawnCircle(ParticlesAPI.part4, pos.x - .5, pos.y - .1, pos.z - .5, i / 2, 11 * i, 2);
  }
});
decor.addType("itemUse", function(packet) {
  let pos = packet.coords;
  for (let i = 0; i <= 10; i++) {
    ParticlesAPI.spawnCircle(ParticlesAPI.part4, pos.x, pos.y + 1, pos.z, i / 2, 11 * i, 2);
  }
});

decor = Wands.registerSrollDecoration(ItemID.decor3);
decor.addType("usingReleased", function(packet) {
  let pos = Entity.getPosition(packet.entity);
  for (let i = 0; i <= 40; i++) {
    let coords = {
      x: pos.x + (Math.random() * 8 - Math.random() * 8),
      y: pos.y + (Math.random() * 8 - Math.random() * 8),
      z: pos.z + (Math.random() * 8 - Math.random() * 8)
    };
    let v = ParticlesAPI.getVector(pos, coords);
    Mp.spawnParticle(ParticlesAPI.part2, coords.x, coords.y, coords.z, (v.x / 50), (v.y / 50), (v.z / 50));
  }
});
decor.addType("playerAttack", function(packet) {
  let pos = Entity.getPosition(packet.entity);
  for (let i = 0; i <= 40; i++) {
    let coords = {
      x: pos.x + (Math.random() * 8 - Math.random() * 8),
      y: pos.y + (Math.random() * 8 - Math.random() * 8),
      z: pos.z + (Math.random() * 8 - Math.random() * 8)
    };
    let v = ParticlesAPI.getVector(pos, coords);
    Mp.spawnParticle(ParticlesAPI.part2, coords.x, coords.y, coords.z, (v.x / 50), (v.y / 50), (v.z / 50));
  }
});
decor.addType("itemUse", function(packet) {
  let pos = packet.coords;
  for (let i = 0; i <= 40; i++) {
    let coords = {
      x: pos.x + (Math.random() * 8 - Math.random() * 8),
      y: pos.y + (Math.random() * 8 - Math.random() * 8),
      z: pos.z + (Math.random() * 8 - Math.random() * 8)
    };
    let v = ParticlesAPI.getVector(pos, coords);
    Mp.spawnParticle(ParticlesAPI.part2, coords.x, coords.y, coords.z, (v.x / 50), (v.y / 50), (v.z / 50));
  }
});