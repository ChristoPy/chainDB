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
 * Main Block class, hold the block structure and a few methods.
 */
class Block {

	/**
	 * Instantiate the class, defining: previous hash, genesis block hash,
	 * the hash of this Block, the content and the timeStamp.
	 * 
	 * @param  {String} Name The Name of the Block.
	 * @param  {String} PreviousHash The Hash used by the last Block.
	 * @param  {String} Content      The data to be stored.
	 * @return {Object}              Return the configured Block object.
	 */
	constructor (Name, PreviousHash, Content) {

		/**
		 * The name of this Block.
		 * @type {String}
		 */
		this.Name = Name;

		/**
		 * The hash used in the last Block.
		 * @type {String}
		 */
		this.PreviousHash = PreviousHash;

		/**
		 * The hash of this Block.
		 * @type {String}
		 */
		this.CurrentHash = undefined;

		/**
		 * The data to be stored.
		 * @type {String}
		 */
		this.Content = JSON.stringify (Content);

		/**
		 * The timestamp of this Block.
		 * @type {String}
		 */
		this.TimeStamp = JSON.stringify (new Date ());
	}

	/**
	 * Generate the Hash of this Block based on the Content, PreviousHash and the TimeStamp.
	 */
	GenBlockHash () {

		/**
		 * Encrypt the conent of the Block.
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
	 * of the PreviousHash.
	 */
	__EncryptBlockContent__ () {

		/**
		 * Set the BlowFish with the PreviousHash as key, the ECB mode and the padding to null.
		 * @type {Object}
		 */
		const BF = new BlowFish (this.PreviousHash, BlowFish.MODE.ECB, BlowFish.PADDING.NULL);

		/**
		 * Set the BlowFish Iv to the first 8 bits in PreviousHash.
		 */
		BF.setIv (this.PreviousHash.slice (0, 8));

		/**
		 * Encode the content of this Block and convert it to a JSON String.
		 * @type {String}
		 */
		const EncodedContent = JSON.stringify (BF.encode (this.Content));

		/**
		 * Set the Block Content based on the EncodedContent and puting inside an object.
		 * @type {Object}
		 */
		this.Content = JSON.stringify ({Content: EncodedContent});
	}
}



/**
 * Export the Block class.
 * @type {Object}
 */
module.exports = Block;