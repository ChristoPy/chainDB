/**
 * Get chainDB.
 * @type {Object}
 */
const Chain = require ("./../index.js");

/**
 * Create a Chain.
 */
Chain.New ("Example");

/**
 * Add two Blocks inside it.
 */
Chain.AddBlock ("Standard Title", "lorem ipsum");
Chain.AddBlock ("Standard Title inside an Array", ["lorem ipsum"]);

/**
 * Add two another blocks with the same Name as before.
 */
Chain.AddBlock ("Standard Title", "123");
Chain.AddBlock ("Standard Title inside an Array", ["123"]);


/**
 * Get the first Block with the name as "Standard Title inside an Array";
 */
console.log (Chain.GetFirstBlock ("Standard Title inside an Array"));

/**
 * Get the last Block with the name as "Standard Title inside an Array";
 */
console.log (Chain.GetLastBlock ("Standard Title inside an Array"));

/**
 * Get all Blocks with the name as "Standard Title inside an Array";
 */
console.log (Chain.GetAllBlocks ("Standard Title inside an Array"));



/**
 * Get the first Block with the name as "Standard Title";
 */
console.log (Chain.GetFirstBlock ("Standard Title"));

/**
 * Get the last Block with the name as "Standard Title";
 */
console.log (Chain.GetLastBlock ("Standard Title"));

/**
 * Get all Blocks with the name as "Standard Title";
 */
console.log (Chain.GetAllBlocks ("Standard Title"));