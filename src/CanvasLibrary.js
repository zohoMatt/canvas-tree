/**
 * Created by Zoho on 16/9/12.
 */
/**======================================================**/
/**                Context operations                    **/
/**======================================================**/
export class EnhancedContext  {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.POS_CONST = 1000 / 500;
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

    /******************** Mouse event *******************/
    getMouseCanvasPosition(event) {
        let rec = this.canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rec.left) * this.POS_CONST,
            y: (event.clientY - rec.top) * this.POS_CONST
        }
    }

}