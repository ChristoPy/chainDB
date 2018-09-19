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
DB.Add ("Standard Title", "lorem ipsum");
DB.Add ("Standard Title inside an Array", ["lorem ipsum"]);

/**
 * Add two another blocks with the same Name as before.
 */
DB.Add ("Standard Title", "123");
DB.Add ("Standard Title inside an Array", ["123"]);


/**
 * Get the first Block with the name as "Standard Title inside an Array";
 */
console.log (DB.First ("Standard Title inside an Array"));

/**
 * Get the last Block with the name as "Standard Title inside an Array";
 */
console.log (DB.Last ("Standard Title inside an Array"));

/**
 * Get all Blocks with the name as "Standard Title inside an Array";
 */
console.log (DB.All ("Standard Title inside an Array"));



/**
 * Get the first Block with the name as "Standard Title";
 */
console.log (DB.First ("Standard Title"));

/**
 * Get the last Block with the name as "Standard Title";
 */
console.log (DB.Last ("Standard Title"));

/**
 * Get all Blocks with the name as "Standard Title";
 */
console.log (DB.All ("Standard Title"));