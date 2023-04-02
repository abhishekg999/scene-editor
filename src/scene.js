const CLASS_PREFIX = "Scene__"

function prefixClass(name) {
    return `${CLASS_PREFIX}${name}`
}


class Remote {
    /**
     * 
     * @param { Scene } scene
     * @param { } options
     */
    constructor(scene, options) {
        this.scene = scene;
        this.animations = []

        this.scene.children.map((el) => {
            const effect = new KeyframeEffect(el.HTMLElement, el.lifecycle.create(), options);
            this.animations.push(new Animation(effect));
        })

        this.animations.map((animation) => animation.pause());
        this.playState = "paused";
    }


    play() {
        if (this.animations.length == 0) {
            return;
        }
        
        this.animations.map((animation) => animation.play());
        this.playState = "running";

        this.animations[0].onFinish = () => {
            this.playState = "finished";
        }


    }

    pause() {
        this.animations.map((animation) => animation.pause());
        this.playState = "paused";

    }

    setPlaybackRate(rate) {
        this.animations.map((animation) => animation.playbackRate = rate);
    }

    start() {
        this.seek(0);
    }

    seek(pos) {
        this.animations.map((animation) => animation.currentTime = pos);
    }

}


class Scene {
    constructor(width, height, length, renderer) {
        this.width = width;
        this.height = height;
        this.class = prefixClass("scene");
        this.id = crypto.randomUUID();
        this.length = length;

        this.children = []

        this.background = "transparent";

        this.HTMLElement = null;


        this.renderer = renderer;
        if (this.renderer === undefined) {
            this.renderer = (el) => {
                return el;
            }
        }
    }

    setBackgroundImage(url) {
        this.background = `url(${url})`;
    }

    /**
     * 
     * @param { Element } el 
     */
    addChild(el) {
        this.children.push(el);
    }

    clearChildren() {
        this.children = [];
    }

    create() {
        const output = document.createElement("div");

        output.classList.add(this.class);
        output.id = this.id;

        output.style.height = `${this.height}px`;
        output.style.width = `${this.width}px`;
        output.style.borderWidth = `2px`;
        output.style.borderColor = `#595959`;
        output.style.borderStyle = `solid`;
        output.style.position = `relative`;
        output.style.overflow = `hidden`;
        output.style.background = this.background;
        output.style.backgroundSize = `cover`;

        this.children.map((el) => output.appendChild(el.create()));

        this.HTMLElement = output;

        const remote = new Remote(this, { duration: this.length, iterations: 1, fill: "forwards" });
        return [remote, this.HTMLElement];
    }
}

class Element {
    constructor(scene, width, height) {
        this.id = crypto.randomUUID();
        this.width = width;
        this.height = height;
        this.lifecycle = new Lifecycle(scene.length);
        this.class = prefixClass("element");
        this.scale = 1;
        this.origin = { x: 0, y: 0 };
        this.HTMLElement = null;
    }

    create() {
        const output = document.createElement("div");
        output.classList.add(this.class);
        output.id = this.id;

        output.style.transformOrigin = `${this.origin.x} ${this.origin.y}`;
        output.style.height = `${this.height}px`;
        output.style.width = `${this.width}px`;
        output.style.position = "absolute";

        this.HTMLElement = output;
        return output;
    }
}

class ImageElement extends Element {
    /**
     * 
     * @param { Scene } scene 
     * @param { number } width 
     * @param { number } height 
     * @param { string } src 
     */
    constructor(scene, width, height, src) {
        super(scene, width, height);
        this.src = src;
        this.class = prefixClass("imageelement");
    }

    create() {
        const output = super.create();
        output.style.backgroundImage = `url(${this.src})`;
        output.style.backgroundSize = "contain";
        output.style.backgroundRepeat = "no-repeat";
        output.style.scale = this.scale;

        this.HTMLElement = output;
        return output;
    }

}

/** 
 * @param time - time in milliseconds 
 * @param properties - JSON Keyframe object
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats
 */
class Keyframe {
    constructor(time, properties) {
        this.time = time;
        this.properties = properties;
    }

    create() {
        this.properties["offset"] = this.time;
        return this.properties;
    }

}

class LifecycleNode {
    constructor(keyframe, next = null) {
        this.keyframe = keyframe;
        this.next = next;
    }
}

class Lifecycle {
    constructor(length) {
        this.animation_length = length;
        this.head = new LifecycleNode(new Keyframe(-1, {}));
        this.tail = new LifecycleNode(new Keyframe(length + 1, {}));
        this.head.next = this.tail;

        this.size = 0;
    }

    /**
     * @param {Keyframe} keyframe Keyframe object
     * 
     * Adds specificed keyframe to scene object maintaining sorted order.
     * Requires keyframe time to be less than LifeCycle length.
     */
    addKeyFrame(keyframe) {
        const new_node = new LifecycleNode(keyframe);

        let prev = null
        let start = this.head;
        while (start !== this.tail && new_node.keyframe.time > start.keyframe.time) {
            prev = start;
            start = start.next;
        }

        new_node.next = start;
        prev.next = new_node;

        this.size++;
    }

    _prepareFrameFromNode(node) {
        let _ = new Keyframe(node.keyframe.time / this.animation_length, { ...node.keyframe.properties });
        return _.create();
    }

    create() {
        const output = []
        let start = this.head.next;

        while (start !== this.tail) {
            output.push(this._prepareFrameFromNode(start));
            start = start.next;
        }

        return output;
    }
}

export { Scene, ImageElement, Lifecycle, Keyframe, Remote }