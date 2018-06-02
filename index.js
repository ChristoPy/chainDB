const Chain = require ("./Chain.js");



class chainDB {

	constructor () {

		this.Chain;
	}

	New (ChainName) {

		this.Chain = new Chain (ChainName);
	}

	AddBlock (BlockTitle, BlockContent) {

		this.Chain.NewBlock (BlockTitle, BlockContent);
	}

	GetLastBlock (BlockTitle) {

		return this.Chain.Get (BlockTitle, "Last");
	}

	GetFirstBlock (BlockTitle) {

		return this.Chain.Get (BlockTitle, "First");
	}

	GetAllBlocks (BlockTitle) {

		return this.Chain.Get (BlockTitle);
	}
}

module.exports = new chainDB ();