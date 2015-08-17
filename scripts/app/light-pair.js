(function(window, modules){

  modules.define(
    'LightPair',
    [
      'tools',
      'consts',
      'Drawable',
      'Light'
    ],
    function(
      provide,
      tools,
      consts,
      Drawable,
      Light
    ) {

      var LightPair = tools.extend(Drawable),

          $class = LightPair,
          $super = $class.superclass;

      _.extend($class.prototype, {

        initialize : function(config) {
          $super.initialize.apply(this, arguments);

          this._orientation = null;
          this._lights      = [];

          if (config) {
            if (config.orientation) {
              this._orientation = config.orientation;
            }
          }

          this._initLights();
        },

        draw : function() {
          this.redraw();

          this._lights[0].draw();
          this._context.beginPath();
          this._context.drawImage(this._lights[0].getCanvas(), 0, 0);

          this._lights[1].draw();
          this._context.beginPath();

          if (this._isHor()) {
            this._context.drawImage(this._lights[1].getCanvas(), 0, this._canvas.height - consts.LIGHT_SIZE);
          } else {
            this._context.drawImage(this._lights[1].getCanvas(), this._canvas.width - consts.LIGHT_SIZE, 0);
          }

        },

        _updateSize : function() {
          this.size({
            width  : window.innerWidth,
            height : window.innerHeight
          });
        },

        _initLights : function() {
          var i, l = 2;
          for (i = 0; i < l; ++i) {
            this._lights.push(
              new Light({
                orientation: this._isVer() ? consts.LIGHT_ORIENTATION_VER : consts.LIGHT_ORIENTATION_HOR
              })
            );
          }
        },

        _isVer : function() {
          return this._orientation === consts.LIGHT_PAIR_ORIENTATION_VER;
        },

        _isHor : function() {
          return this._orientation === consts.LIGHT_PAIR_ORIENTATION_HOR;
        },

        getOrientation : function() {
          return this._orientation;
        },

        setMode : function(mode) {
          this._lights.forEach(function(light){
            light.setMode(mode);
          });
        }

      });

      provide(LightPair);

    }
  );

}(this, this.modules));