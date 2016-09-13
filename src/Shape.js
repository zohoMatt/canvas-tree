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
    constructor(type='tree') {
        super();
        this.x = 0;
        this.y = 0;
        this.xpos = 400;
        this.ypos = 800;
        this.zpos = 0;
        this.scaleX = 0.85;
        this.scaleY = 0.85;
        this.spread = 0.6;
        this.drawLeaves = true;
        this.leavesColor = 'purple';
        this.max_branch_width = 20;
        this.max_branch_height = 60;

        // leave size
        this.small_leaves = 10;		//树叶状态
        this.medium_leaves = 200;
        this.big_leaves = 500;
        this.thin_leaves = 900;

        this.leaveType = this.medium_leaves;
    }

    drawSelf(context) {
        let spread = this.spread;
        let leaves = true;
        let leaveType = this.leaveType;
        //设置树杈分多少枝
        if (spread >= 0.3 && spread <= 1) {
            this.spread = spread;
        } else {
            this.spread = 0.6
        }

        //是否绘制树叶
        if (leaves === true || leaves === false) {
            this.drawLeaves = leaves;
        } else {
            this.drawLeaves = true;
        }

        if (leaveType == this.small_leaves ||
            leaveType == this.medium_leaves ||
            leaveType == this.big_leaves ||
            leaveType == this.thin_leaves) {
            this.leaveType = leaveType;
        } else {
            this.leaveType = this.medium_leaves;
        }

        context.save();
        context.lineWidth = 1 + Math.random() * this.max_branch_width;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.translate(this.xpos, this.ypos);
        context.scale(this.scaleX, this.scaleY);
        this._branchAndLeaves(context, 0);
        context.restore();
    }

    /*****************************************/
    _branchAndLeaves(context, generations) {
        if (generations < 12) {
            context.save();

            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, -this.max_branch_height);
            context.stroke();

            context.translate(0, -this.max_branch_height);

            var randomN = -(Math.random() * 0.1) + 0.1;
            context.rotate(randomN);

            if (Math.random() < this.spread) {
                //画左侧树枝
                context.rotate(-0.35);
                context.scale(0.7, 0.7);
                context.save();
                this._branchAndLeaves(context, generations + 1);
                context.restore();

                //画右侧树枝
                context.rotate(0.6);
                context.save();
                this._branchAndLeaves(context, generations + 1);
                context.restore();
            } else {

                this._branchAndLeaves(context, generations);

            }

            context.restore();

        } else {
            //枝条画完画树叶
            if (this.drawLeaves) {
                var lengthFactor = 200;
                context.save();
                context.fillStyle = this.leavesColor;
                context.fillRect(0, 0, this.leaveType, lengthFactor);
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
    constructor(type='circle', {x, y, radius, radian, fillColor}, { speed_x=0, speed_y=0, ax=0, ay=0 }) {
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
