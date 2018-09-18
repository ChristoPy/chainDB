/**
 * Get chainDB.
 * @type {Object}
 */
const DB = require ("./../Distribution/Index.js");

/**
 * Create a Chain.
 */
DB.New ("Test");

/**
 * Add two Blocks inside it.
 */
DB.AddBlock ("Standard Title", "lorem ipsum");
DB.AddBlock ("Standard Title inside an Array", ["lorem ipsum"]);

/**
 * Add two another blocks with the same Name as before.
 */
DB.AddBlock ("Standard Title", "123");
DB.AddBlock ("Standard Title inside an Array", ["123"]);


/**
 * Get the first Block with the name as "Standard Title inside an Array";
 */
console.log (DB.GetFirstBlock ("Standard Title inside an Array"));

/**
 * Get the last Block with the name as "Standard Title inside an Array";
 */
console.log (DB.GetLastBlock ("Standard Title inside an Array"));

/**
 * Get all Blocks with the name as "Standard Title inside an Array";
 */
console.log (DB.GetAllBlocks ("Standard Title inside an Array"));



/**
 * Get the first Block with the name as "Standard Title";
 */
console.log (DB.GetFirstBlock ("Standard Title"));

/**
 * Get the last Block with the name as "Standard Title";
 */
console.log (DB.GetLastBlock ("Standard Title"));

/**
 * Get all Blocks with the name as "Standard Title";
 */
console.log (DB.GetAllBlocks ("Standard Title"));