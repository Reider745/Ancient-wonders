IMPORT("DungeonAPI");
IMPORT("ToolLib");
Dungeon.setDir("assets/structure");

Callback.addCallback("LevelDisplayed", function() {
   setTimeout(function (){
Game.message(Translation.translate("§2Thank you for downloading the Ancient wonders mod \n§3in the VKontakte group you can follow the development of the mod - https://vk.com/club186544580"));
}, 40);
});
Translation.addTranslation("§2Thank you for downloading the Ancient wonders mod \n§3in the VKontakte group you can follow the development of the mod - https://vk.com/club186544580", {ru: "§2Спасибо что скачали мод Ancient wonders! \n§3в группе ВКонтакте вы сможете следить за развитием мода - https://vk.com/club186544580"});

const config = FileTools.ReadJSON(__dir__+"/config.json");

let prot = {};
let EntityReg = {
    setPrototype: function (type, obj){
        obj.tick = obj.tick || function(ent){};
        obj.damage = obj.damage || function(attacker, victim, damageValue, damageType, someBool1, someBool2){};
        prot[type] = obj;
    },
    getPrototype: function (ent){
        let name = Entity.getTypeName(ent);
        if(prot[name]){
            return prot[name];
        }else{
            return {tick: function(ent){}, damage: function(attacker, victim, damageValue, damageType, someBool1, someBool2){}};
        }
    },
    
};
Callback.addCallback("LocalTick", function(){
    let ents = Entity.getAll();
    for(let i in ents){
        EntityReg.getPrototype(ents[i]).tick(ents[i]);
    }
});
Callback.addCallback('EntityHurt', function (attacker, victim, damageValue, damageType, someBool1, someBool2) {
   EntityReg.getPrototype(victim).damage(attacker, victim, damageValue, damageType, someBool1, someBool2);
});
if(config.beta_mode){
EntityReg.setPrototype("aw:tanatos<>", {
    tick: function(ent){
        if(World.getThreadTime()%20) if(Entity.getTarget(ent) == -1){
            let ents = Entity.getAllInRange(Entity.getPosition(ent), 20);
            let r = Math.floor(Math.random()*(ents.length-1));
            if(Entity.getTypeName(ents[r]) != Entity.getTypeName(ent) && Entity.getTypeName(ents[r]) != "minecraft:item<>") Entity.setTarget(ent, ents[r]);
        }else{
            if(Math.random()<=0.005){
                Wands.emitterEntity(ent, {
                    srollType: ItemID.sroll2,
                    sroll: [ItemID.sroll20]
                });
                Wands.emitterEntity(ent, {
                    srollType: ItemID.sroll2,
                    sroll: [ItemID.sroll20, ItemID.sroll27, ItemID.sroll23]
                });
            }
            if(Math.random()<=0.2){
                Wands.emitterEntity(ent, {
                    srollType: ItemID.sroll2,
                    sroll: [ItemID.sroll22]
                });
            }
        }
    },
    damage: function(attacker, ent, damageValue, damageType, someBool1, someBool2){
        Entity.setTarget(ent, attacker);
        if(damageType == 5){
            Game.prevent();
        }else if(damageType == 3){
            Game.prevent();
        }
        if(Math.random()<=0.2){
            Wands.emitterEntity(ent, {
                srollType: ItemID.sroll2,
                sroll: [ItemID.sroll21]
            });
        }
    }
});
}

