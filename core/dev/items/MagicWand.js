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
        this.prot[id] = obj;
    }, 
    save: function (data, packet, player){
        var client = Network.getClientForPlayer(player);
        if(client != null){
            client.send("aw.save", {
                data: data, 
                code: packet
            });
        }
    },
    isCompatibility: function(id1, id2){
        let code1 = this.getPrototype(id1);
        let code2 = this.getPrototype(id2);
        let compatibility = {};
        for(i in code2.compatibility){
            let name = code2.compatibility[i];
            compatibility[name] = name;
        }
        if(id1 == compatibility[id1]){
            return false;
        }else{
            return true;
        }
    }
};
Network.addClientPacket("aw.w", function(packetData) {
    Wcode = packetData;
});
Network.addClientPacket("aw.c", function(packetData) {
    classPlayer = packetData;
    FileTools.WriteJSON(__packdir__+"gh.json", classPlayer, true);
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
    if(Wands.isStick(item.id)){
        if(item.data != 0){
            if(block.id!=BlockID.MagicConnector){
                let code = Wands.getCode(item.data);
                if(code.event == "itemUse")
                if(Wands.isCompatibility(code.id1, code.id2)){
                    if(code.id2!=0){
                         Wands.getPrototype(code.id2).setFunction({coords: coords, item: item, block: block, player: player, entity: player});
                    }else{
                        PlayerAC.message(player, "нельзя использовать пустое заклинание");
                    }
            }else{
                PlayerAC.message(player, Item.getName(code.id1)+" не совместимо с "+Item.getName(code.id2));
            }
           } 
        } 
    }
});
Callback.addCallback("ItemUsingComplete", function(item, player){
        if(Wands.isStick(item.id)){
            if(item.data != 0){
                let code = Wands.getCode(item.data);
                    if(code.event == "usingReleased"){
                        if(Wands.isCompatibility(code.id1, code.id2)){
                        if(code.id2 != 0){
                             Wands.getPrototype(code.id2).setFunction({coords: {x:0,y:0,z:0}, item: item, block: {id:0,data:0}, player: player, entity: player});
                        }else{
                            PlayerAC.message(player, "нельзя использовать пустое заклинание");
                        }
                    }else{
                    PlayerAC.message(player, Item.getName(code.id1)+" не совместимо с "+Item.getName(code.id2));
                }
               } 
            }
        }
});
Callback.addCallback("PlayerAttack", function(player, entity){
    let item = Player.getCarriedItem();
    if(Wands.isStick(item.id)){
        if(item.data != 0){
                let code = Wands.getCode(item.data);
                    if(code.event == "playerAttack")
                    if(Wands.isCompatibility(code.id1, code.id2)){
                        if(code.id2!=0){
                    Wands.getPrototype(code.id2).setFunction({coords: {x:0,y:0,z:0}, item: {id:0,data:0,count:0}, block: {id:0,data:0}, player: player, entity: entity});
                        }else{
                            PlayerAC.message(player, "нельзя использовать пустое заклинание");
                        }
           }else{
               PlayerAC.message(player, Item.getName(code.id1)+" не совместимо с "+Item.getName(code.id2));
            }
        }
    }
});
Wands.addStick({
    id: ItemID.magis_stick, 
    time: 20
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
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.necromancer >= 5){
            if(c.Aspects >= 5){
                Entity.damageEntity(packet.entity, 6);
                c.Aspects -= 5;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 5 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна necromancer 5 уровня")
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll5, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.magis >= 10){
            if(c.Aspects >= 5){
                Entity.addEffect(packet.entity, 1, 2, 240, true, false);
                c.Aspects -= 5;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 5 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна magis 10 уровня");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll6, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.magis >= 10){
            if(c.Aspects >= 20){
                Entity.healEntity(packet.entity, 5);
                c.Aspects -= 20;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 20 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна magis 10 уровня");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll7, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.magis >= 15){
            if(c.Aspects >= 20){
                Entity.addEffect(packet.entity, 5, 3, 240, true, false);
                c.Aspects -= 20;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 20 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна magis 15 уровня");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll8, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        let helt = Entity.getHealth(packet.entity)*3;
        if(c.necromancer>=20){
           if(c.Aspects >= helt){
                Entity.setHealth(packet.entity, 0);
                c.Aspects -= helt;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для убийства даного моба нужно "+helt+" аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна necromancer 20 уровня")
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll9, {
    type: "function", 
    compatibility: [ItemID.sroll2, ItemID.sroll3], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.magis>=5){
            if(c.Aspects >= 5){
                World.destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, true);
                c.Aspects -= 5;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player,"для этого заклинания нужно 5 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна magis 5 уровня");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll10, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.necromancer >= 10){
            if(c.Aspects >= 10){
                Entity.damageEntity(packet.entity, 12);
                c.Aspects -= 10;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 10 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна necromancer 10 уровня")
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll11, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.necromancer >= 15){
            if(c.Aspects >= 15){
                Entity.damageEntity(packet.entity, 24);
                c.Aspects -= 15;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 15 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна necromancer 15 уровня")
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll12, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.magis >= 15){
            if(c.Aspects >= 40){
                Entity.healEntity(packet.entity, 10);
                c.Aspects -= 40;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 40 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна magis 15 уровня");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll13, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.magis >= 20){
            if(c.Aspects >= 80){
                Entity.healEntity(packet.entity, 20);
                c.Aspects -= 80;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 80 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна magis 20 уровня");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll14, {
    type: "function", 
    compatibility: [ItemID.sroll2, ItemID.sroll3], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.magis>=30){
            if(c.Aspects + 10 <= c.AspectsNow){
                World.destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, false);
                c.Aspects += 10;
                MagicCore.setParameters(packet.player, c);
            }else if(c.Aspects <= c.AspectsNow){
                World.destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, false);
                c.Aspects = c.AspectsNow;
                MagicCore.setParameters(packet.player, c);
            }
        }else{
            PlayerAC.message(packet.player, "нужна magis 30 уровня");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
