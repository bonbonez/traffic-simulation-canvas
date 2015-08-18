# Traffic Simulation exercise made with Canvas

Made with pure canvas, ymodules.js module system and _.extend lodash method.
Could be run in any browser, both desktop and mobile.

### How to run
Simply open index.html in any browser, no server is required

### Controls
There is only one control: mouse click toggles the traffic. If traffic is stopped, the scene will continue draw existing elements (particles)

### Explanations
There is a plenty of files in `index.html`. Lets clarify, what they are used for:

##### Vendor scripts
- `./scripts/vendor/lodash.min.js`
provides `extend` method (for creating mixins)
- `./scripts/vendor/ymodules.js`
module system

##### Core scripts
- `./scripts/core/tools.js`
contains the `extend` method, used for simple prototype inheritance
- `./scripts/core/base.js`
base class. the parent for all classes in this project
- `./scripts/core/pubsub.js`
publisher/subscriber. extends from base class
- `./scripts/core/canvas.js`
simple wrap for canvas. there is a lot of work with canvases inside the app, this class simplifies this work
- `./scripts/core/drawable.js`
wrap for previously described class. provides a tiny amount of sugar for all canvas-based classes (for example, it knows how to render "nested" canvases)
- `./scripts/core/debouncer.js`
util for generating events every N milliseconds, with start/stop functionality

##### App scripts
- `./scripts/app/constants.js`
constants live here
- `./scripts/app/dispatcher.js`
global instance of PubSub class, a singleton
- `./scripts/app/drawer.js`
singleton class that contains requestAnimationFrame loop and calculates time delta
- `./scripts/app/window-resize.js`
wrap for window.onresize method (may be better to name this file smth like `events`)
- `./scripts/app/traffic.js`
class that draws particles. there are two instances of Traffic class in the app. one for the vertical flow of particles, one for the horizontal.
- `./scripts/app/traffic/particle.js`
class that creates traffic particle with some unique properties
- `./scripts/app/state-loop.js`
class that provides methods for creating a sequence of actions (from red to green, grom green to orage, etc.). used for traffic logics management.
- `./scripts/app/countdown.js`
draws countdown in top left corner of the screen
- `./scripts/app/app-canvas.js`
the main canvas. the one that is not virtual.
- `./scripts/app/light.js`
draws single light (lines along the screen edges)
- `./scripts/app/light-pair.js`
simplifies the work with the pair of lights
- `./scripts/app/scene.js`
main class in the app. initializes lights, main canvas, traffics, particles and countdown
- `./scripts/app/init.js`
contains appInit modules, that launches Drawer class and initializes the Scene class
- `./scripts/app/index.js`
simple script that waits for DOMContentLoaded and then launches appInit module
