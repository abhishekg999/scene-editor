/**
 * Defines the structure of a Project. 
 * Tracks all assets, resources, and saved progress of a current project.
 * 
 * Structure is defined as follows:
 *      loadedAssets = [Assets] - assets such as images that are loaded, does not necessarily need to be used
 *      timeline = Timeline
 * 
 * Timeline maintains AssetObject - Lifecycle
 * 
 * that should be it basically surely 

*/

import { Scene, ImageElement, Keyframe, Lifecycle } from '../scene.js'

export class Asset {

}

export class ImageAsset extends Asset {
    constructor(src) {
        super();
        this.src = src;
    }
}

export class TimelineObject {
    /**
     * 
     * @param { Asset } asset 
     * @param { Lifecycle } lifecycle 
     */
    constructor(asset, lifecycle) {
        this.asset = asset;
        this.lifecycle = lifecycle;
    }
}

export class Timeline {
    constructor() {
        this.timeline = [];
    }

    /**
     * @param { TimelineObject } assetObject 
     * 
     * Adds assetObject to Timeline. 
     */
    addAssetObject(assetObject) {
        this.timeline.push(assetObject);
    }
}

export function ScenePreviewBuilder(scene) {
    const [remote, HTMLElement] = scene.create();
    return [remote, HTMLElement];
}

export class Project {
    constructor(loadedAssets, length) {
        this.loadedAssets = loadedAssets;
        this.scene = new Scene(600, 480, length);
        this.remote = null;
        this.sceneElements = [];
        this.cursorPos = 0;
    }

    addLoadedAsset(asset) {
        this.loadedAssets.push(asset);
    }
}
