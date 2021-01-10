var Wands = {
    prot: {},
    stick: {},
    data: {},
    addStick: function(obj){
        obj.bonus = obj.bonus || {};
        obj.bonus.necromancer = obj.bonus.necromancer || 0;
        obj.bonus.Protection = obj.bonus.Protection || 0;
        obj.bonus.magis = obj.bonus.magis || 0;
        obj.bonus.aspects = obj.bonus.aspects || 0;
        this.stick[obj.id] = obj;
        Item.setToolRender(obj.id, true);
        Item.setUseAnimation(obj.id, Native.ItemAnimation.bow);
        Item.setMaxUseDuration(obj.id, obj.time)
        Item.registerNameOverrideFunction(obj.id, function(item, name) {
            item.extra = item.extra || new ItemExtraData();
              name = name + "\n событие: " + Item.getName(item.extra.getInt("event", 0));
              let prot1 = Wands.getSpell(item.extra.getInt("spell", -1));
              for(let i in prot1){
                  name = name + "\n предмет: " + Item.getName(prot1[i]);
              }
              return name;
        });
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
                for(let i in prot1){
                    if(this.isCompatibility(extra.getInt("event", 0), prot1[i])){
                     let c = MagicCore.getValue(player);
                     let w = this.getStick(item.id);
                     let prot2 = this.getPrototype(prot1[i]);
                     if(c.necromancer >= prot2.activate.necromancer - w.bonus.necromancer){
                        if(c.magis >= prot2.activate.magis - w.bonus.magis){
                            if(c.Protection >= prot2.activate.Protection - w.bonus.Protection){
                                if(c.Aspects >= prot2.activate.aspects - w.bonus.aspects){
                                    if(0 <= prot2.activate.aspects - w.bonus.aspects) c.Aspects -= prot2.activate.aspects - w.bonus.aspects;
                                     MagicCore.setParameters(player, c);
                                    packet.sroll = prot1;
                                    packet.srollType = extra.getInt("event", 0);
                                    packet.spellI = i;
                                     if(prot2.setFunction) prot2.setFunction(packet);
                                    }else{
                                         PlayerAC.message(player, "нужно " + (prot2.activate.aspects - w.bonus.aspects) + " аспектов, для заклинания: "+Item.getName(prot1[i]));
                                    }
                                }else{
                                     PlayerAC.message(player, "нужен Protection " + (prot2.activate.Protection - w.bonus.Protection)+", для заклинания: "+Item.getName(prot1[i]));
                                }
                            }else{
                                 PlayerAC.message(player, "нужен magis " + (prot2.activate.magis - w.bonus.magis)+", для заклинания: "+Item.getName(prot1[i]));
                            }
                        }else{
                             PlayerAC.message(player, "нужен necromancer " + (prot2.activate.necromancer - w.bonus.necromancer)+", для заклинания: "+Item.getName(prot1[i]));
                        }
                    }else{
                        PlayerAC.message(player, Item.getName(extra.getInt("event", 0))+" не совместимо с "+Item.getName(prot1[i]));
                    }
                }
                if(prot1.length == 0){
                    PlayerAC.message(player, "нельзя использовать пустое заклинание");
                }
            }
        }
    },
    emitterEntity: function(entity, obj){
        if(Wands.isCompatibility(obj.srollType, obj.sroll)){
            let prot = Wands.getPrototype(obj.srollType);
            if(prot.event == "itemUse"){
                Wands.getPrototype(obj.sroll).setFunction({coords: obj.packet.coords, block: obj.packet.block, player: entity, entity: entity});
            }
            if(prot.event == "usingReleased"){
                Wands.getPrototype(obj.sroll).setFunction({coords: {x:0,y:0,z:0}, block: {id:0,data:0}, player: entity, entity: entity});
            }
            if(prot.event == "playerAttack"){
                Wands.getPrototype(obj.sroll).setFunction({coords: {x:0,y:0,z:0}, block: {id:0,data:0}, player: entity, entity: obj.packet.entity});
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
var PlayerAC = {
    message: function (player, text){
        var client = Network.getClientForPlayer(player);
        if(client != null){
            client.send("aw.text", text);
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














//сам код регистрации 
Wands.addStick({
    id: ItemID.magis_stick, 
    time: 20
});
MagicCore.setUsingItem({id: ItemID.magis_stick, data: 0}, "magis", 10);
Wands.addStick({
    id: ItemID.magis_sword,
    time: 30,
    bonus: {
        necromancer: 10,
        Protection: -10,
        magis: 10,
        aspects: -10
    }
});
MagicCore.setUsingItem({id: ItemID.magis_sword, data: 0}, "Protection", 60);
Wands.addStick({
    id: ItemID.magis_pocox,
    time: 15,
    bonus: {
        necromancer: -10,
        Protection: 5,
        magis: 10,
        aspects: -5
    }
});
MagicCore.setUsingItem({id: ItemID.magis_pocox, data: 0}, "necromancer", 20);
Wands.setPrototype(ItemID.sroll1, {
    type: "event", 
    event: "itemUse", 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll2, {
    type: "event", 
    event: "usingReleased", 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll3, {
    type: "event", 
    event: "playerAttack", 
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
        Entity.damageEntity(packet.entity, 3);
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
            Entity.setHealth(packet.entity, 0);
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
        World.destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, true);
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
        Entity.damageEntity(packet.entity, 14);
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
        Entity.damageEntity(packet.entity, 58);
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
            World.destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, false);
            c.Aspects += 10;
            MagicCore.setParameters(packet.player, c);
        }else if(c.Aspects <= c.AspectsNow){
            World.destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, false);
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
                    if(ent3[i1] != packet.entity) Entity.damageEntity(ent3[i1], 4);
                }
                 if(World.getBlockID(coord.x,coord.y,coord.z)!=0){
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