(function(window, modules){

  modules.define('consts', function(provide){
    provide({

      LIGHT_MODE_GREEN                     : 'LIGHT_STATE_GREEN',
      LIGHT_MODE_ORANGE                    : 'LIGHT_STATE_ORANGE',
      LIGHT_MODE_RED                       : 'LIGHT_STATE_RED',

      LIGHT_ORIENTATION_HOR                : 'LIGHT_ORIENTATION_HOR',
      LIGHT_ORIENTATION_VER                : 'LIGHT_ORIENTATION_VER',

      LIGHT_SIZE                           : 7,

      LIGHT_PAIR_ORIENTATION_HOR           : 'LIGHT_PAIR_ORIENTATION_HOR',
      LIGHT_PAIR_ORIENTATION_VER           : 'LIGHT_PAIR_ORIENTATION_VER',

      TRAFFIC_DIRECTION_SPEED              : 2,
      TRAFFIC_DIRECTION_VER                : 'TRAFFIC_DIRECTION_VER',
      TRAFFIC_DIRECTION_HOR                : 'TRAFFIC_DIRECTION_HOR',
      TRAFFIC_WIDTH                        : 500,

      TRAFFIC_PARTICLE_MAX_COUNT           : 50,
      TRAFFIC_PARTICLE_SIZE                : { max: 4, min: 1 },
      TRAFFIC_PARTICLE_MAX_SPREAD          : 300,

      TRAFFIC_STATE_GO                     : 'TRAFFIC_STATE_GO',
      TRAFFIC_STATE_HOLD                   : 'TRAFFIC_STATE_HOLD',                  
      TRAFFIC_STATE_STOP                   : 'TRAFFIC_STATE_STOP'

    });
  })

}(this, modules));