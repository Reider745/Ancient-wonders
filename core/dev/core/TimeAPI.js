function TimerAPI (){
    let tick = 0;
    let active = false;
    this.RegisterFunction = function (time, func, f){
        Callback.addCallback("LocalTick", function(){
            if(active==true){
                if(tick>time){
                    if(f==false){
                        active = false;
                    }
                this.func = func;
                tick = 0;
                func(Player.get());
                }else{
                    tick++;
                }
            }
        });
    }
    this.start = function (){
        active = true;
        tick = 0;
    }
    this.stop = function (){
        active = false;
        tick = 0;
    }
    this.restart = function (){
        tick = 0;
    }
    this.getTick = function (){
        return tick;
    } 
    this.getActive = function (){
        return active;
    }
};
