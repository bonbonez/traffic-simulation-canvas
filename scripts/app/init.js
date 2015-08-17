(function(window, modules) {

  modules.define(
    'appInit',
    [
      'Dispatcher',
      'windowResize',
      'Scene',
      'Drawer'
    ],
    function(
      provide,
      Dispatcher,
      windowResize,
      Scene,
      Drawer
    ) {
      provide(function(){

        var scene = new Scene();

        Drawer.on('animation-frame', function(delta) {
          scene.draw();
        });
        Drawer.start();

        //scene.start();

        document.body.addEventListener('click', function(event) {
          scene.toggle();
        });
        scene.start();

      });
    }
  );

}(this, this.modules));