function attack(ent){
    let pos = Entity.getPosition(ent);
    pos.y += 5;
    for(let i = 0;i <= Math.floor(Math.random()*5)+5;i++){
        let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(ent));
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
                if(ent3[i1] != ent) MagicCore.damage(ent3[i1], "magic", 40);
            }
             if(World.getBlockID(coord.x,coord.y,coord.z)!=0){
                break;
            }
            Mp.spawnParticle(ParticlesAPI.part3, coord.x, coord.y, coord.z);
        }
    }
}
let entId = {};
EntityReg.setPrototype("aw:skeleton<>", {
    tick: function (ent){
        if(Entity.getTarget(ent) == -1 && World.getThreadTime()%20){
            let ents = Entity.getAllInRange(Entity.getPosition(ent), 20);
            let r = Math.floor(Math.random()*(ents.length-1));
            if(ents[r] != entId[ent] && Entity.getTypeName(ents[r]) != Entity.getTypeName(ent) && Entity.getTypeName(ents[r]) != "minecraft:item<>") Entity.setTarget(ent, ents[r]);
        }else if(Math.random() <= 0.1){
            let pos = Entity.getPosition(ent);
            let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(ent));
            for(let i = 0;i<20;i++){
                let coord = {
                    x: pos.x+(i * vel.x / 2),
                    y: pos.y+1.5+(i * vel.y / 2),
                    z: pos.z+(i * vel.z / 2)
                };
                let ent3 = Entity.getAllInRange(coord, 2);
                for(let i1 in ent3){
                    if(ent3[i1] != ent) MagicCore.damage(ent3[i1], "magic", 4);
                }
                 if(World.getBlockID(coord.x,coord.y,coord.z)!=0){
                    break;
                }
                Mp.spawnParticle(ParticlesAPI.part3, coord.x, coord.y, coord.z);
            }
        }
    },
    damage: function (attacker, ent, damageValue, damageType, someBool1, someBool2){
        let ents = Entity.getAllInRange(Entity.getPosition(ent), 30);
        let r = Math.floor(Math.random()*ents.length-1);
        if(ents[r] != entId[ent]) Entity.setTarget(ent, attacker);
    }
});
EntityReg.setPrototype("aw:boss0<>", {
    tick: function (ent){  
    if(World.getThreadTime()%20){
        if(Math.random()<=0.01){
            Wands.emitterEntity(ent, {
                srollType: ItemID.sroll2,
                sroll: [ItemID.sroll19]
            });
        }
        if(Math.random()<=0.01){
            Wands.emitterEntity(ent, {
                srollType: ItemID.sroll2,
                sroll: [ItemID.sroll5]
            });
        }
        if(Entity.getTarget(ent) != -1){
            if(Math.random()<=0.1){
                Wands.emitterEntity(ent, {
                    srollType: ItemID.sroll2,
                    sroll: [ItemID.sroll18]
                });
            }
            let ents = Entity.findNearest(Entity. getPosition(ent), 1, 4);
            if(ents){
                Entity.setTarget(ent, ents);
                let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(ent));
                Entity.addVelocity(ents, vel.x, vel.y, vel.z);
                Wands.emitterEntity(ent, {
                    srollType: ItemID.sroll2,
                    sroll: [ItemID.sroll16]
                });
                attack(ent);
            }
            ents = Entity.getAllInRange(Entity.getPosition(ent), 30, [1]);
            for(let i in ents){
                let range = Entity.getDistanceToEntity(ent, ents[i], [Entity. getType(Entity.getTarget(ent))]);
                if(range >= 20){
                    if(Math.random()<=0.5){
                        Entity.setTarget(ent, ents[i]);
                        Wands.emitterEntity(ent, {
                            srollType: ItemID.sroll2,
                            sroll: [ItemID.sroll16]
                        });
                        Wands.emitterEntity(ent, {
                            srollType: ItemID.sroll2,
                            sroll: [ItemID.sroll15]
                        });
                    }else{
                        Wands.emitterEntity(ent, {
                            srollType: ItemID.sroll2,
                            sroll: [ItemID.sroll5]
                        });
                    }
                }else{
                    Entity.setTarget(ent, ents[i]);
                }
            }
        }else{
            let ents = Entity.getAllInRange(Entity.getPosition(ent), 35);
            Entity.setTarget(ent, ents[Math.floor(Math.random()*(ents.length-1))]);
        }
      }
    },
    damage: function(attacker, ent, damageValue, damageType, someBool1, someBool2){
        if(attacker) Entity.setTarget(ent, attacker);
        if(damageType == 5){
            Game.prevent();
        }else if(damageType == 3){
            Game.prevent();
        }
        if(Math.random()<=0.2){
            Wands.emitterEntity(ent, {
                srollType: ItemID.sroll2,
                sroll: [ItemID.sroll20]
            });
        }
    }
});
Callback.addCallback('EntityDeath', function (entity, attacker, damageType) {
    if(Entity.getTypeName(entity) == "aw:boss0<>"){
        let B = BlockSource.getDefaultForActor(entity);
        let pos = Entity.getPosition(entity);
        if(Math.random()<=0.2){
            B.spawnDroppedItem(pos.x, pos.y, pos.z, ItemID.sroll17, 1, 0, null);
        }
        if(Math.random()<=0.6){
            B.spawnDroppedItem(pos.x, pos.y, pos.z, ItemID.sroll20, 1, 0, null);
        }
        if(Math.random()<=0.5){
            B.spawnDroppedItem(pos.x, pos.y, pos.z, ItemID.sroll15, 1, 0, null);
        }
        B.spawnDroppedItem(pos.x, pos.y, pos.z, ItemID.sroll16, 1, 0, null);
    }
});
