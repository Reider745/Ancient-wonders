Math.sign = Math.sign || function(x) { 
    x = +x;
    if (x === 0) { 
        return x; 
    } 
    return x > 0 ? -0.1 : 0.1; 
}
Network.addClientPacket("aw.particle", function(packetData) {
    Particles.addParticle(packetData.p, packetData.x, packetData.y, packetData.z, packetData.vx, packetData.vy, packetData.vz, packetData.ax, packetData.ay, packetData.az);
});
var Mp = {
    spawnParticle: function (type, x, y, z, vx, vy, vz, ax, ay, az){
            vx = vx || 0;
            vy = vy || 0;
            vz = vz || 0;
            ax = ax || 0;
            ay = ay || 0;
            az = az || 0;
            var players = Network.getConnectedPlayers();
            for(var i in players){
                var client = Network.getClientForPlayer(players[i]);
                if(client){
                    client.send("aw.particle", {p: type, x: x, y: y, z: z, vx: vx, vy: vy, vz: vz, ax: ax, ay: ay, az: az});
                }
            }
        
    }
};
var ParticlesAPI = {
   part1: Particles.registerParticleType({
        texture: "aw_magis",
        render: 2,
        size: [2, 2],
        lifetime:[50, 50],
        animators: {
            alpha:{fadeIn: .4, fadeOut: .4},
            size:{fadeOut: .5, fadeIn:0.2, start:0, end:0}
        }
    }),
    part2: Particles.registerParticleType({
        texture: "aw_magis",
        render: 2,
        size: [2, 2],
        lifetime:[50, 50],
        color: [84, 5, 5, 1],
        animators: {
            alpha:{fadeIn: .4, fadeOut: .4},
            size:{fadeOut: .5, fadeIn:0.2, start:0, end:0}
        }
    }),
    part3: Particles.registerParticleType({
        texture: "aw_magis",
        render: 2,
        size: [2, 2],
        lifetime:[50, 50],
        color: [255, 255, 0, 1],
        animators: {
            alpha:{fadeIn: .4, fadeOut: .4},
            size:{fadeOut: .5, fadeIn:0.2, start:0, end:0}
        }
    }),
    part4: Particles.registerParticleType({
        texture: "aw_magis",
        render: 2,
        size: [2, 2],
        lifetime:[50, 50],
        color: [227, 0, 72, 1],
        animators: {
            alpha:{fadeIn: .4, fadeOut: .4},
            size:{fadeOut: .5, fadeIn:0.2, start:0, end:0}
        }
    }),
    part5: Particles.registerParticleType({
        texture: "aw_magis",
        render: 2,
        size: [2, 2],
        lifetime:[1,1],
        color: [227, 0, 72, 1] 
    }),
    getVector: function (pos1, pos2){
        return {
            x: Math.max(pos1.x, pos2.x)-Math.min(pos1.x, pos2.x),
            y: Math.max(pos1.y, pos2.y)-Math.min(pos1.y, pos2.y),
            z: Math.max(pos1.z, pos2.z)-Math.min(pos1.z, pos2.z)
        };
    },
    coords: function(part, x1, y1, z1, x2, y2, z2, time){
        var vx = -((x1 + 0.5) - (x2 + 0.5)) / time;
        var vy = -((y1 + 0.5) - (y2 + 0.5)) / time;
        var vz = -((z1 + 0.5) - (z2 + 0.5)) / time;
        Mp.spawnParticle(part, x1 + 0.5, y1 + 0.5, z1 + 0.5, vx, vy, vz);
    },
    spawnLine: function (part, x1, y1, z1, x2, y2, z2, count){
        for(i = 0; i<=count;i++){
            var x = x1 + (-(x1 - x2)) * (i / count);
            var y = y1 + (-(y1 - y2)) * (i / count);
            var z = z1 + (-(z1 - z2)) * (i / count);
            Mp.spawnParticle(part, x + 0.5, y + 0.5, z + 0.5, 0, 0, 0);
        }
    },
    spawnCircle: function (particles, x, y, z, radius, count, rotation){
        let angle = 0;
        let step = 360 / count;
        if(rotation == 0){
             for(i = 0;i < 360;i+=step){
                let x1 = x + radius * Math.cos(i);
                let y1 = y - radius * Math.sin(i);
                Mp.spawnParticle(particles, x1 + 0.5, y1 + 0.5, z + 0.5, 0, 0, 0);
            }
        }
        if(rotation == 1){
            for(i = 0;i < 360;i+=step){
                let z1 = z + radius * Math.cos(i);
                let y1 = y - radius * Math.sin(i);
                Mp.spawnParticle(particles, x + 0.5, y1 + 0.5, z1 + 0.5, 0, 0, 0);
            }
        }
        if(rotation == 2){
            for(i = 0;i < 360;i+=step){
                let x1 = x + radius * Math.cos(i);
                let z1 = z - radius * Math.sin(i);
                Mp.spawnParticle(particles, x1 + 0.5, y + 0.5, z1 + 0.5, 0, 0, 0);
            }
        }
    },
    spawnCircleVector: function (time, particle, x, y, z, radius, count){
        let angle = 0;
        let step = 360 / count;
        for(i = 0;i < 360;i+=step){
            let x1 = x + radius * Math.cos(i);
            let z1 = z - radius * Math.sin(i);
            Mp.spawnParticle(particle, x1 + 0.5, y + 0.5, z1 + 0.5, -Math.sign(x1 - x), 0, -Math.sign(z1 - z));
        }
    },
    spawnShellEnt: function (part, ent, distante, damage){
        let pos = Entity.getPosition(ent);
        let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(ent));
        for(let i = 0;i<distante;i++){
            let coord = {
                x: pos.x+(i * vel.x / 2),
                y: pos.y+0.5+(i * vel.y / 2),
                z: pos.z+(i * vel.z / 2)
            };
            let ent3 = Entity.getAllInRange(coord, 2);
            for(let i1 in ent3){
                if(ent3[i1] != ent) MagicCore.damage(ent3[i1], "magic", damage);
            }
             if(BlockSource.getDefaultForActor(ent).getBlockId(coord.x,coord.y,coord.z)!=0){
                break;
            }
            Mp.spawnParticle(part, coord.x, coord.y, coord.z);
        }
    },
    spawnCircle2: function (particles, x, y, z, radius, count, time){
        let circle = 0;
        for(let i = 0;i<=count;i++){
            setTimeout(function(){
                let x1 = x + radius * Math.cos(circle);
                let z1 = z - radius * Math.sin(circle);
                Mp.spawnParticle(particles, x1 + 0.5, y + 0.5, z1 + 0.5, 0, 0, 0);
                circle+=360/count/i;
            }, time * i * 2);
        }
    },
};
