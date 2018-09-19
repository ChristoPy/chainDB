"use strict";
exports.__esModule = true;
var FS = require("fs");
var Path = require("path");
var Block_1 = require("./Block");
var OS = require("os");
var Chain = /** @class */ (function () {
    function Chain(Name) {
        this.Chain = [];
        if (!Name) {
            throw new Error("The chain must have a name.");
        }
        this.Name = Name;
        this.__DBPath__ = Path.join(OS.homedir(), ".chainDB/" + this.Name);
        this.Chain = (FS.existsSync(Path.join(this.__DBPath__, "chainDB")) ? this.__GetFile__("chainDB", true) : []);
        this.__MakeChainPath__();
    }
    Chain.prototype.NewBlock = function (Name, Content) {
        this.CurrentBlock = new Block_1["default"](Name, Content, this.__PreviousBlockHash__());
        this.CurrentBlock.Encrypt();
        this.Chain.push({
            Name: this.CurrentBlock.Name,
            PreviousBlockHash: this.CurrentBlock.PreviousBlockHash,
            CurrentBlockHash: this.CurrentBlock.BlockHash
        });
        this.__MakeFile__(this.CurrentBlock.BlockHash, JSON.stringify(this.CurrentBlock.Content), null);
        this.__MakeFile__("chainDB", JSON.stringify(this.Chain));
    };
    Chain.prototype.GetBlock = function (BlockName, Return) {
        var _this = this;
        if (Return === void 0) { Return = "all"; }
        var ReturnEspecification = ["all", "last", "first"];
        var Found = this.Chain.filter(function (Block) { return Block.Name === BlockName; });
        if (Found.length === 0) {
            return null;
        }
        switch (Return) {
            case "first": return this.__DecryptBlock__(Found[0]);
            case "last": return this.__DecryptBlock__(Found[Found.length - 1]);
            default: return Found.map(function (BlockFound) { return JSON.parse(_this.__DecryptBlock__(BlockFound)); });
        }
    };
    Chain.prototype.__DecryptBlock__ = function (BlockData) {
        if (!BlockData) {
            throw new Error("A Block Must Be Given To Be Decrypted.");
        }
        var BlockDataContent = this.__GetFile__(BlockData.CurrentBlockHash);
        var DecryptedBlock = new Block_1["default"](BlockData.Name, BlockDataContent, BlockData.PreviousBlockHash);
        DecryptedBlock.BlockHash = BlockData.CurrentBlockHash;
        return DecryptedBlock.Decrypt();
    };
    Chain.prototype.__MakeChainPath__ = function () {
        try {
            FS.mkdirSync(this.__DBPath__);
        }
        catch (SomeError) {
            if (SomeError.code !== "EEXIST") {
                throw SomeError;
            }
        }
    };
    Chain.prototype.__GetFile__ = function (FileName, Parse, Encode) {
        if (Parse === void 0) { Parse = false; }
        if (Encode === void 0) { Encode = "utf-8"; }
        var File;
        try {
            File = FS.readFileSync(Path.join(this.__DBPath__, FileName), Encode);
        }
        catch (SomeError) {
            throw (SomeError);
        }
        if (File) {
            return (Parse ? JSON.parse(File) : File);
        }
    };
    Chain.prototype.__MakeFile__ = function (FileName, Content, Encode) {
        if (Encode === void 0) { Encode = "utf-8"; }
        try {
            FS.writeFileSync(Path.join(this.__DBPath__, FileName), Content, Encode);
        }
        catch (SomeError) {
            throw (SomeError);
        }
    };
    Chain.prototype.__PreviousBlockHash__ = function () {
        return this.Chain.length > 0 ? this.Chain[this.Chain.length - 1].CurrentBlockHash : null;
    };
    return Chain;
}());
exports["default"] = Chain;
