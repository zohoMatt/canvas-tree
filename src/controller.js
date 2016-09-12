/**
 * Created by Zoho on 16/9/12.
 */
let ControllerData = function (name, speed, quantity) {
    this.name = name;
    this.speed = speed;
    this.quantity = quantity;
};

window.onload = function () {
    // Initialize interface
    let panel = new dat.GUI();
    let data = new ControllerData('Control Panel', 200, 30);

    // Set Controllers
    // panel.add(data, 'name');
    let speedControl = panel.add(data, 'speed', 0, 800);
    let quantityControl = panel.add(data, 'quantity', 0, 100);
};
