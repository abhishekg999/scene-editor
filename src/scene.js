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
            const effect = new KeyframeEffect(el.HTMLElement, el.createLifecycle(), options);
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
    #length = 0

    constructor(scene, width, height, start, length) {
        this.id = crypto.randomUUID();
        this.width = width;
        this.height = height;
        this.scene = scene;

        this.lifecycle = new Lifecycle(length); //change

        this.class = prefixClass("element");
        this.scale = 1;
        this.origin = { x: 0, y: 0 };

        this.start = start
        this.length = length

        this.HTMLElement = null;
    }

    set length(length) {
        const ratio = length / this.length;
        this.lifecycle.map((e) => {
            e.time *= ratio;
        })

        console.log(this.lifecycle)

        this.lifecycle.tail.keyframe.time *= ratio;
        this.#length = length;

    }

    get length() {
        return this.#length;
    }

    create() {
        const output = document.createElement("div");
        output.classList.add(this.class);
        output.id = this.id;

        output.style.transformOrigin = `${this.origin.x} ${this.origin.y}`;
        output.style.height = `${this.height}px`;
        output.style.width = `${this.width}px`;
        output.style.position = "absolute";
        output.style.visibility = "hidden";

        this.HTMLElement = output;
        return output;
    }

    /**
     * Prepares LifecycleNode before creation. Adds visibility property and normalizes times.
     * 
     * @param {LifecycleNode} node 
     * @returns {}
     */
    _prepareFrameFromNode(node) {
        let _ = new Keyframe(
            (this.start + node.keyframe.time) / this.scene.length,
            {
                ...node.keyframe.properties,
                visibility: "visible"
            }
        );

        return _.create();
    }

    createLifecycle() {
        const output = []
        let start = this.lifecycle.head.next;

        if (start === this.lifecycle.tail) {
            return output;
        }

        // Set starting point to invisible at time 0
        const startingKeyFramePre = {
            ...start.keyframe.properties,
            visibility: "hidden",
            offset: 0
        }

        const startingKeyFrameFinal = {
            ...start.keyframe.properties,
            visibility: "hidden",
            offset: this.start / this.scene.length
        }

        output.push(startingKeyFramePre);
        output.push(startingKeyFrameFinal);

        while (start !== this.lifecycle.tail) {
            output.push(this._prepareFrameFromNode(start));
            start = start.next;
        }

        //Set ending keyframes to remove element when done
        const endingKeyFramePre = {
            ...output[output.length - 1],
            visibility: "hidden",
            offset: (this.start + this.length) / this.scene.length
        }

        const endingKeyFrameFinal = {
            ...output[output.length - 1],
            visibility: "hidden",
            offset: 1
        }

        output.push(endingKeyFramePre);
        output.push(endingKeyFrameFinal);

        console.log(output);

        return output;
    }

    /**
     * @param {Keyframe} keyframe Keyframe object
     * 
     * Adds specificed keyframe to scene object maintaining sorted order.
     * Requires keyframe time to be less than LifeCycle length.
     */
    addKeyFrame(keyframe) {
        if (keyframe.time > this.length) {
            throw new Error("Invalid keyframe time provided");
        }

        const new_node = new LifecycleNode(keyframe);

        let prev = null
        let start = this.lifecycle.head;
        while (start !== this.lifecycle.tail && new_node.keyframe.time > start.keyframe.time) {
            prev = start;
            start = start.next;
        }

        new_node.next = start;
        prev.next = new_node;

        this.lifecycle.size++;
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
    constructor(scene, width, height, start, length, src) {
        super(scene, width, height, start, length);
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

    map(func) {
        let start = this.head.next;
        while (start !== this.tail) {
            func(start.keyframe)
            start = start.next;
        } 
    }
}

export { Scene, ImageElement, Lifecycle, Keyframe, Remote }