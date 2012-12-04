var laneControl = cc.Sprite.extend({
    currentPosition:460,
	acceleration: 0.1,
	braking: 0.4,
	velmax:18,
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
		this.setPosition(new cc.Point(270, this.currentPosition));
		this.validatePosition();
		this.timeAcc -= 0.1;
    },
	validatePosition:function() {
		if(this.currentPosition < 170) this.currentPosition = 460;
        if(this.currentPosition > 460) this.currentPosition = 170;
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

