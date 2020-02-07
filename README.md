# developer-interview-task
A technical task for our developer interviews  

----

## JenniKate Notes

• Webpack config

- chunking, I've not used it before. I know it allows us to split code into bundles which can be loaded on demand or in parallel. Need to do more reading/learning to understand how it's implemented.

- hashing, I've not used it in webpack before, I know it's to do with long term storage of static content & how content is cached/updated. Need to do more reading/learning to understand how it's implemented.

- with using webpack.dev and webpack.common shouldn't we also use webpack.prod and move production only needs out of webpack.common? (appreciate this might have been removed for the test!)

- eslint is telling me webpack (and others) should be listed in the project directory not dev. I think it's allowed to require dev dependencies for webpace so have added `"import/no-extraneous-dependencies": ["error", {"devDependencies": true}]` to eslint to stop it erroring.

- note about not wanting to open browser on npm start: `"start": "webpack-dev-server --open --config webpack.dev.js --watch --colors",` remove --open in package.json & set `open: false` in webpack.[dev].js

- entry point is /app/index
- process.env I believe is mapping keys to their default values in a secure manner
- .common has the loaders to enable running of certain file types

- added some comments on the files

• app/index.jsx

- I'm used to seperating all functions/constants to their own files -- but is this all done in the one file because it's applicable globally, you don't load App at all without authenticating?

- UnavailablePage I'd guess is just a help page to tell you what to do if you're not authenticated, it doesn't seem to be imported anywhere here though

- there are linting errors on App.jsx that I'm not sure if they're due to code removed, or actual problems

- I'm not clear on why the components are split the way they are. I initially thought App.jsx was to render the general page structure - but then header/footer is also called from index.jsx. I'm wondering if there is a better way to structure these files.

- I can see App calls Main which calls Dashboard page -- I didn't delve deeper into that but if I had time I'd map up a quick tree diagram of how the components work together to see where they connect and possibly overlap.

- few more notes/question on the code

• Application routers and links

- /common/AppConstants is holding the static paths for routing. I can see reacter-router-dom is being used for 'unavailable', but I'm not sure why it's used only there, would it make sense to have all routing using the same library (whether react-router-dom or something else). I've seen a few other of the react-router-dom features used on other files (just with a quick search), I'd like to understand the reason for having different ways to work with links/paths.


• Dockerfile (stretch target, if you have time)

- I took a quick look but not having used Docker at all I need to do some learning before I can make it make sense. I didn't have time to do that for this task.

----

## Running in development

1 - Install dependencies
```
npm install
```

2 - Define and export variables in the `sample.env` file
```
source sample.env
```

3 - Start the server
```
npm start
```
