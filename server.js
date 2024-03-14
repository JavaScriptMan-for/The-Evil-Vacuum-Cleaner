const {app,BrowserWindow} = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new  BrowserWindow({
        width: 1920,
        height: 1080,
        icon:  path.join("./img", "dust_cleaner_1.png")
    })
    win.setMenuBarVisibility(false);
    win.setTitle("The Evil Vacuum Cleaner")
    win.loadFile('./index.html')
}
app.whenReady().then(()=>createWindow());
app.on('window-all-closed', ()=> app.quit());