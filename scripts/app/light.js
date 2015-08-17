(function(window, modules){

  modules.define(
    'Light',
    [
      'tools',
      'consts',
      'Drawable'
    ],
    function(
      provide,
      tools,
      consts,
      Drawable
    ) {

      var colors = {};
      colors[consts.LIGHT_MODE_RED]    = 'rgba(255, 0, 0, 0.7)';
      colors[consts.LIGHT_MODE_ORANGE] = 'rgba(255, 204, 0, 0.9)';
      colors[consts.LIGHT_MODE_GREEN]  = 'rgba(55,  254, 78, 0.7)';

      var Light = tools.extend(Drawable),

          $class = Light,
          $super = $class.superclass;

      _.extend($class.prototype, {

        initialize: function(config) {
          $super.initialize.apply(this, arguments);

          this._mode        = consts.LIGHT_MODE_RED;
          this._orientation = consts.LIGHT_ORIENTATION_HOR;

          if (config) {
            if (config.orientation) {
              this._orientation = config.orientation;
            }
          }

          this._init();
        },

        draw : function() {
          this.redraw();

          this._context.beginPath();
          this._context.fillStyle = colors[this._mode];
          this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        },

        _init : function() {
          this._updateSize();
        },

        _updateSize : function() {
          var width,
              height;

          if (this._isVer()) {
            width  = consts.LIGHT_SIZE;
            height = window.innerHeight;
          } else if (this._isHor()) {
            width  = window.innerWidth;
            height = consts.LIGHT_SIZE;
          }

          this.size({
            width  : width,
            height : height
          });
        },

        _isVer : function() {
          return this._orientation === consts.LIGHT_ORIENTATION_VER;
        },

        _isHor : function() {
          return this._orientation === consts.LIGHT_ORIENTATION_HOR;
        },

        setMode : function(mode) {
          this._mode = mode;
        }

      });

      provide(Light);

    }
  );

}(this, this.modules));