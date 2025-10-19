# Intro
- Initially there were multiple js files. all interdependeing on each other. They needed to be imported in order to avoid issues.
- This can be fixed using webapck, that can auto create dependency trees, combine and then split them efficiently and render it.



# Commands
- npm i -D webpack webpack-cli
- npx webpack
- npx webpack --stats detailed