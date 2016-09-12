/**
 * Created by Zoho on 16/9/12.
 */
import { Circle, EnhancedContext } from './CanvasLibrary';
import Data from './controller';

const canvas = document.getElementById('main');

let context;
// test browser support
if (canvas.getContext) {
    context = canvas.getContext('2d');
} else {
    alert('Sorry that you can not watch this demo because your browser does not support canvas.')
}

let ctxPlus = new EnhancedContext(canvas, context);

const a = new Circle('circle', {
    x: 300,
    y: 300,
    radius: 40,
    fillColor: 'blue',
    radian: Math.PI * 2
}, {
    speed_x: 1,
    speed_y: 1
});


ctxPlus.placeItem(a);

/******************** Movement *******************/
const run = () => {
    const { speedX, speedY } = Data;
    const opacity = 0.1;
    a.adjustAcceleration(speedX, speedY);

    const { x, y } = a.getPosition();
    if (a.isOut('entire', canvas)) {
        a.jumpTo(0, 0);
    }

    ctxPlus.moveItemOnce(a, opacity);
    window.requestAnimationFrame(run);
};

window.requestAnimationFrame(run);


/******************** test *******************/
canvas.addEventListener('mousemove', (e) => {
    const { x: mx, y: my } = ctxPlus.getMouseCanvasPosition(e);
    const { x, y } = a.getPosition();
    const { speedX, speedY } = Data;

    Data.speedX = (mx - x) / 100;
    Data.speedY = (my - y) / 100;

});