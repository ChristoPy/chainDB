const Hash = require ("hash.js");

const BlowFish = require ("egoroof-blowfish");


class Block {

	constructor (PreviousHash, Content) {

		this.PreviousHash = PreviousHash;

		this.CurrentHash = Hash.sha256 ().update (Content).digest ("hex");

		this.Content = Content;
	}

	EncryptBlockContent () {

		const BF = new BlowFish (this.PreviousHash, 
			BlowFish.MODE.ECB, BlowFish.PADDING.NULL);

		BF.setIv (this.PreviousHash.slice (0, 8));

		const EncodedContent = JSON.stringify (BF.encode (this.Content));

		this.Content = JSON.stringify ({Content: EncodedContent});
	}
}

module.exports = Block;