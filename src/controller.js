/**
 * Created by Zoho on 16/9/12.
 */
/**
 * This file is based on dat.gui, a UI controller for web demos.
 */
let DataStore = function () {
    this.message = 'Set style for the next tree';
    // shape folder
    this.scaleX = 0.5;
    this.scaleY = 0.5;
    // leaf folder
    this.leavesColor = '#C01880';
    this.leavesWidth = 200;
    this.leavesHeight = 200;
    this.drawLeaves = 1;
    // branch folder
    this.spread = 0.6;
    this.branchWidth = 13;
    this.maxBranchLength = 60;
    this.maxBranchGenerations = 12;

    this.clear = () => {
        throw '[NotOverridenError] DataStore.clear is not overridden';
    };

    this.random = () => {
        throw '[NotOverridenError] DataStore.random is not overridden';
    };
};

/******************** Set panel *******************/
let data = new DataStore();
window.panel = new dat.GUI({
    width: 380
});
// message
let messageControl = panel.add(data, 'message');
// shape folder
let shapeFolder = panel.addFolder('Shape Settings');
let scaleX = shapeFolder.add(data, 'scaleX', 0, 1);
let scaleY = shapeFolder.add(data, 'scaleY', 0, 1);
// leaf folder
let leafFolder = panel.addFolder('Leaf Settings');
let drawLeaves = leafFolder.add(data, 'drawLeaves', {'True': 1, 'False': 0});
let leavesColor = leafFolder.addColor(data, 'leavesColor').listen();
let leavesWidth = leafFolder.add(data, 'leavesWidth', 100, 1000).step(1).listen();
let leavesHeight = leafFolder.add(data, 'leavesHeight', 100, 1000).step(1).listen();
// branch folder
let branchFolder = panel.addFolder('Branch Settings');
let spread = branchFolder.add(data, 'spread', 0.3, 1).step(0.01).listen();
let branchWidth = branchFolder.add(data, 'branchWidth', 1, 20).step(1).listen();
let maxBranchLength = branchFolder.add(data, 'maxBranchLength', 20, 100).step(1).listen();
let maxBranchGenerations = branchFolder.add(data, 'maxBranchGenerations', 8, 18).step(1).listen();

let random = panel.add(data, 'random');
let clear = panel.add(data, 'clear');


export function register(handler) {
    [
        drawLeaves,
        leavesColor,
        leavesWidth,
        leavesHeight,
        spread,
        branchWidth,
        maxBranchLength,
        maxBranchGenerations,
        random,
        clear
    ].map((controller) => {
        handler(controller);
    });
}

export default data;

export function updateAllController() {
    for (let c in panel.__controllers) {
        panel.__controllers[c].updateDisplay();
    }
}
