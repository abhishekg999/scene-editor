# Scene Editor

Scene Editor is a (*work in progress :)*) graphical editor for CSS Animations. Powered by the [Web Animation API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) and Scene.js.

![Scene Editor](https://user-images.githubusercontent.com/32551454/234119732-9ac75a7a-398d-4e79-ab4d-96c1048e5b37.png)

Scene Editor uses the custom Scene.js to manage keyframes given to assets. This is a project that I plan to continue to work on. I believe that the Web Animations Api is very underutilized, and even though CSS Animations at this complexity are pretty niche, it is still something that would be cool to have. Functionality such as spritesheets are even possible using masks and the css `steps()` function give room to so many possibilities.

Currently Scene.js returns a structured object like this:

```js
[HTMLElement, Remote] = scene.create();
```

The usage also allows for a completely JS free implementation, however I believe the remote has far more use case. The remote gives fine control of the animation, and the user can simply choose to add the HTMLElement in any parent container div as seen fit, and the animation will run exactly as intended.

Editor is will WIP tho :).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
