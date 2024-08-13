const fs = require('fs');
const path = require('path')


exports.ensureFileExists = () => {
    const filePath = path.join(__dirname, 'data.json');
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8');
    }
};
