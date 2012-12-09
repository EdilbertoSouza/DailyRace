var soundAcc = null;
var soundBra = null;

var MobileGame = cc.LayerColor.extend({
	lane:null,
	panel:null,
	mycar:null,
	car2:null,
	car3:null,
	car4:null,
	car5:null,
	time:0,
	velocity:0,
	distance:0,
	lblTime:null,
	lblVelocity:null,
	lblDistance:null,
	lblMsg:null,
	collision:false,

    init:function(){

        this._super();
        this.initWithColor(new cc.Color4B(255,255,255,70));
        this.setPosition(new cc.Point(0,0));
        this.schedule(this.update);
        var size = cc.Director.getInstance().getWinSize();

        this.setTouchEnabled(false);
        this.setKeyboardEnabled(true);

    	cc.AudioEngine.getInstance().setBackgroundMusicVolume(0.3);
   		cc.AudioEngine.getInstance().setEffectsVolume(1.5);

        this.lane = new laneControl();
        this.addChild(this.lane);
        this.lane.setPosition(new cc.Point(0,0));
        this.lane.scheduleUpdate();

        this.panel = new panelControl();
        this.addChild(this.panel);
        this.panel.setPosition(new cc.Point(523,223));

		//    ctor:function(posX, posY)
        this.mycar = new myCarControl(320,070);
        this.addChild(this.mycar);
        this.mycar.scheduleUpdate();

		//    ctor:function(posX, posY, velocity, sentido)
        this.car2 = new carControl(350,100,40,"Normal");
        this.addChild(this.car2);

        this.car3 = new carControl(250,300,40,"Normal");
        this.addChild(this.car3);

        this.car4 = new carControl(500,500,40,"Normal");
        this.addChild(this.car4);

        this.car5 = new carControl(180,-700,20,"Contrario");
        this.addChild(this.car5);

        this.lblVelocity = cc.LabelTTF.create("0", "Arial", 20);
        this.addChild(this.lblVelocity);
        this.lblVelocity.setPosition(cc.p(543, 414));
        this.lblVelocity.setColor(cc.yellow());

        this.lblDistance = cc.LabelTTF.create("", "Arial", 20);
        this.addChild(this.lblDistance);
        this.lblDistance.setPosition(cc.p(547, 340));

        this.lblTime = cc.LabelTTF.create("", "Arial", 20);
        this.addChild(this.lblTime);
        this.lblTime.setPosition(cc.p(555, 261));

        this.lblMsg = cc.LabelTTF.create("", "Arial", 18);
        this.addChild(this.lblMsg);
        this.lblMsg.setPosition(cc.p(450, 020));
        //this.lblMsg.setColor(cc.red());

        return true;
    },
    onEnter:function(){
        this._super();
    },
    onPause:function (sender) {
        if (cc.Director.getInstance().isPaused()) {
            cc.Director.getInstance().resume();
	    	cc.AudioEngine.getInstance().playBackgroundMusic(s_bgSound, false);
	    	//cc.AudioEngine.getInstance().playEffects(s_acceleration);
        } else {
    		cc.AudioEngine.getInstance().stopBackgroundMusic();
    		cc.AudioEngine.getInstance().stopEffect(soundAcc);
            cc.Director.getInstance().pause();
        }
    },
    update:function(dt){

    	if(this.collision == false) {

          	this.car2.update(this.lane.velocity);
           	if(this.car2.collision(this.mycar.getPosition())) this.collisionEffect("Normal");

           	this.car3.update(this.lane.velocity);
           	if(this.car3.collision(this.mycar.getPosition())) this.collisionEffect("Normal");

           	this.car4.update(this.lane.velocity);
           	if(this.car4.collision(this.mycar.getPosition())) this.collisionEffect("Normal");

           	this.car5.update(this.lane.velocity);
           	if(this.car5.collision(this.mycar.getPosition())) this.collisionEffect("Contrario");

           	this.changeLabels(dt);
        }
    },
	collisionEffect:function(sense){
		this.collision = true;
	    cc.AudioEngine.getInstance().stopBackgroundMusic();
  		cc.AudioEngine.getInstance().stopEffect(soundAcc);
   		cc.AudioEngine.getInstance().playEffect(s_collision, false);
       	if(sense == "Contrario"){
   			window.setTimeout("cc.AudioEngine.getInstance().playBackgroundMusic(s_end, false)", 3000);
   			window.setTimeout("cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0,new GameOverScene()))", 18000);
   		} else {
   			window.setTimeout("cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0,new GameOverScene()))", 3000);
   		}
	},
    changeLabels:function(dt){
    	// Change datas
        this.time += dt;
        this.velocity = this.lane.velocity * 10;
        this.distance += this.velocity / 3.6 * dt;
    	// Show datas
        this.lblTime.setString(Math.round(this.time) + " s");
        this.lblVelocity.setString(Math.round(this.velocity) + " km/h");
        this.lblDistance.setString(Math.round(this.distance) + " m");
        // Show Messages
        if(this.velocity <= 80) {
        	this.lblMsg.setString("");
            if(this.distance == 0 && this.time > 10) {
            	this.lblMsg.setString("De partida no carro");
            }
            if(this.distance > 0 && this.velocity < 40) {
            	this.lblMsg.setString("Acelera este carro");
            }
        } else {
        	if(this.velocity > 80) {
        		this.lblMsg.setString("Acima da velocidade");
        	}
        	if(this.velocity > 120) {
        		this.lblMsg.setString("Altissima velocidade");
        	}
        }
        if(this.distance > 1000 && this.distance < 1200){
         	this.lblMsg.setString("Parabens, voce percorreu 1km");
        }
        if(this.distance > 2000 && this.distance < 2200){
         	this.lblMsg.setString("Parabens, voce percorreu 2km");
        }
        if(this.distance > 2500 && this.distance < 2700){
         	this.lblMsg.setString("Falta apenas 500m para chegar");
        }
        if(this.collision) {
       		this.lblMsg.setString("Ha, que pena! Voce colidiu...");
   			this.lane.setVelocity(0);
        }
        return
    },
    onKeyDown:function(e){
        this.lane.handleKeyDown(e);
        this.mycar.handleKeyDown(e);
        if(e === cc.KEY.p) {
            this.onPause();
  		}
        if(e === cc.KEY.s) {
            this.onExit();
      		window.self.location.href = "index.html";
  		}
    },
    onKeyUp:function(e){
		this.lane.handleKeyUp(e);
		this.mycar.handleKeyUp(e);
    }
});

var panelControl = cc.Sprite.extend({
    ctor:function(){
        this.initWithFile(s_panel);
    },
});

MobileGameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new MobileGame();
        layer.init();
        this.addChild(layer);
    }
});


