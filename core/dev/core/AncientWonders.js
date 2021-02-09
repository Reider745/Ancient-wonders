let AncientWonders = {
    registerClass: function(data){
        let obj = {};
        obj.magisMax = data.magicMax || 0;
        obj.magis = data.magic || 0;
        obj.ProtectionMax = data.protectionMax || 0;
        obj.Protection = data.protectionMax || 0;
        obj.necromancerMax = data.necromancerMax || 0;
        obj.necromancer = data.necromancer || 0;
        obj.AspectsMax = data.aspectsMax || 0;
        obj.AspectsNow = data.aspectsNow || 0;
        obj.Aspects = data.aspects || 0;
        obj.name = data.name || "error";
        
        Class[data.name] = obj;
    },
    getDir: function(){
        return __dir__;
    }
};
