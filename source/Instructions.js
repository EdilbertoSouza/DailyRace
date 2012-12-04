var InstructionsLayer = cc.Layer.extend({
    ctor:function() {

        // background layer: another image
        var background = cc.Sprite.create(s_background2);
        background.setAnchorPoint(cc.p(0, 0));
        this.addChild(background);

		// Menu
    	var lblMenu = cc.LabelTTF.create( "Menu Inicial", "Helvetica", 36 );
    	//lblMenu.setColor(cc.yellow())
        var itemMenu = cc.MenuItemLabel.create(lblMenu, this, function() {
        	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new MenuScene()));
        });
        var menu = cc.Menu.create(itemMenu);
        menu.setPosition( cc.p( 300, 59 ) );
        this.addChild(menu);
    }
});

InstructionsScene = cc.Scene.extend({
	onEnter:function() {
		this._super();
		var layer = new InstructionsLayer();
		layer.init();
		this.addChild(layer);
	}
})

