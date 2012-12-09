var MenuLayer = cc.Layer.extend({
    ctor:function() {
        this.setTouchEnabled(false);
        this.setKeyboardEnabled(true);

	    //cc.log("play background music");
    	cc.AudioEngine.getInstance().setBackgroundMusicVolume(0.5);
    	cc.AudioEngine.getInstance().playBackgroundMusic(s_bgSound, true);

        // background layer: another image
        var background = cc.Sprite.create(s_background);
        // scale the image (optional) background.setScale(1);
        // change the transform anchor point (optional)
        background.setAnchorPoint(cc.p(0, 0));
        this.addChild(background);

        // Play
        var itemPlay = cc.MenuItemImage.create(s_play, s_play, this, this.menuPlay);
        var menuPlay = cc.Menu.create(itemPlay);
        menuPlay.setPosition( cc.p( 205, 059 ) );
        this.addChild(menuPlay);

		// About - Instructions
        var itemInstructions = cc.MenuItemImage.create(s_about, s_about, this, this.menuAbout);
        var menuInstructions = cc.Menu.create(itemInstructions);
        menuInstructions.setPosition( cc.p( 406, 059 ) );
        this.addChild(menuInstructions);
    },
	menuPlay:function() {
      	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new MobileGameScene()));
	},
	menuAbout:function() {
      	//cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new InstructionsScene()));
      	window.self.location.href = "./source/instructions.html";
	},
    onKeyDown:function(e){
        if(e === cc.KEY.i) {
        	this.menuPlay();
  		}
        if(e === cc.KEY.s) {
      		this.menuAbout();
  		}
	}
});

MenuScene = cc.Scene.extend({
	onEnter:function() {
		this._super();
		var layer = new MenuLayer();
		layer.init();
		this.addChild(layer);
	}
})

