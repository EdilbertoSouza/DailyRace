var GameOverLayer = cc.Layer.extend({
    ctor:function() {

        // background layer: another image
        var background = cc.Sprite.create(s_background);
        background.setAnchorPoint(cc.p(0, 0));
        this.addChild(background);

        // Replay
    	var lblReplay = cc.LabelTTF.create( "Jogar Novamente", "Helvetica", 36 );
        var itemReplay = cc.MenuItemLabel.create(lblReplay, this, function() {
    		cc.AudioEngine.getInstance().playBackgroundMusic(s_bgSound, true);
        	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new MobileGameScene()));
        });
        var menuReplay = cc.Menu.create(itemReplay);
        menuReplay.setPosition( cc.p( 205, 59 ) );
        this.addChild(menuReplay);

		// Menu
    	var lblMenu = cc.LabelTTF.create( "Menu Inicial", "Helvetica", 36 );
        var itemMenu = cc.MenuItemLabel.create(lblMenu, this, function() {
        	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new MenuScene()));
        });
        var menu = cc.Menu.create(itemMenu);
        menu.setPosition( cc.p( 492, 59 ) );
        this.addChild(menu);
    }
});

GameOverScene = cc.Scene.extend({
	onEnter:function() {
		this._super();
		var layer = new GameOverLayer();
		layer.init();
		this.addChild(layer);
	}
})

