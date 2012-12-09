var myCarControl = cc.Sprite.extend({
    _sideVelocity: 0,
    ctor:function(posX, posY) {
        this.initWithFile(s_my_car);
        this.setPosition(new cc.Point(posX,posY));
    },
    update:function(dt) {
		//this.setPosition(new cc.Point(this._currentPosition, this.getPosition().y));
		this.setPosition( new cc.pAdd(this.getPosition(), cc.p(this._sideVelocity,0)));
    },
    handleKeyUp:function(e) {
		this._sideVelocity = 0;
    },
    handleKeyDown:function(e) {
        if(e === cc.KEY.left) {
          	this._sideVelocity = -2;
        }
        else if(e === cc.KEY.right) {
          	this._sideVelocity = 2;
        }
    },
});


