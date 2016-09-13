/**
 * Created by Zoho on 16/9/12.
 */
import './style.less';

import { EnhancedContext } from './lib/enhancedContext';
import { NatureTree } from './lib/Shape';
import Data, { register } from './controller';
import { randomColorPicker, randomInteger, randomNumber } from './lib/random';


const canvas = document.getElementById('main');

let context;
// test browser support
if (canvas.getContext) {
    context = canvas.getContext('2d');
} else {
    alert('Sorry that you can not watch this demo because your browser does not support canvas.')
}

let ctxPlus = new EnhancedContext(canvas, context);
let readyTree = null;

// modify the clear method
Data.clear = () => {
    ctxPlus.clearContextWithOpacity(1);
};
Data.random = () => {
    Data.leavesColor = randomColorPicker();
    Data.leavesWidth = randomInteger(100, 1000);
    Data.leavesHeight = randomInteger(100, 1000);
    // Data.drawLeaves = Math.random() > 0.5;
    Data.spread = randomNumber(0.3, 1);
    Data.branchWidth = randomInteger(1, 20);
    Data.maxBranchLength = randomInteger(20, 100);
    Data.maxBranchGenerations = randomInteger(8, 18);

    updateReadyTree();
};

export function updateReadyTree() {
    const { width, height } = canvas;
    const {
        scaleX,
        scaleY,
        drawLeaves,
        leavesColor,
        leavesWidth,
        leavesHeight,
        spread,
        branchWidth,
        maxBranchLength,
        maxBranchGenerations
    } = Data;

    const x = Math.random() * (width - 200) + 200;
    const y = Math.random() * (height - 200) + 200;
    const z = 0;

    readyTree = new NatureTree(
        'tree',
        {x, y, z, scaleX, scaleY},
        {drawLeaves: drawLeaves == 1, leavesWidth, leavesHeight, leavesColor},
        {spread, branchWidth, maxBranchLength, maxBranchGenerations}
    );
}


/******************** Run app *******************/
// register panel controllers
register((controller) => {
    controller.onChange((value) => {
        Data[controller] = value;
        updateReadyTree();
    });
});

// initialize ready treee
updateReadyTree();      // update all trees

canvas.addEventListener('click', (e) => {
    const { x, y } = ctxPlus.getMouseCanvasPosition(e);
    readyTree.x = x;
    readyTree.y = y;

    readyTree.drawSelf(context);
});