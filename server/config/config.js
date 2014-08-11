var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/multivision',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://dmikhaylov:pirojokiwe@ds033639.mongolab.com:33639/dm_mongo_exp',
        port: process.env.PORT || 80
    }
};