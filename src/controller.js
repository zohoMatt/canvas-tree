/**
 * Created by Zoho on 16/9/12.
 */
/**
 * This file is based on dat.gui, a UI controller for web demos.
 */

let DataStore = function (name, speedX, speedY, quantity) {
    this.name = name;
    this.speedX = speedX;
    this.speedY = speedY;
    this.quantity = quantity;
};

/******************** Set panel *******************/
let data = new DataStore('Controller', 0.2, 0.1, 30);
let panel = new dat.GUI();
let speedXControl = panel.add(data, 'speedX', -2, 2);
let speedYControl = panel.add(data, 'speedY', -2, 2);
let quantityControl = panel.add(data, 'quantity', 0, 100);

/******************** Add event listeners *******************/
speedXControl.onChange((value) => {
    data.speedX = value;
});

speedYControl.onChange((value) => {
    data.speedY = value;
});

quantityControl.onChange((value) => {
    data.quantity = value;
});

export default data;

export function updateAllController() {
    for (let c in panel.__controllers) {
        panel.__controllers[c].updateDisplay();
    }
}
