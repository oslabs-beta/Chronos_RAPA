/**
<<<<<<< HEAD
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {app, BrowserWindow, shell} = require('electron'); // Module to create native browser window.
=======
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const {app, BrowserWindow} = require('electron'); // Module to create native browser window.
>>>>>>> chronosWebsite
const {join} = require('path');
const os = require('os');

const argv = require('minimist')(process.argv.slice(2));
const projectRoots = argv._;

let mainWindow = null;

<<<<<<< HEAD
app.on('window-all-closed', function () {
  app.quit();
});

app.on('ready', function () {
=======
app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
>>>>>>> chronosWebsite
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: join(__dirname, 'icons/icon128.png'),
    frame: false,
    //titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
<<<<<<< HEAD
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      sandbox: false, // allow preload script to access file system
      preload: join(__dirname, 'preload.js'), // use a preload script to expose node globals
=======
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
>>>>>>> chronosWebsite
    },
  });

  // set dock icon for macos
  if (os.platform() === 'darwin') {
    app.dock.setIcon(join(__dirname, 'icons/icon128.png'));
  }

  // https://stackoverflow.com/questions/32402327/
<<<<<<< HEAD
  mainWindow.webContents.setWindowOpenHandler(({url}) => {
    shell.openExternal(url);
    return {action: 'deny'};
=======
  mainWindow.webContents.on('new-window', function(event, url) {
    event.preventDefault();
    require('electron').shell.openExternal(url);
>>>>>>> chronosWebsite
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/app.html'); // eslint-disable-line no-path-concat
<<<<<<< HEAD
  // $FlowFixMe[incompatible-use] found when upgrading Flow
=======
>>>>>>> chronosWebsite
  mainWindow.webContents.executeJavaScript(
    // We use this so that RN can keep relative JSX __source filenames
    // but "click to open in editor" still works. js1 passes project roots
    // as the argument to DevTools.
    'window.devtools.setProjectRoots(' + JSON.stringify(projectRoots) + ')',
  );

  // Emitted when the window is closed.
<<<<<<< HEAD
  mainWindow.on('closed', function () {
=======
  mainWindow.on('closed', function() {
>>>>>>> chronosWebsite
    mainWindow = null;
  });
});
