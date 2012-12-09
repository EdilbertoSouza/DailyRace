var laneControl = cc.Sprite.extend({
    currentPosition:0,
	acceleration: 0.1,
	braking: 0.4,
	velmax:8,
	velocity: 0,
	timeAcc: 0,
	timeBra: 0,
    ctor:function(){
        this.initWithFile(s_lane);
    },
    update:function(dt){
		this.velocity = (this.acceleration * this.timeAcc) - (this.braking * this.timeBra);
		if(this.velocity > this.velmax) this.velocity = this.velmax;
		if(this.velocity <= 0) {
			this.velocity = 0;
			this.timeAcc = 0;
			this.timeBra = 0;
		}
       	this.currentPosition -= this.velocity;
		this.validatePosition();
		this.setPosition(new cc.Point(220, this.currentPosition));
		//this.timeAcc -= 0.1;
    },
	validatePosition:function() {
		if(this.currentPosition < -1017) this.currentPosition = 1468;
        if(this.currentPosition > 1468) this.currentPosition = -1017;
	},
	setVelocity:function(value) {
		this.velocity = value;
		if(value == 0) {
			this.timeAcc = 0;
			this.timeBra = 0;
		}
	},
    handleKeyDown:function(e)
    {
        if(e === cc.KEY.up) {
            this.timeAcc++;
    		cc.AudioEngine.getInstance().setEffectsVolume(2.0);
    		soundAcc = cc.AudioEngine.getInstance().playEffect(s_acceleration, true);
        }
        if(e === cc.KEY.down) {
  			this.timeBra++;
    		soundBra = cc.AudioEngine.getInstance().playEffect(s_braking, false);
  		}
        //if(e === cc.KEY.m) {
        //	MobileGame.prototype.collisionEffect("Normal");
            //this.onPause();
  		//}
    },
    handleKeyUp:function(e)
    {
        if(e === cc.KEY.up) {
            cc.AudioEngine.getInstance().stopEffect(s_acceleration);
            //this.timeAcc--;
        }
        if(e === cc.KEY.down) {
        	if(soundBra !== null) {
    			cc.AudioEngine.getInstance().stopEffect(soundBra);
    			soundBra = null;
    		}
  		}
    },
});

