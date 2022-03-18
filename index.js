
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory
const destDir = path.join(__dirname, 'metadata');

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir);
}

const raw = `{
    "name": "Founders Pass #001",
    "symbol": "FP-P89",
    "description": "Collection of 333 Founders Passes, Which Grant You Special Perks Within Project89",
    "seller_fee_basis_points": 500,
    "image": "0.png",
    "animation_url": "0.mp4",
    "external_url": "https://project89.io",
    "attributes": [
      {
        "trait_type": "Founder Tier",
        "value": "Diamond"
      }
    ],
    "collection": {
       "name": "Founders Pass",
       "family": "Project89"
    },
    "properties": {
      "files": [
        {
          "uri": "0.png",
          "type": "image/png"
        },
        {
          "uri": "0.mp4",
          "type": "video/mp4"
        }
      ],
      "category": "video",
      "creators": [
        {
          "address": "6QH3FzZFgdgQmK7Fi36TcTdAh5EH6NN2NwNjjbNpcFiQ",
          "share": 100
        }
      ]
    }
  }`

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
        fs.writeFileSync(path, JSON.stringify(data, null, 4))
    } catch (err) {
        console.error(err)
    }
}
function getlength(number) {
    return number.toString().length;
}
function writeProject89Meta() {
    for (let i = 0;i <= 332; i++) {
        let tier, zeroes;
        switch (i)
        {
            case i < 16:
                tier = 'Diamond';
                break;
    
            case i < 65:
                tier = 'Gold';
                break;
            case i < 106:
                tier = 'Silver';
                break;
            
            default:
                tier = 'Bronze'
                break;
        }
        // check if number needs 0's in front of it
        const numberOfDigits = getlength(i+1);
        switch (numberOfDigits)
        {
            case 1:
                zeroes = '00';
                break
            case 2:
                zeroes = '0';
                break
            default:
                zeroes = '';
                break
        }
        
        const json = JSON.parse(raw);
    
        //Fields that we will modify
        const name = `Founders Pass #${zeroes}${i+1}`;
        const image = `${i}.png`;
        const animation = `${i}.mp4`;
    
        json['name'] = name;
        json['image'] = image;
        json['animation_url'] = animation;
        json['attributes'][0].value = tier;
        json['properties']['files'][0]['uri'] = image;
        json['properties']['files'][1]['uri'] = animation;
    
    
        storeData(json,`${destDir}/${i}.json`);
        console.log(json)
    
    }
}


writeProject89Meta();


