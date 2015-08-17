(function(window, modules){

  modules.define(
    'Traffic',
    [
      'tools',
      'consts',
      'Drawable',
      'TrafficParticle',
      'Drawer'
    ],
    function(
      provide,
      tools,
      consts,
      Drawable,
      Particle,
      Drawer
    ) {

      var Traffic = tools.extend(Drawable),

          $class  = Traffic,
          $super  = $class.superclass;

      _.extend($class.prototype, {

        initialize : function(config) {
          $super.initialize.apply(this, arguments);

          this._direction = consts.TRAFFIC_DIRECTION_VER;
          this._size      = consts.TRAFFIC_WIDTH;

          this._particles = [];
          this._garbage   = [];

          if (config) {
            if (config.direction) {
              this._direction = config.direction;
            }
          }

          this._updateSize();
        },

        _updateSize : function() {
          var windowFaceSize;
          if (this.isVer()) {
            windowFaceSize = window.innerHeight;

            this.size({
              width  : this._size,
              height : windowFaceSize
            });
          } else if (this.isHor()) {
            windowFaceSize = window.innerWidth;

            this.size({
              width  : windowFaceSize,
              height : this._size
            });
          }

          if (this._particles) {
            this._particles.forEach(function(p) {
              p.d = windowFaceSize;
            }.bind(this));
          }
        },

        _draw : function() {
          this._context.fillStyle = 'rgba(0, 0, 0, 0.3)';
          this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

          this._drawParticles();
        },

        _drawParticles : function() {
          this._particles.forEach(function(p, i){
            p.move(Drawer.getDelta(), this.isHor());

            if (p.o) {
              this._garbage.unshift(i);
              return;
            }

            this._context.beginPath();
            this._context.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
            this._context.fillStyle = p.c;
            this._context.fill();
          }.bind(this));

          this._clearGarbage();
        },

        _clearGarbage : function() {
          this._garbage.forEach(function(index){
            this._particles.splice(index, 1);
          }.bind(this));
          this._garbage.length = 0;
          this._garbage = [];
        },

        clear : function() {
          this._particles.length = 0;
          this._particles = [];
        },

        addParticle : function() {
          if (this._particles.length >= consts.TRAFFIC_PARTICLE_MAX_COUNT) {
            return;
          }

          var p     = new Particle({ distance: this.isHor() ? window.innerWidth : window.innerHeight }),
              delta = Math.random() > 0.5 ? 1 : -1,
              subAxis;

          subAxis = Math.max(consts.TRAFFIC_PARTICLE_SIZE.max, Math.min(this._size - consts.TRAFFIC_PARTICLE_SIZE.max, this._size / 2 + Math.round(Math.random() * consts.TRAFFIC_PARTICLE_MAX_SPREAD) * delta));
          this.isVer() ? p.x = subAxis : p.y = subAxis;
          this._particles.push(p);
        },

        isVer : function() {
          return this._direction === consts.TRAFFIC_DIRECTION_VER;
        },

        isHor : function() {
          return this._direction === consts.TRAFFIC_DIRECTION_HOR;
        }

      });

      provide(Traffic);

    }
  );

}(this, this.modules));