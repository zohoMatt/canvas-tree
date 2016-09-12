/**
 * Created by Zoho on 16/9/12.
 */
/**======================================================**/
/**             Data structure - shapes                  **/
/**======================================================**/
class Shape {
    constructor(type) {
        this.type = type;
    }
}

export class Circle extends Shape {
    /**
     * @param type {String} value: round/circle, square/rectangle, triangle
     * @param drawSetting {Object} {x, y, radius, radian, fillColor}
     * @param actionSetting {Object} {speed_x, speed_y}
     */
    constructor(type, drawSetting, actionSetting) {
        super(type);
        this.drawSetting = drawSetting;
        this.actionSetting = actionSetting;
    }

    /******************** Getters *******************/
    getPosition() {
        const { x, y } = this.drawSetting;
        return {
            x,
            y
        }
    }

    get radius() {
        return this.drawSetting.radius;
    }

    /**
     * @param mode {String} value: boundary, center, entire
     * @param canvas
     * @return {Boolean}
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
        const { x, y, radius, fillColor, radian } = this.drawSetting;
        context.beginPath();
        context.arc(x, y, radius, 0, radian, false);
        context.closePath();

        if (fillColor != 'null') {
            context.fillStyle = fillColor;
            context.fill();
        }
    }

    moveOnce() {
        let { x, y } = this.drawSetting;
        const { speed_x, speed_y } = this.actionSetting;
        x += speed_x;
        y += speed_y;
        this.drawSetting = {
            ...this.drawSetting,
            x,
            y
        };
    }

    jumpTo(x, y) {
        this.drawSetting = {
            ...this.drawSetting,
            x,
            y
        }
    }

    adjustAcceleration(x, y) {
        const { speed_x , speed_y } = this.actionSetting;
        this.actionSetting = {
            speed_x: x || speed_x,
            speed_y: y || speed_y
        }
    }

}


/**======================================================**/
/**                Context operations                    **/
/**======================================================**/
export class EnhancedContext  {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }

    /******************** Basic operations *******************/
    /**
     * @param opacity {Number}
     */
    clearContextWithOpacity(opacity) {
        const { width, height } = this.canvas;
        this.context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        this.context.fillRect(0, 0, width, height);
    }

    /******************** Draw *******************/
    placeItem(shape) {
        shape.drawSelf(this.context);
    }

    moveItemOnce(shape, opacity=1) {
        this.clearContextWithOpacity(opacity);
        shape.moveOnce();
        shape.drawSelf(this.context);
    }
}