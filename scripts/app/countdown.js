(function(window, modules){

  modules.define(
    'Countdown',
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

      var Countdown = tools.extend(Drawable),

          $class = Countdown,
          $super = $class.superclass;

      _.extend($class.prototype, {

        initialize : function() {
          $super.initialize.apply(this, arguments);

          this._val = 4.2;
        },

        _draw : function() {
          this.redraw();
          this._context.font = '12px Courier New';
          this._context.fillStyle = '#ffffff';
          this._context.fillText(this._val.toString(), 30, 30);
        },

        val : function(val) {
          if (val) {
            this._val = val;
          } else {
            return this._val;
          }
        }

      });

      provide(Countdown);

    }
  );

}(this, this.modules));