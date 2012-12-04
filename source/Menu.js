var MenuLayer = cc.Layer.extend({
    ctor:function() {

		this.setTouchEnabled(true)
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
        menuPlay.setPosition( cc.p( 205, 059 ) ); // 205, 352
        this.addChild(menuPlay);

		// Instructions
        var itemInstructions = cc.MenuItemImage.create(s_about, s_about, this, this.menuAbout);
        var menuInstructions = cc.Menu.create(itemInstructions);
        menuInstructions.setPosition( cc.p( 356, 059 ) );  // 356, 352
        this.addChild(menuInstructions);

        // Exit
        var itemExit = cc.MenuItemImage.create(s_exit, s_exit, this, this.menuExit);
        var menuExit = cc.Menu.create(itemExit);
        menuExit.setPosition( cc.p( 492, 059 ) ); // Sair 492, 352
        this.addChild(menuExit);
    },
	menuPlay:function() {
      	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new MobileGameScene()));
	},
	menuAbout:function() {
      	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new InstructionsScene()));
	},
	menuExit:function() {
      	//cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new InstructionsScene()));
      	this.onExit();
      	history.go(-1);
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


/*

        // Play
    	var lblPlay = cc.LabelTTF.create( "Jogar", "Helvetica", 64 );
        var itemPlay = cc.MenuItemLabel.create(lblPlay, this, function() {
        	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new MobileGameScene()));
        });
        var menuPlay = cc.Menu.create(itemPlay);
        menuPlay.setPosition( cc.p( 155, 062 ) ); // 205, 352  Sair 492, 352
        this.addChild(menuPlay);

		// Instructions
    	var lblInstructions = cc.LabelTTF.create( "Instrucoes", "Helvetica", 64 );
        var itemInstructions = cc.MenuItemLabel.create(lblInstructions, this, function() {
        	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new InstructionsScene()));
        });
        var menuInstructions = cc.Menu.create(itemInstructions);
        menuInstructions.setPosition( cc.p( 356, 352 ) );  // 356, 352
        this.addChild(menuInstructions);

*/
