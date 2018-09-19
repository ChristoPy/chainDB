"use strict";
var FS = require("fs");
var Path = require("path");
var OS = require("os");
var Chain_1 = require("./Chain");
try {
    FS.mkdirSync(Path.join(OS.homedir(), ".chainDB"));
}
catch (SomeError) {
    if (SomeError.code !== "EEXIST") {
        throw SomeError;
    }
}
var chainDB = /** @class */ (function () {
    function chainDB() {
    }
    chainDB.prototype.New = function (Name) {
        this.DB = new Chain_1["default"](Name);
    };
    chainDB.prototype.Add = function (Name, Content) {
        this.DB.NewBlock(Name, Content);
    };
    chainDB.prototype.First = function (Name) {
        return this.DB.GetBlock(Name, "first");
    };
    chainDB.prototype.Last = function (Name) {
        return this.DB.GetBlock(Name, "last");
    };
    chainDB.prototype.All = function (Name) {
        return this.DB.GetBlock(Name);
    };
    return chainDB;
}());
module.exports = new chainDB();
