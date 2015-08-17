(function(window, modules){

  modules.define(
    'windowResize',
    [
      'Dispatcher'
    ],
    function(
      provide,
      Dispatcher
    ){

      var windowResizeTimeout;

      window.addEventListener('resize', function(){
        clearTimeout(windowResizeTimeout);
        windowResizeTimeout = setTimeout(function(){
          Dispatcher._notify('window-resize');
        }, 300);
      });

      provide();

  });

}(this, modules));