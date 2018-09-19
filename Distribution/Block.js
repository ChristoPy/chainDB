"use strict";
exports.__esModule = true;
var HashJS = require("hash.js");
var BlowFish = require("egoroof-blowfish");
var Hash = HashJS["sha"];
var GENESIS_BLOCK_HASH = Hash.sha256().update("chainDB").digest("hex");
var Block = /** @class */ (function () {
    function Block(Name, Content, PreviousBlockHash) {
        this.Name = Name;
        this.PreviousBlockHash = PreviousBlockHash || GENESIS_BLOCK_HASH;
        this.Content = Content;
        this.TimeStamp = new Date().toLocaleTimeString();
    }
    Block.prototype.Encrypt = function () {
        this.__EncryptBlockContent__();
        this.__CalculateHash__();
    };
    Block.prototype.Decrypt = function () {
        return this.__DecryptBlockContent__();
    };
    Block.prototype.__CalculateHash__ = function () {
        var ThingsToBeHashed = this.Name + " - " + this.Content + " - " + this.PreviousBlockHash + " - " + this.TimeStamp;
        this.BlockHash = Hash.sha256().update(ThingsToBeHashed).digest("hex");
    };
    Block.prototype.__EncryptBlockContent__ = function () {
        var BF = this.__ConfigureBlowFish__();
        this.Content = BF.encode(JSON.stringify(this.Content));
    };
    Block.prototype.__DecryptBlockContent__ = function () {
        var BF = this.__ConfigureBlowFish__();
        return BF.decode(Uint8Array.from(Object["values"](JSON.parse(this.Content))), BlowFish.TYPE.STRING);
    };
    Block.prototype.__ConfigureBlowFish__ = function () {
        var BF = new BlowFish(this.PreviousBlockHash, BlowFish.MODE.ECB, BlowFish.PADDING.NULL);
        BF.setIv(this.PreviousBlockHash.slice(0, 8));
        return BF;
    };
    return Block;
}());
exports["default"] = Block;
