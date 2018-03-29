/**
 * Get the Block class.
 * @type {Object}
 */
const Block = require ("./Block.js");

/**
 * Get the hash library.
 * @type {Object}
 */
const Hash = require ("hash.js");

/**
 * Get the file system library.
 * @type {Object}
 */
const FS = require ("fs");

/**
 * Get the path library.
 * @type {Object}
 */
const Path = require ("path");




/**
 * Set a constant to be used as Genesis Block Hash to the first block added to each DB.
 * @type {[type]}
 */
const GENESIS_BLOCK_HASH = Hash.sha256 ().update ("chainDB").digest ("hex");



/**
 * Main Chain class, build new Blocks and manipulate them.
 */
class Chain {

	/**
	 * Configure an empty Chain and the name of it.
	 * 
	 * @param  {String} ChainName The name of the Chain.
	 * @return {Object} Return the configured Chain object.
	 */
	constructor (ChainName = "chainDB") {

		/**
		 * Store all Blocks of the Chain.
		 * @type {Array}
		 */
		this.Chain = [];

		/**
		 * The Name of the Chain, used to store the DB in a path with the Chain name.
		 * @type {String}
		 */
		this.ChainName = ChainName;
	}

	/**
	 * Open the Chain file.
	 * 
	 * @param {String} ChainName The name of the Chain to be opened.
	 */
	Open (ChainName) {

		/**
		 * Read the Chain file by a given name and assign to Chain if 
		 * it be successfull.
		 */
		this.__GetChainFile__ (ChainName);
	}


	//////////////////////////////////////////////////////////////
	// 					Blocks Manipulators						//
	//////////////////////////////////////////////////////////////


	/**
	 * Create the Chain path if it doesn't exists.
	 * Create a new Block and encrypt it's content.
	 * 
	 * @param {Any} The data to be stored in the Block.
	 */
	NewBlock (Content) {

		/**
		 * Make the Chain folder to store all blocks using the name of this Chain.
		 */
		this.__MakeChainPath__ ();



		/**
		 * Create e new Block based on the hash of the previous Block and add the 
		 * content of it.
		 * @type {Object}
		 */
		this.CurrentBlock = new Block (this.__PreviousBlockHash__, Content);

		/**
		 * Generate the Hash of this Block.
		 */
		this.CurrentBlock.GenBlockHash ();


		/**
		 * Add the Block to the Chain.
		 * @type {Object}
		 */
		this.Chain.push ({

			PreviousBlockHash: this.CurrentBlock.PreviousHash,
			CurrentBlockHash: this.CurrentBlock.CurrentHash
		});

		/**
		 * Save the Block to the Chain.
		 */
		this.SaveBlock ();
	}

	/**
	 * Save the Block to the Chain path, using the Block hash as the name of the file.
	 */
	SaveBlock () {

		/**
		 * Try create the Block file name inside the path of the Chain with the name
		 * based on the hash of it.
		 * If it fails, throw the Error.
		 */
		try {

			FS.writeFileSync (`${this.ChainName}/${this.CurrentBlock.CurrentHash}`, 
				this.CurrentBlock.Content, "utf-8");
		}
		catch (SomeError) {

			throw (SomeError);
		}

		/**
		 * After save the Block to the Chain at your path, update the Chain file.
		 */
		this.__MakeChainFile__ ();
	}



	///////////////////////////////////////////////////////////////
	// 			Chains And Blocks Files Manipulators			 //
	///////////////////////////////////////////////////////////////


	/**
	 * Make the path for the Chain.
	 * 
	 * @return {Error} If the path exists, it throws an error.
	 */
	__MakeChainPath__ () {

		/**
		 * Try create the path using the name of the Chain.
		 * If it fails, except if the file exists, throw the Error.
		 */
		try {

			FS.mkdirSync (Path.resolve (`./${this.ChainName}`));
		}
		catch (SomeError) {

			if (SomeError.code !== "EEXIST") {
			
				throw SomeError;
			}
		}
	}

	/**
	 * Make the Chain file saving in the path based on the Chain 
	 * name in a ChainDB name file.
	 * 
	 * @return {Error}	Tell the Error that occurred.
	 */
	__MakeChainFile__ () {

		/**
		 * Try create the file of the chain inside of your Path based on your name,
		 * puting inside it the Chain as a String.
		 * If it fails, throw the Error.
		 */
		try {

			FS.writeFileSync (`${this.ChainName}/chainDB`, JSON.stringify (this.Chain), "utf-8")
		}
		catch (SomeError) {

			throw (SomeError);
		}
	}

	/**
	 * Get the Chain file at your path based on your name and return it as an Array.
	 * 
	 * @param  {String} ChainName The name of the Chain.
	 * @return {Error}	Tell the Error that occurred.
	 */
	__GetChainFile__ (ChainName) {

		/**
		 * Small helper variable.
		 */
		let Chain;


		/**
		 * Try read the Chain file at your path and assing it to the Chain variable.
		 * If it fails, throw the Error.
		 */
		try {

			Chain = FS.readFileSync (`./${this.ChainName}/chainDB`, {encoding: "utf-8"});
		}
		catch (SomeError) {

			throw (SomeError);
		}


		/**
		 * If the Chain variable exists, assign this Chain to the Chain variable 
		 * after convert it to an Object.
		 * 
		 * @param  {Undefined/String} Chain The Chain file content.
		 * @return {[type]}       [description]
		 */
		if (Chain) {

			this.Chain = JSON.parse (Chain);
		}
	}

	//////////////////////////////////////////////////////////////
	// 						Helpers 							//
	//////////////////////////////////////////////////////////////


	/**
	 * Get the hash of the previous Block in the Chain.
	 * 
	 * @return {String} The Hash of the previous Block.
	 */
	get __PreviousBlockHash__ () {

		/**
		 * If the Chain has Blocks, return the hash of the last Block in the Chain.
		 * If the Chain has no Blocks, return the PreviousBlockHash.
		 */
		return (this.Chain.length > 0 ? 
			this.Chain [this.Chain.length - 1].CurrentBlockHash : GENESIS_BLOCK_HASH);
	}
}



/**
 * Export the Chain Class.
 * @type {Object}
 */
module.exports = Chain;