var Wcode = {};
let path;
Callback.addCallback('LevelSelected', function (levelName, levelPath) {
    path = __packdir__+"worlds/"+levelPath+"/saveAC.json";
    if(FileTools.isExists(path))
        Wcode = FileTools.ReadJSON(path);
});
Callback.addCallback("tick", function(){
    FileTools.WriteJSON(path, Wcode, false);
});
Network.addClientPacket("aw.save", function(packetData) {
    Wcode[packetData.data] = packetData.code;
});
Callback.addCallback("PlayerChangedDimension", function(player, currentId, lastId){
    var client = Network.getClientForPlayer(player);
    if(client != null){
        client.send("aw.w", Wcode);
    }
});
Callback.addCallback("PlayerChangedDimension", function(player, currentId, lastId){
    var client = Network.getClientForPlayer(player);
    if(client != null){
        client.send("aw.c", classPlayer);
    }
});
var Wands = {
    prot: {}, 
    stick: {}, 
    addStick: function (obj){
        obj.bonus = obj.bonus || {};
        obj.bonus.necromancer = obj.bonus.necromancer || 0;
        obj.bonus.Protection = obj.bonus.Protection || 0;
        obj.bonus.magis = obj.bonus.magis || 0;
        obj.bonus.aspects = obj.bonus.aspects || 0;
        this.stick[obj.id] = obj;
        Item.setMaxDamage(obj.id, 32000);
        Item.setToolRender(obj.id, true);
        Item.setUseAnimation(obj.id, Native.ItemAnimation.bow);
        Item.setMaxUseDuration(obj.id, obj.time)
        Item.registerNameOverrideFunction(obj.id, function(item, name) {
              if(item.data!=0){
                  let id1;
                  let id2;
                  if(Wands.getCode(item.data)){
                      id1 = Wands.getCode(item.data).id1;
                      id2 = Wands.getCode(item.data).id2;
                  }
                 return name + "\n предмет: "+Item.getName(id1, 0)+"\n предмет: "+Item.getName(id2, 0);
              }else{
                  return name;
              }
        });
    },
    isStick: function (id){
        if(this.stick[id]){
            return true;
        }else{
            return false;
        }
    }, 
    getPrototype: function (id){
        let code;
        if(this.prot[id]){
            code = this.prot[id];
        }else{
            code = {
                event: "noy", 
                id1: 0, 
                id2: 0
            };
        }
        return code;
    }, 
    isPrototype: function (id){
        if(this.prot[id]){
            return true;
        }else{
            return false;
        }
    }, 
    isCode: function(data){
        if(Wcode[data]){
            return true;
        }else{
            return false;
        }
    }, 
    getStick: function(id){
        return this.stick[id];
    }, 
    getCode: function(data){
        let code;
        if(Wcode[data]){
            code = Wcode[data];
        }else{
            code = {
                event: "noy", 
                id1: 0, 
                id2: 0
            };
        }
        return code;
    }, 
    setPrototype: function(id, obj){
        obj.activate = obj.activate || {};
        obj.activate.necromancer = obj.activate.necromancer || 0;
        obj.activate.Protection = obj.activate.Protection || 0;
        obj.activate.magis = obj.activate.magis || 0;
        obj.activate.aspects = obj.activate.aspects || 0;
        this.prot[id] = obj;
    }, 
    save: function (data, packet, player){
        Network.sendToAllClients("aw.save", {
            data: data, 
            code: packet
        });
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
    addCompatibility: function (srool, id){
        this.prot[srool].compatibility.push(id);
    },
    addEvent: function (item, player, name, packet){
        if(Wands.isStick(item.id)){
            if(item.data != 0){
                let code = Wands.getCode(item.data);
                if(code.event == name)
                if(Wands.isCompatibility(code.id1, code.id2)){
                    if(code.id2!=0){
                        let prot = Wands.getPrototype(code.id2);
                        let c = MagicCore.getValue(player);
                        let w = Wands.getStick(item.id);
                        if(c.necromancer >= prot.activate.necromancer - w.bonus.necromancer){
                            if(c.magis >= prot.activate.magis - w.bonus.magis){
                                if(c.Protection >= prot.activate.Protection - w.bonus.Protection){
                                    if(c.Aspects >= prot.activate.aspects - w.bonus.aspects){
                                        if(0 <= prot.activate.aspects - w.bonus.aspects) c.Aspects -= prot.activate.aspects - w.bonus.aspects;
                                            MagicCore.setParameters(player, c);
                                            Wands.getPrototype(code.id2).setFunction(packet);
                                        }else{
                                           PlayerAC.message(player, "нужно " + (prot.activate.aspects - w.bonus.aspects) + " аспектов");
                                        }
                                    }else{
                                        PlayerAC.message(player, "нужен Protection " + (prot.activate.Protection - w.bonus.Protection));
                                    }
                                }else{
                                    PlayerAC.message(player, "нужен magis " + (prot.activate.magis - w.bonus.magis));
                                }
                            }else{
                                PlayerAC.message(player, "нужен necromancer " + (prot.activate.necromancer - w.bonus.necromancer));
                            }
                        }else{
                            PlayerAC.message(player, "нельзя использовать пустое заклинание");
                    }
                }else{
                    PlayerAC.message(player, Item.getName(code.id1)+" не совместимо с "+Item.getName(code.id2));
                }
            } 
        } 
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
        Wands.addEvent(item, player, "itemUse", {coords: coords, item: item, block: block, player: player, entity: player});
    }
});
Callback.addCallback("ItemUsingComplete", function(item, player){
    Wands.addEvent(item, player, "usingReleased", {coords: {x:0,y:0,z:0}, item: item, block: {id:0,data:0}, player: player, entity: player});
});
Callback.addCallback("PlayerAttack", function(player, entity){
    let item = Entity.getCarriedItem(player);
    Wands.addEvent(item, player, "playerAttack", {coords: {x:0,y:0,z:0}, item: item, block: {id:0,data:0}, player: player, entity: entity});
});
Wands.addStick({
    id: ItemID.magis_stick, 
    time: 20
});
Wands.addStick({
    id: ItemID.magis_sword,
    time: 40,
    bonus: {
        necromancer: 15,
        Protection: -10,
        magis: 15,
        aspects: -20
    }
});
Wands.addStick({
    id: ItemID.magis_pocox,
    time: 15,
    bonus: {
        necromancer: -10,
        Protection: 10,
        magis: 15,
        aspects: -10
    }
});
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
        necromancer: 5,
        aspects: 5
    },
    setFunction: function(packet){
        Entity.damageEntity(packet.entity, 6);
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
        necromancer: 10,
        aspects: 10
    },
    setFunction: function(packet){
        Entity.damageEntity(packet.entity, 12);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll11, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        necromancer: 15,
        aspects: 15
    },
    setFunction: function(packet){
        Entity.damageEntity(packet.entity, 24);
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
        Entity.addVelocity(packet.entity, vel.x * 2, vel.y * 2, vel.z * 2);
        ParticlesAPI.spawnLine(ParticlesAPI.part2, pos.x, pos.y, pos.z, pos.x + (vel.x * 4), pos.y + (vel.y * 4), pos.z + (vel.z * 4), 10);
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
        Entity.addVelocity(packet.entity, 0, 1, 0);
        ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-1, pos.z, 0.5, 11, 2);
        ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.8, pos.z, 0.7, 11, 2);
        ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.5, pos.z, 1, 11, 2);
        ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.3, pos.z, 1.1, 11, 2);
        ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.1, pos.z, 1.1, 11, 2);
        ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y+0.1, pos.z, 1.2, 11, 2);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
