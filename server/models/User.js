var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');


var userSchema = mongoose.Schema({
    firstName: { type: String, required: '{PATH} is required!' },
    lastName: { type: String, required: '{PATH} is required!' },
    userName: {type: String, required: '{PATH} is required!', unique: true},
    salt: {type: String, select: false, required: '{PATH} is required!'},
    hashed_pwd: {type: String, select: false, required: '{PATH} is required!'},
    roles: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encryption.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role) {
        return this.roles.indexOf('Admin') > -1;
    },
    safe: function() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            roles: this.roles
        };
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'joe');
            User.create({firstName: 'Joe', lastName: 'Eames', userName: 'joe', salt: salt, hashed_pwd: hash});
            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'dima');
            User.create({firstName: 'Dmitry', lastName: 'Mikhaylov', userName: 'dima', salt: salt, hashed_pwd: hash, roles: ['Admin']});
            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'sally');
            User.create({firstName: 'Dan', lastName: 'Sallivan', userName: 'sally', salt: salt, hashed_pwd: hash});
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;