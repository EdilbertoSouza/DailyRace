var carControl = cc.Sprite.extend({
	initX:0,
	initY:0,
    posX:0,
	posY:0,
	velocity: 0,
	sense:"Normal",
	sizeBand:70,
	factor:1,
    ctor:function(posX, posY, velocity, sense) {
        this.initX = this.posX = posX;
        this.initY = this.posY = posY;
        this.velocity = velocity / 10;
        if(sense !== null) this.sense = sense;
		this.setPosition(new cc.Point(this.initX, this.initY));
        if(this.sense == "Normal"){
        	this.initWithFile(s_car);
        } else { // Contrario
        	this.initWithFile(s_car2);
        }
    },
    update:function(laneVelocity) {
        if(this.sense == "Normal"){
			this.posY = this.posY - laneVelocity + this.velocity;
    	} else { // contrário
    		this.posY = this.posY - laneVelocity - this.velocity;
    		if(laneVelocity == 0) this.posY = this.initY;
    	}
		this.changePosition();
    },
	changePosition:function() {
        if(this.sense == "Normal") {
	   		if(this.posY < -070) {
	   			this.posX = this.initX + (this.generateNumber(1, 3) * 15 * this.factor);
	   			this.posY = 670;
	   		}
    	    if(this.posY > 670)  this.posY = -070;
	   		if(this.posX < 220)  this.posX = 220;
	   		if(this.posX > 220 + this.sizeBand)  this.posX = 220 + this.sizeBand;
        } else { // contrário
	   		if(this.posY < -500) {
	   			this.posX = this.initX + (this.generateNumber(1, 3) * 15 * this.factor);
	   			this.posY = 670;
	   		}
        	if(this.posY > 670)  this.posY = -500;
	   		if(this.posX < 180)  this.posX = 180;
	   		if(this.posX > (180 + this.sizeBand))  this.posX = (180 + this.sizeBand);
        }
        this.factor = this.factor * -1;
        this.setPosition(new cc.Point(this.posX, this.posY));
    },
	generateNumber:function(limitBot, limitTop) {
		var number = limitTop - limitBot;
		var randon = Math.random() * number;
		randon = Math.floor(randon);
		if(randon < limitBot) randon = limitBot;
		if(randon > limitTop) randon = limitTop;
		return randon;
	},
	collision:function(myCarPosition) {
		if(this.testCollisionX(myCarPosition.x, this.posX) && this.testCollisionY(myCarPosition.y, this.posY)) {
        	return true;
		}
		return false;
    },
	testCollisionX:function(myCarPosition, position) {
		if(myCarPosition-35 <=position-10 && position+10 <=myCarPosition+35) {
			return true;
		}
		return false;
	},
	testCollisionY:function(myCarPosition, position) {
		if(myCarPosition-67 <=position-11 && position+11 <=myCarPosition+67) {
			return true;
		}
		return false;
	},
});


