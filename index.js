
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory
const sourceDir = path.join(__dirname, 'assets');
const destDir = path.join(__dirname, 'modified-assets');
if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir);
}
//passsing directoryPath and callback function
fs.readdir(sourceDir, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
        const ext = file.split('.').pop();

        if (ext === 'json') {
            const data = require(`${sourceDir}/${file}`);
            // where the magic happens
            renameKey( data, 'image', 'animation_url' );


            storeData(data,`${destDir}/${file}`);
            console.log(data)
        } else {
            if (!fs.existsSync(`${destDir}/${file}`)) copyFile(`${sourceDir}/${file}`, `${destDir}/${file}`)
        }
    });
});
const renameKey = ( obj, oldKey, newKey ) => {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
}
const copyFile = (source, dest) => {
    fs.copyFile(source, dest, (err) => {
        if (err) throw err;
        console.log(`${source} copied to destination - ${dest}`);
    });
}
const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}
