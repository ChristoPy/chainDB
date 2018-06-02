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
 * Set a constant to be used as Genesis Block Hash to the first block added to each Chain.
 * @type {String}
 */
const GENESIS_BLOCK_HASH = Hash.sha256 ().update ("chainDB").digest ("hex");



/**
 * Main Chain class, build new Blocks and manipulate them.
 */
class Chain {

	/**
	 * Configure an empty Chain and the name of it.
	 * @param  {String} ChainName The name of the Chain.
	 * @return {Object} Return the configured Chain object.
	 */
	constructor (ChainName) {

		/**
		 * Check if ChainName was given, setting every needed stuff we use the Chain.
		 * If isn't, throw an error.
		 * @param  {String} ChainName ChainName The name of the Chain.
		 * @return {Array}			The Chain, empty or not.
		 */
		if (ChainName) {

			/**
			 * Store all Blocks of the Chain.
			 * @type {Array}
			 */
			this.Chain = [];

			/**
			 * The Name of the Chain, used to store the Chain in a path with the Chain name.
			 * @type {String}
			 */
			this.ChainName = ChainName;



			/**
			 * Check if a Chain with the same name as ChainName exists, load it if exists and
			 * merge the Chain data with this Chain data.
			 */
			this.__CheckChainFileExistence__ (ChainName);
		}
		else {

			throw new Error ("The ChainName Must Be Given.");
		}
	}


	//////////////////////////////////////////////////////////////
	// 					Blocks Manipulators						//
	//////////////////////////////////////////////////////////////


	/**
	 * Create the Chain path if it doesn't exists.
	 * Create a new Block and encrypt it's content.
	 * @param {String} Name The Name of the Block.
	 * @param {Any} Content The data to be stored in the Block.
	 */
	NewBlock (Name, Content) {

		/**
		 * Make the Chain folder to store all blocks using the name of this Chain.
		 */
		this.__MakeChainPath__ ();



		/**
		 * Create e new Block based on the hash of the previous Block and add the 
		 * content of it.
		 * @type {Object}
		 */
		this.CurrentBlock = new Block (Name, this.__PreviousBlockHash__, Content);

		/**
		 * Generate the Hash of the Block.
		 */
		this.CurrentBlock.GenBlockHash ();


		/**
		 * Add the Block to the Chain.
		 * @type {Object}
		 */
		this.Chain.push ({

			Name: this.CurrentBlock.Name,
			PreviousBlockHash: this.CurrentBlock.PreviousHash,
			CurrentBlockHash: this.CurrentBlock.CurrentHash
		});

		/**
		 * Save the Block in the Chain.
		 */
		this.__MakeBlockFile__ ();
	}


	/**
	 * Get all Blocks, or the first Block found or the last Block found 
	 * in the Chain based on it's name.
	 * @param {String}  BlockName The name of the Block.
	 * @param {Boolean} Return    What will be returned, the last Block of all, all Blocks or the first one.
	 * @return {Array/OBject/Null}	All blocks, one Block or nothing.
	 */
	Get (BlockName, Return = "All") {

		/**
		 * Store all possibilities to get Blocks.
		 * @type {Array}
		 */
		const ReturnPossibilities = ["All", "Last", "First"];


		/**
		 * Check if the especified Block(s) to be returned is okay.
		 * @param  {String} ReturnPossibilities[Return] A possibility to get Blocks.
		 * @return {Array/Object}                       All the especified Blocks or the especified Block.
		 */
		if (ReturnPossibilities.includes (Return)) {

			/**
			 * Search this Chain and pick all Blocks that match with the received name.
			 * @param {Function} Function A callback to handle the search.
			 */
			let BlocksFound = this.Chain.filter (ChainBlock => ChainBlock.Name === BlockName);


			/**
			 * Return the requested Block(s).
			 * @param  {String} Return What will be returned, the last Block of all, all Blocks or the first one.
			 * @return {Array/Object/Null}
			 */
			switch (Return) {

				/**
				 * Return Blocks found or nothing.
				 * @type {Array/Null}
				 */
				case "All":
					return (BlocksFound.length > 0 ? BlocksFound : null);
					break;

				/**
				 * Return the last Block found or nothing.
				 * @type {Object/Null}
				 */
				case "Last":
					return (BlocksFound.length > 0 ? BlocksFound[BlocksFound.length - 1] : null);
					break;

				/**
				 * Return the first Block found or nothing.
				 * @type {Object/Null}
				 */
				case "First":
					return (BlocksFound.length > 0 ? BlocksFound[0] : null);
					break;

				/**
				 * Return nothing.
				 * @type {Null}
				 */
				default:
					return null;
			}

		} else {

			throw new Error ("To Get One Or More Blocks The Quantity Must Be Given.");
		}
	}

