/**
 * Get chainDB.
 * @type {Object}
 */
const Chain = require ("./../Chain.js");


/**
 * Create an empty Chain.
 * @type {Chain}
 */
const MyChain0 = new Chain ("Test");

/**
 * Add Blocks to the created Chain.
 */
MyChain0.NewBlock ("Standard Title", "lorem ipsum");
MyChain0.NewBlock ("Standard Title inside an Array", ["lorem ipsum"]);
MyChain0.NewBlock ("Zero", 0);
MyChain0.NewBlock ("Zero to 3.1 inside an Array", [0, 1, 2, 3.1]);
MyChain0.NewBlock ("Object with the same data as before", {
	0: "lorem ipsum",
	1: ["lorem ipsum"],
	2: 0,
	3: [0, 1, 2, 3.1]
});


/**
 * Create a Chain with the same Blocks as MyChain0.
 * @type {Chain}
 */
const MyChain1 = new Chain ("Test");

/**
 * Add a Block to the Chain "Test".
 */
MyChain1.NewBlock ("I'm New Here!", "some new data");


/**
 * Should return the Block on the Chain.
 * TO DO:
 * 	Returns null, the Block is on the Chain but not referenced on MyChain0.
 */
// console.log (MyChain0.GetBlock ("I'm New Here!"));

/**
 * Return the Block on the Chain.
 */
console.log (MyChain1.GetBlock ("I'm New Here!"));