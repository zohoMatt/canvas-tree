/**
 * Created by Zoho on 16/9/13.
 */

class Shape {
    constructor(type) {
        this.type = type;
    }

    drawSelf(context) {
        throw '[NotOverriddenError]Shape.prototype.drawSelf() must be overridden!';
    }
}

/**======================================================**/
/**                    NatureTree                        **/
/**======================================================**/
export class NatureTree extends Shape {
    /**
     *
     * @param type                  {String}
     * @param x                     {Number}
     * @param y                     {Number}
     * @param z                     {Number}
     * @param scaleX                {Number}
     * @param scaleY                {Number}
     *
     * @param drawLeaves            {Boolean} Whether to draw leaves for the tree.
     * @param leavesWidth           {Number} Leaf is in a rectangle shape.
     * @param leavesHeight          {Number}
     * @param leavesColor           {String}
     *
     * @param spread                {Number} Recommend: 0.3 ~ 1.
     * @param branchWidth           {Number} The width of all branches.
     * @param maxBranchLength       {Number}
     * @param maxBranchGenerations  {Number} Number of generations. It affects the browser behaviour. Recommend: 8 ~ 16.
     */
    constructor(
        type='tree',
        { x, y, z, scaleX, scaleY} = {x: 400, y: 800, z: 0, scaleX: 0.85, scaleY: 0.85 },
        { drawLeaves, leavesWidth, leavesHeight, leavesColor, }
            = { drawLeaves: true, leavesWidth: 200, leavesHeight: 200, leavesColor: 'purple', },
        { spread, branchWidth, maxBranchLength, maxBranchGenerations }
            = { spread: 0.6,  branchWidth: 13, maxBranchLength: 60, maxBranchGenerations: 12 },
        ) {
        super(type);
        this.x = x;
        this.y = y;
        this.z = z;
        this.scaleX = scaleX;
        this.scaleY = scaleY;

        this.spread = spread;
        this.drawLeaves = drawLeaves;
        this.leavesWidth = leavesWidth;
        this.leavesHeight = leavesHeight;
        this.leavesColor = leavesColor;
        this.branchWidth = branchWidth;
        this.maxBranchLength = maxBranchLength;
        this.maxBranchGenerations = maxBranchGenerations;
    }

    drawSelf(context) {
        const { x, y, scaleX, scaleY, branchWidth } = this;

        context.save();
        context.lineWidth = branchWidth;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.translate(x, y);
        context.scale(scaleX, scaleY);
        this._branchAndLeaves(context, 0);
        context.restore();
    }

    /*****************************************/
    _branchAndLeaves(context, generations) {
        const { maxBranchGenerations, maxBranchLength, spread } = this;

        if (generations < maxBranchGenerations) {
            context.save();

            // draw a simple line
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, -maxBranchLength);
            context.stroke();

            // move and rotate
            context.translate(0, -maxBranchLength);
            let randomN = -(Math.random() * 0.1) + 0.1;
            context.rotate(randomN);

            if (Math.random() < spread) {
                // draw left branch
                context.rotate(-0.35);
                context.scale(0.7, 0.7);
                context.save();
                // recursively draw the next generation
                this._branchAndLeaves(context, generations + 1);
                context.restore();

                // draw right branch
                context.rotate(0.6);
                context.save();
                // recursively draw the next generation
                this._branchAndLeaves(context, generations + 1);
                context.restore();
            } else {
                // has some chance not to draw separate branch
                this._branchAndLeaves(context, generations);
            }

            context.restore();
        } else {
            // enough generations; draw leaves
            if (this.drawLeaves) {
                const { leavesColor, leavesWidth, leavesHeight } = this;
                context.save();
                context.fillStyle = leavesColor;
                context.fillRect(0, 0, leavesWidth, leavesHeight);
                context.restore();
            }
        }
    }
}

/**======================================================**/
/**                      Circle                          **/
/**======================================================**/
export class Circle extends Shape {
    /**
     * @param type          {String} value: round/circle, square/rectangle, triangle
     * @param x             {Number}
     * @param y             {Number}
     * @param radius        {Number}
     * @param radian        {Number}
     * @param fillColor     {String} Color name
     * @param speed_x       {Number} Velocity on x-axis.
     * @param speed_y       {Number} Velocity on y-axis.
     * @param ax            {Number} Acceleration on x-axis.
     * @param ay            {Number} Acceleration on y-axis.
     */
    constructor(
        type='circle',
        {x, y, radius, radian, fillColor} = {x: 300, y: 300, radius: 40, radian: Math.PI * 2, fillColor: 'lightblue'},
        {speed_x, speed_y, ax, ay} = { speed_x: 1, speed_y: 1, ax: 0, ay: 0 }
        ) {
        super(type);
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.radian = radian;
        this.fillColor = fillColor;

        this.speedX = speed_x || 0;
        this.speedY = speed_y || 0;
        this.accelerateX = ax || 0;
        this.accelerateY = ay || 0;
    }

    /******************** Getters *******************/
    getPosition() {
        const { x, y } = this;
        return {
            x,
            y
        }
    }

    /**
     * @param mode      {String} value: boundary, center, entire
     * @param canvas    {HTMLElement}
     * @return          {Boolean}
     */
    isOut(mode, canvas) {
        const { width, height } = canvas;
        const { x, y } = this.getPosition();
        const radius = this.radius;

        let min_x, min_y, max_x, max_y;

        switch (mode) {
            case 'boundary':
                min_x = radius;
                min_y = radius;
                max_x = width - radius;
                max_y = height - radius;
                break;
            case 'center':
                min_x = 0;
                min_y = 0;
                max_x = width;
                max_y = height;
                break;
            case 'entire':
                min_x = -radius;
                min_y = -radius;
                max_x = width + radius;
                max_y = height + radius;
                break;
            default:
                min_x = 0;
                min_y = 0;
                max_x = width;
                max_y = height;
                break;
        }

        // judge
        return (x <= min_x) || (x >= max_x) || (y <= min_y) || (y >= max_y);
    }

    /******************** Actions *******************/
    drawSelf(context) {
        const { x, y, radius, fillColor, radian } = this;
        context.beginPath();
        context.arc(x, y, radius, 0, radian, false);
        context.closePath();

        if (fillColor != 'null') {
            context.fillStyle = fillColor;
            context.fill();
        }
    }

    moveOnce() {
        let { x, y } = this;
        const { speedX, speedY, accelerateX, accelerateY } = this;
        // move: update position
        x += speedX;
        y += speedY;
        // accelerate: update speed
        this.adjustSpeed(speedX + accelerateX, speedY + accelerateY);

        this.x = x;
        this.y = y;
    }

    jumpTo(x, y) {
        this.x = x;
        this.y = y;
    }

    adjustSpeed(x, y) {
        const { speedX , speedY } = this;
        this.speedX = x || speedX;
        this.speedY = y || speedY;
    }

    adjustAcceleration(ax, ay) {
        const { accelerateX, accelerateY } = this;
        this.accelerateX = ax || accelerateX;
        this.accelerateY = ay || accelerateY;
    }
}
