(function(window, modules){

  modules.define('Scene',
    [
      'tools',
      'consts',
      'PubSub',
      'AppCanvas',
      'LightPair',
      'Traffic',
      'StateLoop',
      'Countdown',
      'Debouncer'
    ],
    function(
      provide,
      tools,
      consts,
      PubSub,
      AppCanvas,
      LightPair,
      Traffic,
      StateLoop,
      Countdown,
      Debouncer
    ){

      var Scene = tools.extend(PubSub),

          $class = Scene,
          $super = $class.superclass;

      _.extend($class.prototype, {

        initialize : function() {
          $super.initialize.apply(this, arguments);

          this._enabled                  = false;
          this._appCanvas                = null;
          this._stateLoop                = null;
          this._lightPairs               = [];
          this._lightPairHor             = null;
          this._lightPairVer             = null;
          this._activePair               = consts.LIGHT_PAIR_ORIENTATION_HOR;
          this._countdown                = null;
          this._trafficHor               = null;
          this._trafficVer               = null;
          this._trafficParticleGenerator = null;

          this._initLightPairs();
          this._initCountdown();
          this._initTraffic();
          this._initAppCanvas();
          this._initStateLoop();
          this._initTrafficParticleGenerator();
        },

        _initLightPairs : function() {
          this._lightPairs = [
            this._lightPairHor = new LightPair({ orientation: consts.LIGHT_PAIR_ORIENTATION_HOR }),
            this._lightPairVer = new LightPair({ orientation: consts.LIGHT_PAIR_ORIENTATION_VER })
          ];
        },

        _initCountdown : function() {
          this._countdown = new Countdown();
        },

        _initTraffic : function() {
          this._trafficHor = new Traffic({ direction: consts.TRAFFIC_DIRECTION_HOR });
          this._trafficVer = new Traffic({ direction: consts.TRAFFIC_DIRECTION_VER });
        },

        _initAppCanvas : function() {
          this._appCanvas = new AppCanvas();
          this._appCanvas.addChild(this._countdown);
          this._appCanvas.addChild(this._trafficHor);
          this._appCanvas.addChild(this._trafficVer);
          this._appCanvas.addChild(this._lightPairHor);
          this._appCanvas.addChild(this._lightPairVer);
        },

        _initStateLoop : function() {
          this._stateLoop = new StateLoop();
          this._stateLoop.registerState([
            {
              state:    consts.TRAFFIC_STATE_GO,
              to:       consts.TRAFFIC_STATE_HOLD,
              duration: 5000,
              callback: function() {
                this._turnActiveLightPairMode(consts.LIGHT_MODE_GREEN);
                this._turnParticlesOn();
                this._toggleTrafficsDowntime();
              }.bind(this)
            },
            {
              state:    consts.TRAFFIC_STATE_HOLD,
              to:       consts.TRAFFIC_STATE_STOP,
              duration: 1000,
              callback: function() {
                this._turnActiveLightPairMode(consts.LIGHT_MODE_ORANGE);
                this._turnParticlesOff();
                this._toggleTrafficsDowntime();
              }.bind(this)
            },
            {
              state:    consts.TRAFFIC_STATE_STOP,
              to:       consts.TRAFFIC_STATE_GO,
              duration: 1000,
              callback: function() {
                this._turnActiveLightPairMode(consts.LIGHT_MODE_RED);
                this._switchActiveLightPair();
              }.bind(this)
            }
          ]);
          this._stateLoop.on('tick', function(data) {
            if (this._countdown) {
              this._countdown.val((data.timeLeftBeforeNextState / 1000).toFixed(1));
            }
          }.bind(this))
        },

        _initTrafficParticleGenerator : function() {
          this._trafficParticleGenerator = new Debouncer({
            timeout: 100,
            callback : function() {
              if (this._enabled) {
                this._getCurrentTraffic().addParticle();
              }
            }.bind(this)
          });
        },

        _turnActiveLightPairMode : function(lightMode) {
          this._getActiveLightPair().setMode(lightMode);
        },

        _getActiveLightPair : function() {
          return this._lightPairs.filter(function(pair){
            return pair.getOrientation() === this._activePair;
          }.bind(this))[0];
        },

        _turnParticlesOn : function() {
          this._trafficParticleGenerator.start();
        },

        _turnParticlesOff : function() {
          this._trafficParticleGenerator.stop();
          this._clearParticles();
        },

        _clearParticles : function() {
          this._trafficHor.clear();
          this._trafficVer.clear();
        },

        _getCurrentTraffic : function() {
          return this._activePair === consts.LIGHT_PAIR_ORIENTATION_VER ? this._trafficHor : this._trafficVer;
        },

        _getWaitingTraffic : function() {
          return this._activePair === consts.LIGHT_PAIR_ORIENTATION_VER ? this._trafficVer : this._trafficHor;
        },

        _toggleTrafficsDowntime : function() {
          this._getCurrentTraffic().idle(false);
          this._getWaitingTraffic().idle(true);
        },

        _switchActiveLightPair : function() {
          this._activePair = (this._getActiveLightPair().getOrientation() === consts.LIGHT_PAIR_ORIENTATION_HOR ? consts.LIGHT_PAIR_ORIENTATION_VER : consts.LIGHT_PAIR_ORIENTATION_HOR);
        },

        start : function() {
          this._enabled = true;
          this._stateLoop.start();
        },

        stop : function() {
          this._enabled = false;
          this._stateLoop.stop();
        },

        toggle : function() {
          this._enabled ? this.stop() : this.start();
        },

        draw : function() {
          this._appCanvas.draw();
        }

      });

      provide(Scene);

    });

}(this, this.modules));