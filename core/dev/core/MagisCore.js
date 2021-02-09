Network.addClientPacket("aw.classPlayer", function(packetData) {
    Game.message("§2вы выбрали класс: "+packetData.Class);
    classPlayer[packetData.player] = Class[packetData.Class];
});
Network.addClientPacket("aw.parameterAdd", function(packetData) {
    MagicCore.piece(packetData.player, packetData.parameter);
});
var classPlayer = {};
Saver.addSavesScope("class",
    function read(scope) {
        classPlayer = scope.classPlayer || {};
        Entity.prot = scope.protEntity || {};
        Wands.data = scope.wandData || {};
        //Potion.potions = scope.potion || {};
    },
    function save() {
        return {
            classPlayer: classPlayer,
            protEntity: Entity.prot,
            wandData: Wands.data,
            //potion: Potion.potions
        };
    }
);
const Class = {
    mage: {
        name: "mage", 
        magisMax: 100, 
        magis: 5,
        ProtectionMax: 40,
        Protection: 0,
        necromancerMax: 10,
        necromancer: 0,
        AspectsMax: 100000,
        AspectsNow: 5000,
        Aspects: 0
    }, 
    warrior: {
        name: "warrior", 
        magisMax: 15,
        magis: 0,
        ProtectionMax: 100,
        Protection: 10,
        necromancerMax: 5, 
        necromancer: 0,
        AspectsMax: 10000,
        AspectsNow: 100,
        Aspects: 0
    }, 
    necromancer: {
        name: "necromancer", 
        magisMax: 50,
        magis: 5,
        ProtectionMax: 30,
        Protection: 0,
        necromancerMax: 100,
        necromancer: 5,
        AspectsMax: 50000,
        AspectsNow: 5000,
        Aspects: 0
    }
};
Callback.addCallback("PlayerAttack", function(player){
    let c = MagicCore.getValue(player);
    if(MagicCore.isClass(player)){
        let r = Math.floor(Math.random()*10)
        if(c.Aspects + r <= c.AspectsNow){
            classPlayer[player].Aspects += r;
        }else{
            classPlayer[player].Aspects = c.AspectsNow;
        }
        
    }
});
function delItem(player, item){
    Entity.setCarriedItem(player, item.id, item.count-1, item.data);
}
function delItem2(player, item){
    let pa = new PlayerActor(player);
    if(pa.getGameMode() == 0){
        Entity.setCarriedItem(player, item.id, item.count-1, item.data);
    }
}
var MagicCore = {
    setArmor: function (id, parameter, value){
        Item.registerNameOverrideFunction(id, function(item, name) {
              return name  + "\n требуется: " + parameter + " уровня " + value;
        });
        Armor.registerOnTakeOnListener(id, function(item, slot, player) {
            if(item.id == id){
                let ItemA = new PlayerActor(player);
                let coords = Entity.getPosition(player);
                let c = MagicCore.getValue(player);
                let b = BlockSource.getDefaultForActor(player);
                if(MagicCore.isClass(player)){
                    if(c[parameter] < value){
                        ItemA.setArmor(slot, 0, 0, 0, null);
                        b.spawnDroppedItem(coords.x, coords.y, coords.z, id, 1, item.data, item.extra);
                        PlayerAC.message(player, "нужен " + parameter + " уровня " + value);
                    }/*else{
                        PlayerAC.message(player, "нужен " + parameter + " уровня " + value);
                    }*/
                }else{
                    ItemA.setArmor(slot, 0, 0, 0, null);
                    b.spawnDroppedItem(coords.x, coords.y, coords.z, id, 1, item.data, item.extra);
                }
            }
        });
    }, 
    setUsingItem: function (item, parameter, value){
        Callback.addCallback("ServerPlayerTick", function(player, isPlayerDead){
            let item2 = Entity.getCarriedItem(player);
            let pos = Entity.getPosition(player);
            if(item2.id == item.id){
               if(MagicCore.getValue(player)[parameter] < value){
                   BlockSource.getDefaultForActor(player).spawnDroppedItem(pos.x+Math.random()*2, pos.y-1, pos.z+Math.random()*2, item2.id, item2. count, item2.data, item2.extra);
                   Entity.setCarriedItem(player, 0, 0, 0);
                   PlayerAC.message(player, "нужен " + parameter + " уровня " + value);
               } 
            }
        });
    },
    isClass: function (player){
        let key = Object.keys(classPlayer);
        let obj = {};
        if(classPlayer == {}){
                return false;
        }
        for(i in key){
            let k = key[i];
            obj[k] = true;
        }
        if(obj[player]){
            return true;
        }else{
            return false;
        }
    }, 
    isExistsClass: function (){
        if(classPlayer == {}){
            return false;
        }else{
            return true;
        }
    }, 
    getValue: function (player){
        let o;
        if(this.isClass(player)){
            o = classPlayer[player];
        }else{
            o = {
                name: "noy",
                magisMax: 0,
                magis: 0, 
                ProtectionMax: 0, 
                Protection: 0, 
                necromancerMax: 0, 
                necromancer: 0,
                AspectsMax: 2, 
                AspectsNow: 1, 
                Aspects: 0
            };
        }
        return o;
    }, 
    piece: function(player, parameter){
        if(this.isClass(player)){
            let cv = MagicCore.getValue(player);
            if(cv[parameter] + 1 <= cv[parameter+"Max"]){
                delItem2(player, {id:0,data:0,count:1});
                cv[parameter] += 1;
                PlayerAC.message(player, "§2параметр: "+parameter+" был улучшен на 1, теперь он равен "+cv[parameter]);
                MagicCore.setParameters(player, cv);
            }else{
                PlayerAC.message(player, "§4параметр "+parameter+" максимального уровня");
            }
        }else{
            PlayerAC.message(player, "§4у вас нет класса")
        }
    }, 
    setParameters: function (player, obj){
        if(this.isClass(player)){
            let r = Math.floor(Math.random()*20);
            if(obj.AspectsNow + r <= obj.AspectsMax) obj.AspectsNow += r;
            classPlayer[player] = obj;
            Network.sendToServer("aw.sp", classPlayer);
        }
    },
    armorMagic: {},
    addArmorMagic: function (id, type, value){
        this.armorMagic[id] = {
            type: type,
            value: value
        };
    },
    getArmorMagic: function (ent){
        let arm = {};
        if(this.armorMagic[Entity.getArmorSlot(ent, 0).id]){
            arm.helmet = this.armorMagic[Entity.getArmorSlot(ent, 0).id];
        }else{
            arm.helmet = {
                type: "noy",
                value: 0
            };
        }
        if(this.armorMagic[Entity.getArmorSlot(ent, 1).id]){
            arm.chestplate = this.armorMagic[Entity.getArmorSlot(ent, 1).id];
        }else{
            arm.chestplate = {
                type: "noy",
                value: 0
            };
        }
        if(this.armorMagic[Entity.getArmorSlot(ent, 2).id]){
            arm.leggings = this.armorMagic[Entity.getArmorSlot(ent, 2).id];
        }else{
            arm.leggings = {
                type: "noy",
                value: 0
            };
        }
        if(this.armorMagic[Entity.getArmorSlot(ent, 3).id]){
            arm.boots = this.armorMagic[Entity.getArmorSlot(ent, 3).id];
        }else{
            arm.boots = {
                type: "noy",
                value: 0
            };
        }
        return arm;
    },
    damage: function (ent, type, damage){
        let arm = this.getArmorMagic(ent);
        if(type == "magic"){
            let dmg = damage;
            if(arm.helmet.type == "magic"){
                dmg -= arm.helmet.value || 0;
            }
            if(arm.chestplate.type == "magic"){
                dmg -= arm.chestplate.value || 0;
            }
            if(arm.leggings.type == "magic"){
                dmg -= arm.leggings.value || 0;
            }
            if(arm.boots.type == "magic"){
                dmg -= arm.boots.value || 0;
            }
            if(dmg >= 1) Entity.damageEntity(ent, dmg);
        }else if(type == "dead"){
            let m = "y";
            let dmg = damage;
            if(arm.helmet.type == "dead"){
                m = "n";
                dmg -= arm.helmet.value || 0;
            }
            if(arm.chestplate.type == "dead"){
                m = "n";
                dmg -= arm.chestplate.value || 0;
            }
            if(arm.leggings.type == "dead"){
                m = "n";
                dmg -= arm.leggings.value || 0;
            }
            if(arm.boots.type == "dead"){
                m = "n";
                dmg -= arm.boots.value || 0;
            }
            if(m == "y"){
                Entity.setHealth(ent, 0);
            }else{
                if(dmg >> 0) Entity.damageEntity(ent, dmg);
            }
        }
    }
};
Network.addServerPacket("aw.sp", function(client, data) {
    classPlayer = data;
});
MagicCore.setArmor(310, "Protection", 50);
MagicCore.setArmor(311, "Protection", 50);
MagicCore.setArmor(312, "Protection", 50);
MagicCore.setArmor(313, "Protection", 50);