	///////////////////////////////////////////////////////////////
	// 			Chains And Blocks Files Manipulators			 //
	///////////////////////////////////////////////////////////////


	/**
	 * Make the path for the Chain.
	 * @return {Error} Except if the path exists, throws an error.
	 */
	__MakeChainPath__ () {

		/**
		 * Try create the path using the name of the Chain.
		 * If it fails, except if the path exists, throw the Error.
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
	 * @return {Error} Tell the Error that occurred.
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
	 * Get the Chain file at your path based on your name and return it as an String.
	 * @param  {String} ChainName The name of the Chain.
	 * @return {Error}	Tell the Error that occurred.
	 */
	__GetChainFile__ (ChainName) {

		/**
		 * Small helper variable.
		 */
		let Chain;


		/**
		 * Try read the Chain file at your path and assign it to the Chain variable.
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
		 * @param  {Undefined/String} Chain The Chain file content.
		 * @return {Object}       The parsed Chain file content.
		 */
		if (Chain) {

			this.Chain = JSON.parse (Chain);
		}
	}

	/**
	 * Check if the Chain file exists and get it if exists.
	 * @param  {String} ChainName The name of the Chain.
	 * @return {Array}           The parsed Chain or an empty Array.
	 */
	__CheckChainFileExistence__ (ChainName) {

		return (FS.existsSync (`./${ChainName}/chainDB`) ? this.__GetChainFile__ (ChainName) : []);
	}



	/**
	 * Get the Block file at your path based on your name and return it as Buffer.
	 * @param  {String} BlockHash The hash of the Block.
	 * @return {Buffer/Error}	Tell the Error that occurred.
	 */
	___GetBlockFile__ (BlockHash) {

		/**
		 * Small helper variable.
		 */
		let Block;


		/**
		 * Try read the Block file at your Chain path and assign it to the Block variable.
		 * If it fails, throw the Error.
		 */
		try {

			Block = FS.readFileSync (`./${this.ChainName}/${BlockHash}`);
		}
		catch (SomeError) {

			throw (SomeError);
		}


		/**
		 * If the Block variable exists, assign it to the Block variable.
		 * @param  {Undefined/String} Block The Block file content.
		 * @return {Object}       	  The Block file content.
		 */
		if (Block) {

			return Block;
		}
	}


	/**
	 * Save the Block to the Chain path, using the Block hash as the file name.
	 * @return {Error} Tell the Error that occurred.
	 */
	__MakeBlockFile__ () {

		/**
		 * Try create the Block file name inside the path of the Chain with the name
		 * based on the hash of it.
		 * If it fails, throw the Error.
		 */
		try {

			FS.writeFileSync (`${this.ChainName}/${this.CurrentBlock.CurrentHash}`, 
				JSON.stringify (this.CurrentBlock.Content));
		}
		catch (SomeError) {

			throw (SomeError);
		}

		/**
		 * After save the Block to the Chain at your path, updating the Chain file.
		 */
		this.__MakeChainFile__ ();
	}


	//////////////////////////////////////////////////////////////
	// 						Helpers 							//
	//////////////////////////////////////////////////////////////


	/**
	 * Get the hash of the previous Block in the Chain.
	 * @return {String} The Hash of the previous Block.
	 */
	get __PreviousBlockHash__ () {

		/**
		 * If the Chain has Blocks, return the hash of the last Block in the Chain.
		 * If the Chain has no Blocks, return the GENESIS_BLOCK_HASH.
		 */
		return (this.Chain.length > 0 ? 
			this.Chain [this.Chain.length - 1].CurrentBlockHash : GENESIS_BLOCK_HASH);
	}

	/**
	 * Get a Block and decrypt your Content.
	 * @param  {Object} ChainBlock The Block to be decrypted.
	 * @return {Object/Error}            The Decrypted Block or an Error if no Block be given.
	 */
	__DecryptBlock__ (ChainBlock) {

		/**
		 * If the ChainBlock don't be given, throw an Error.
		 */
		if (!ChainBlock) throw new Error ("A Block Must Be Given To Be Decrypted.");


		/**
		 * Create a new Block based on the known informations.
		 * @type {Block}
		 */
		const DecryptedBlock = new Block (ChainBlock.Name, ChainBlock.PreviousBlockHash, 
			this.___GetBlockFile__ (ChainBlock.CurrentBlockHash));

		/**
		 * Set the DecryptedBlock needed informations based on the known informations.
		 */
		DecryptedBlock.CurrentHash = ChainBlock.CurrentBlockHash;


		/**
		 * Decrypt the Block content.
		 */
		DecryptedBlock.__DecryptBlockContent__ ();



		/**
		 * Return the decrypted Block.
		 * @type {Object}
		 */
		return DecryptedBlock;
	}
}



/**
 * Export the Chain Class.
 * @type {Object}
 */
module.exports = Chain;