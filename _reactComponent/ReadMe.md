//**************************************************************************************//
//                                                                                      //
//                         REACT INSTALLATION STEPS IN SOLUTION                         //    
//                                                                                      //
//**************************************************************************************//


Pre-resquistics for React - 
1) download and install node.js from https://nodejs.org
2) make sure npm package manager is installed along with node.js. or follow steps in this link http://blog.teamtreehouse.com/install-node-js-npm-windows

ReactApp Structure -

    ReactApp
        |
        |-- node_modules(folder)
        |   (this folder will contains all packages that are required to create, compile and generate react distribution file)
        |
        |-- dist(folder) 
        |   (this folder contains distribution files which are used in our website.)
        |   | Note - I moved this folder to public folder for easy access from application.
        |   |-- reactdist.js 
        |       (This file is the distribution file which React generated from the src files. 
        |        This file is stand alone JS file that contains everything needed to render the javascript in webpage)
        |
        |-- src(folder)
        |   (This folder contains src files containing our business code from which distribution file is generated)
        |
        |-- packages.json
        |   (This file contains version, name and dependencies that are need to our app)
        |
        |-- webpack.config.js
            (This file contains configs and code to create distribution file)

Steps to install React inside solution - 
Note :- install react component only in local machine. Do not commit it to TFS.

1) Open the ReactApp folder in UserInterface Project in File Explorer
2) Open Power Shell in Administrator mode and navigate to the ReactApp folder location(cd ..\..\..\ReactApp).
3) To install and run the react app - type the command "npm install"
    This command will create a folder named "node_modules" and install required packages that are metioned in packages.json
4) Now use any Editor to change the src files.


Command to Build the distirbution file.
1)
    node_modules\.bin\webpack -dw
        (This Command is used to watch and build the file automatically while developing. This command will allow debuging.) 

2)
    node_modules\.bin\webpack -p
        (This Command is used to create a production build. This command does not allow debuging.)

