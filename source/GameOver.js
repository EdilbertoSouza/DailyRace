var GameOverLayer = cc.Layer.extend({
    ctor:function() {

        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);

        // background layer: another image
        var background = cc.Sprite.create(s_game_over);
        background.setAnchorPoint(cc.p(0, 0));
        this.addChild(background);

        // Replay
        var itemReplay = cc.MenuItemImage.create(s_replay, s_replay, this, this.menuReplay);
        itemReplay.setScale(0.8);
        var menuReplay = cc.Menu.create(itemReplay);
        menuReplay.setPosition( cc.p( 165, 059 ) );
        this.addChild(menuReplay);

		// Menu Inicial
        var itemMenuInicial = cc.MenuItemImage.create(s_menu, s_menu, this, this.menuInicial);
        var menuInicial = cc.Menu.create(itemMenuInicial);
        menuInicial.setPosition( cc.p( 470, 059 ) );
        this.addChild(menuInicial);
    },
	menuReplay:function() {
	   	cc.AudioEngine.getInstance().playBackgroundMusic(s_bgSound, true);
      	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new MobileGameScene()));
	},
	menuInicial:function() {
      	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new MenuScene()));
	},
    onKeyDown:function(e){
        if(e === cc.KEY.j) {
        	this.menuReplay();
  		}
        if(e === cc.KEY.m) {
      		this.menuInicial();
  		}
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