MagicCore.setArmor(314, "Protection", 40);
MagicCore.setArmor(315, "Protection", 40);
MagicCore.setArmor(316, "Protection", 40);
MagicCore.setArmor(317, "Protection", 40);

MagicCore.setArmor(306, "Protection", 30);
MagicCore.setArmor(307, "Protection", 30);
MagicCore.setArmor(308, "Protection", 30);
MagicCore.setArmor(309, "Protection", 30);

MagicCore.setArmor(302, "Protection", 20);
MagicCore.setArmor(303, "Protection", 20);
MagicCore.setArmor(304, "Protection", 20);
MagicCore.setArmor(305, "Protection", 20);

MagicCore.setArmor(298, "Protection", 10);
MagicCore.setArmor(299, "Protection", 10);
MagicCore.setArmor(300, "Protection", 10);
MagicCore.setArmor(301, "Protection", 10);

MagicCore.setUsingItem({id: 276, data: 0}, "Protection", 45);
MagicCore.setUsingItem({id: 269, data: 0}, "Protection", 5);
MagicCore.setUsingItem({id: 272, data: 0}, "Protection", 15);
MagicCore.setUsingItem({id: 267, data: 0}, "Protection", 25);
MagicCore.setUsingItem({id: 283, data: 0}, "Protection", 30);
MagicCore.setUsingItem({id: 368, data: 0}, "magis", 5);
MagicCore.setUsingItem({id: 381, data: 0}, "magis", 10);
MagicCore.setUsingItem({id: 432, data: 0}, "magis", 20);
MagicCore.setUsingItem({id: 322, data: 0}, "necromancer", 10);
MagicCore.setUsingItem({id: 373, data: 0}, "magis", 30);
MagicCore.setUsingItem({id: 438, data: 0}, "magis", 35);
MagicCore.setUsingItem({id: 441, data: 0}, "magis", 40);
