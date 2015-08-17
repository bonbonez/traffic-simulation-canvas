(function(window, modules){

  modules.define(
    'TrafficParticle',
    [
      'consts'
    ],
    function(
      provide,
      consts
    ) {

      var colors = [
        '#ec7171',
        '#e571ec',
        '#71d6ec',
        '#e2ec71',
        '#7471ec',
        '#71ecb4',
        '#ffffff'
      ];

      // Not using tools.extend for performance
      function TrafficParticle(config) {
        this.x = 0;
        this.y = 0;
        this.r = Math.max(consts.TRAFFIC_PARTICLE_SIZE.min, Math.round(Math.random() * consts.TRAFFIC_PARTICLE_SIZE.max));
        this.c = colors[Math.max(0, Math.min(Math.round(Math.random() * colors.length), colors.length - 1))];
        this.s = Math.max(1, Math.random() * 4);
        this.p = 0;
        this.d = 0;
        this.o = false;

        if (config) {
          if (config.distance) {
            this.d = config.distance;
          }
        }
      }

      TrafficParticle.prototype.move = function(delta, hor) {
        this.p += delta * this.s;

        if (this.p > 1) {
          this.o = true;
          return;
        }

        hor ? this.x = this.p * this.d : this.y = this.p * this.d;

      };

      provide(TrafficParticle);

    }
  );

}(this, this.modules));