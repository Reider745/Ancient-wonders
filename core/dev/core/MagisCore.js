Network.addClientPacket("aw.classPlayer", function(packetData) {
    classPlayer[packetData.player] = Class[packetData.Class];
});
Network.addClientPacket("aw.parameterAdd", function(packetData) {
    MagicCore.piece(packetData.player, packetData.parameter);
});
var classPlayer = {};
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
        magisMax: 10,
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
    if(classPlayer != false){
        let r = Math.floor(Math.random()*10)
        if(c.Aspects + r <= c.AspectsNow){
            classPlayer[player].Aspects += r;
        }else{
            classPlayer[player].Aspects = c.AspectsNow;
        }
        
    }
});
Saver.addSavesScope("BackpacksScope",
    function read(scope) {
        classPlayer = scope.classPlayer || {};
    },
    function save() {
        return {
            classPlayer: classPlayer,
        };
    }
);
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
                    }else{
                        Game.message("требуется "+parameter+" уровня "+value)
                    }
                }else{
                    ItemA.setArmor(slot, 0, 0, 0, null);
                    b.spawnDroppedItem(coords.x, coords.y, coords.z, id, 1, item.data, item.extra);
                }
            }
        });
    }, 
    isClass: function (player){
        let key = Object.keys(classPlayer);
        if(classPlayer == {}){
                return false;
        }
        for(i in key){
            if(key[i] == player){
                return true;
            }else{
                return false;
            }
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
        let o = {
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
        if(!this.isClass()){
            o = classPlayer[player];
        } 
        return o;
    }, 
    piece: function(player, parameter){
        if(MagicCore.isClass(player)){
            let cv = MagicCore.getValue(player);
            if(cv[parameter] + 5 <= cv[parameter+"Max"]){
                Player.decreaseCarriedItem(1) ;
                cv[parameter] += 5;
                Game.message("§2параметр: "+parameter+" был улучшен на 5 теперь он равен "+cv[parameter]);
                classPlayer[player] = cv;
            }else{
                Game.message("§4параметр "+parameter+" максимального уровня");
            }
        }else{
            Game.message("§4у вас нет класса")
        }
    }
};
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
