# ![Logo](chainDB.svg "chainDB")


chainDB is noSQL database based on blockchain tecnology. It's purpose is to make simple store data using an append only system. Wich also lets access the Blocks of the chain and read your content.


## Installation
```npm install @christopy/chaindb --save```


## Creating a Chain
```js
// Get chainDB.
const Chain = require ("@christopy/chaindb");

// Create the Chain.
Chain.New ("My DB Name");
```

## Adding Blocks
To add a Block, just specify your name and your content.
```js
// Add a Block with a name/title as "My First Block" and your content as "My First Content".
Chain.AddBlock ("My First Block", "My First Content");

// Add a Block with a name/title as "My Second Block" and your content with an Object.
Chain.AddBlock ("My Second Block", {MyContent: "My Second Content"});

// This Block has the same name as above but isn't the same.
Chain.AddBlock ("My Second Block", [1,2,3,4,5]);
```

## Picking Blocks
If the Chain has more than one Block with the same name, you can choose the Block(s) to be picked.
If there is no Block(s) it returns null.
```js
// Get the first Block added to the Chain with "My Second Block" as your name.
const MySecondBlock = Chain.GetFirstBlock ("My Second Block");

// Get the last Block added to the Chain with "My Second Block" as your name.
const MySecondBlock = Chain.GetLastBlock ("My Second Block");

// Get all Blocks added to the Chain with "My Second Block" as your name.
const MySecondBlocks = Chain.GetAllBlocks ("My Second Block");
```

## Known Bugs
+ If multiple instances share the same Chain, the reference of the Chain on the HD is different to them. Each one know your own Blocks but don't know the Blocks of the other instance.

## Thanks
Icon made by [chanut](https://www.flaticon.com/authors/chanut "chanut") from www.flaticon.com 