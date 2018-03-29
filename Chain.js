const Block = require ("./Block.js");

const Hash = require ("hash.js");

const FS = require ("fs");

const Path = require ("path");


const GENESIS_BLOCK_HASH = Hash.sha256 ().update ("chainDB").digest ("hex");


class Chain {

	constructor (ChainName = "chainDB") {

		this.Chain = [];

		this.ChainName = ChainName;
	}

	Open (ChainName) {

		this.__GetChainFile__ (ChainName);
	}


	//////////////////////////////////////////////////////////////
	// 					Blocks Manipulators						//
	//////////////////////////////////////////////////////////////


	NewBlock (Content) {

		this.__MakeChainPath__ ();

		this.CurrentBlock = new Block (this.__PreviousBlockHash__, Content);

		this.CurrentBlock.GenBlockHash ();

		this.Chain.push ({

			PreviousBlockHash: this.CurrentBlock.PreviousHash,
			CurrentBlockHash: this.CurrentBlock.CurrentHash
		});

		this.SaveBlock ();
	}

	SaveBlock () {

		try {

			FS.writeFileSync (`${this.ChainName}/${this.CurrentBlock.CurrentHash}`, 
				this.CurrentBlock.Content, "utf-8");
		}
		catch (SomeError) {

			throw (SomeError);
		}

		this.__MakeChainFile__ ();
	}



	///////////////////////////////////////////////////////////////
	// 			Chains And Blocks Files Manipulators			 //
	///////////////////////////////////////////////////////////////

	__MakeChainPath__ () {

		try {

			FS.mkdirSync (Path.resolve (`./${this.ChainName}`));
		}
		catch (SomeError) {

			if (SomeError.code !== "EEXIST") {
			
				throw SomeError;
			}
		}
	}

	__MakeChainFile__ () {

		try {

			FS.writeFileSync (`${this.ChainName}/chainDB`, JSON.stringify (this.Chain), "utf-8")
		}
		catch (SomeError) {

			throw (SomeError);
		}
	}

	__GetChainFile__ (ChainName) {


		let Chain;

		try {

			Chain = FS.readFileSync (`./${this.ChainName}/chainDB`, {encoding: "utf-8"});
		}
		catch (SomeError) {

			throw (SomeError);
		}

		if (Chain) {

			this.Chain = Chain;
		}
	}

	//////////////////////////////////////////////////////////////
	// 						Helpers 							//
	//////////////////////////////////////////////////////////////

	get __PreviousBlockHash__ () {

		return (this.Chain.length > 0 ? 
			this.Chain [this.Chain.length - 1].CurrentBlockHash : GENESIS_BLOCK_HASH);
	}
}

module.exports = Chain;