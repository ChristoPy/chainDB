/**
 * The Chain class.
 * @type {Object}
 */
const Chain = require ("./Chain.js");



/**
 * The main chainDB class.
 */
class chainDB {

	/**
	 * Instantiate the class.
	 * @return {Object} Set the needed informations to handle the Chain.
	 */
	constructor () {

		/**
		 * The Chain that will be manipulated later.
		 */
		this.Chain;
	}

	/**
	 * Create a new Chain.
	 * @param {String} ChainName The name of the Chain.
	 */
	New (ChainName) {

		this.Chain = new Chain (ChainName);
	}

	/**
	 * Add a Block to the Chain.
	 * @param {String} BlockTitle   The Name/Title for the Block.
	 * @param {Any} BlockContent The content of the Block.
	 */
	AddBlock (BlockTitle, BlockContent) {

		this.Chain.NewBlock (BlockTitle, BlockContent);
	}

	/**
	 * Search the Chain and get the last Block found.
	 * @param {[type]} BlockTitle [description]
	 */
	GetLastBlock (BlockTitle) {

		return this.Chain.Get (BlockTitle, "Last");
	}

	/**
	 * Search the Chain and get the first Block found.
	 * @param {[type]} BlockTitle [description]
	 */
	GetFirstBlock (BlockTitle) {

		return this.Chain.Get (BlockTitle, "First");
	}

	/**
	 * Search the Chain and get all Blocks found.
	 * @param {[type]} BlockTitle [description]
	 */
	GetAllBlocks (BlockTitle) {

		return this.Chain.Get (BlockTitle);
	}
}

module.exports = new chainDB ();