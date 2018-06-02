/**
 * Get the hash library.
 * @type {Object}
 */
const Hash = require ("hash.js");

/**
 * Get the encryption library.
 * @type {Object}
 */
const BlowFish = require ("egoroof-blowfish");



/**
 * Main Block class, configure the block structure and a few methods.
 */
class Block {

	/**
	 * Instantiate the class, defining: previous hash, genesis block hash,
	 * the hash of this Block, the content and the timestamp.
	 * @param  {String} Name The Name of the Block.
	 * @param  {String} PreviousHash The Hash used by the Block before this.
	 * @param  {String} Content      The data to be stored.
	 * @return {Object}              Return the configured Block object.
	 */
	constructor (Name, PreviousHash, Content) {

		/**
		 * The Name of the Block.
		 * @type {String}
		 */
		this.Name = Name;

		/**
		 * The Hash used by the Block before this.
		 * @type {String}
		 */
		this.PreviousHash = PreviousHash;

		/**
		 * The hash of the Block.
		 * @type {String}
		 */
		this.CurrentHash;

		/**
		 * The data to be stored.
		 * @type {String}
		 */
		this.Content = Content;

		/**
		 * The timestamp of this Block.
		 * @type {String}
		 */
		this.TimeStamp = new Date ().toLocaleTimeString ();
	}

	/**
	 * Generate the Hash of the Block based on the Content, PreviousHash and TimeStamp.
	 */
	GenBlockHash () {

		/**
		 * Encrypt the content of the Block.
		 */
		this.__EncryptBlockContent__ ();

		/**
		 * Concaten everything that's gonna be hashed.
		 * @type {String}
		 */
		const ThingsToBeHashed = `${this.Name} - ${this.Content} - ${this.PreviousHash} - ${this.TimeStamp}`;

		/**
		 * Hash ThingsToBeHashed and set it as the CurrentHash.
		 * @type {String}
		 */
		this.CurrentHash = Hash.sha256 ().update (ThingsToBeHashed).digest ("hex");
	}

	/**
	 * Encrypt the content of the block to 8 bit Array using the first 8 bits 
	 * of PreviousHash.
	 */
	__EncryptBlockContent__ () {

		/**
		 * Set the BlowFish with the PreviousHash as key, the mode to ECB and the padding to null.
		 * @type {Object}
		 */
		const BF = new BlowFish (this.PreviousHash, BlowFish.MODE.ECB, BlowFish.PADDING.NULL);

		/**
		 * Set the BlowFish Iv to the first 8 bits in PreviousHash.
		 */
		BF.setIv (this.PreviousHash.slice (0, 8));

		/**
		 * Encode the Content.
		 * @type {String}
		 */
		this.Content = BF.encode (JSON.stringify (this.Content));
	}

	/**
	 * Decrypt the Block Content.
	 */
	__DecryptBlockContent__ () {

		/**
		 * Set the BlowFish with the PreviousHash as key, the mode to ECB and the padding to null.
		 * @type {BlowFish}
		 */
		const BF = new BlowFish (this.PreviousHash, BlowFish.MODE.ECB, BlowFish.PADDING.NULL);

		/**
		 * Set the BlowFish Iv to the first 8 bits in PreviousHash.
		 */
		BF.setIv (this.PreviousHash.slice (0, 8));

		/**
		 * Decode the Content.
		 * @type {String}
		 */
		this.Content = BF.decode (Uint8Array.from (Object.values (JSON.parse (this.Content))), BlowFish.TYPE.STRING);
	}
}



/**
 * Export the Block class.
 * @type {Object}
 */
module.exports = Block;