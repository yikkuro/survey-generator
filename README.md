## Survey Generator User Guide

### Code setup

The Github commit only includes source code and thus do not have build/node_module. Once downloaded, please run `npm install` in both __node-server__ and __vue-ui__ folder to install all package needed. 

Once that is done, host node server first by running `npm run serve` in node-server. Note that this is actually a self-defined script that runs `npm run tsc` and `node build/app.js` in sequence. If the build fail, please run them manually to debug. Once you see the output:

> Hosting on 127.0.0.1:3000

That means the node.js server is running on 127.0.0.1:3000. By default the __vue-ui__ frontend will call this address, but you may need to change it to deploy to online server. 

Now to host __vue-ui__, run `npm run serve` in __vue-ui__ folder. Ignore warnings  \_(:3 」∠ )\_ . Once you see:

> App running at:
>   - Local:   http://localhost:8080/
>   - Network: http://172.25.1.205:8080/

You can navigate to localhost:8080 to try the app!

### Data File Standards

Please follow the standards of data file for app to work properly. I spend some effort into error prompting, but bad data can still get away with it.

As provided in sample data, the whole survey should be in an array. Every question must have an unique ID associated, and the one starting question must have ID as 0. `"question"` contains the text for question. The Ending question must have `"answers"` as an empty array, and for all other  questions, answers is an array containing objects that have `"text"` as answer text, and `"redirectID"` as the ID this answer is redirecting to.

