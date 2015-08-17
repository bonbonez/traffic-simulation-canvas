(function(window, modules){

  modules.define(
    'Drawable',
    [
      'tools',
      'Canvas',
      'Dispatcher'
    ],
    function(
      provide,
      tools,
      Canvas,
      Dispatcher
    ) {

      var Drawable = tools.extend(Canvas),

          $class = Drawable,
          $super = $class.superclass;

      _.extend($class.prototype, {

        initialize : function() {
          $super.initialize.apply(this, arguments);

          this._childDrawables = [];
          this._idle           = false;

          this._listenToDispatcher();
          this._updateSize();
        },

        idle : function(bool) {
          this._idle = !!bool;
        },

        draw : function() {
          if (!this._idle) {
            this._draw();
            this._drawChildren();
          } else {
            this.redraw();
          }
        },

        _draw : function() {

        },

        addChild : function(drawableInstance) {
          if (drawableInstance && drawableInstance instanceof Drawable) {
            this._childDrawables.push(drawableInstance);
          }
        },

        _drawChildren : function() {
          this._childDrawables.forEach(function(child){
            this._drawChild(child);
          }.bind(this));
        },

        _drawChild : function(inst) {

        },

        _listenToDispatcher : function() {
          Dispatcher.on('window-resize', function(){
            this._onWindowResize();
          }.bind(this));
        },

        _onWindowResize : function() {
          this._updateSize();
        },

        _updateSize : function() {
          this.size({
            width  : window.innerWidth,
            height : window.innerHeight
          });
        }

      });

      provide(Drawable);

    }
  )

}(this, this.modules));