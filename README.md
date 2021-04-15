# My Star Wars List React App

This project used aws Amplify for CI/CD, aws IAM for authentication, bootstrap for react for UI, GraphQL for database and user contexts and the Star Wars API for beautiful images. I tried my best to give a broad sense of my range and knowledge. 

I also decided to go with aws Amplify to show that I can use the technologies necessary for the job and am willing to put in the work to stay on top of emerging technology.

# Usage

After building/starting the app please enter the following credentials. Due to the authentication process being done through aws IAM you may create your own profile however I have not done a custom sign up form, only the sign-in form. 

```bash
username: nico
password: whatever
```

# My Approach & Wishlist

So basically I wanted to show you a sample of my technical skills while still introducing myself. Originally the app was to be show my favourite music and album covers but Star Wars is still a great way to introduce myself. I had long saved several UI components and so I brought those to life in the sign-up page leaning towards a more sublte approach to colors and depth. When it comes to the home page I wanted to show content but not overload it, and I believe I achieved that with my 1 card group and 1 form group.

The GraphQL implementation made the web app very fast and responsive however there is still much room for improvement. Additionally there is a GraphQL and a REST api I decided to integrate into the app via aws services that may be referenced/used for whatever necessary.

However I did take some shortcuts I wouldnt have under normal circumstances. For example, I would have prefered to use react-router and created hoc private routes to better ensure context and authentication but for these purposes I simply checked for isloggedin. The components definitely needed some separation into layout and page components in my opinion (people can vary widely on folder architecture) and some components were built with classes rather than functions. This was solely due to the time constraints and the new technology I was working with, there were simply more resources for class based components than there were for functional components. The home component best shows functional components being implemented with react hooks. 

#Thank you for the Opportunity! I look forward to hearing back!

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

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

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
