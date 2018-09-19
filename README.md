<div style="text-align: center; margin: 30px 0;"><img src="chainDB.svg" alt="chainDB" style="max-width: 80%;"/></div>

<div style="margin-bottom: 20px;">
A noSQL database based on blockchain technology. It's purpose is to store data using a simple append only system (maybe a future way to edit Blocks?).

<div style="margin-top: 10px;">

[![CodeFactor](https://www.codefactor.io/repository/github/christopy/chaindb/badge/master)](https://www.codefactor.io/repository/github/christopy/chaindb/overview/master)

</div>
</div>


## Installation
```npm install @christopy/chaindb --save```


## Creating a Chain
```js
// Get chainDB.
const Chain = require ("@christopy/chaindb");

// Create the Chain.
Chain.New ("My awesome blockchain DB");
```

## Adding Blocks
To add a Block, just specify your name and your content.
```js
// Add a Block with a title of "phrase" and your content as "lorem ipsum".
Chain.Add ("phrase", "lorem ipsum");

// Add a Block with a title of "user" and your content as an Object.
Chain.Add ("user", {
  name: "john",
  last_name: "doe"
});

// Add a Block with a title of "user" and your content as an Object.
Chain.Add ("user", {
  username: "ChristoPy",
  age: 19
});
```

## Picking Blocks
To get Blocks, just specify your name and if you want the first, the last or all Blocks added with that name.
If no Blocks where found, returns null.
```js
// Get the first Block added to the Chain with "user" as your name.
const FirstUser = Chain.First ("user"); // {name: "john", last_name: "doe"}

// Get the last Block added to the Chain with "user" as your name.
const LastUser = Chain.Last ("user"); // {username: "ChristoPy", age: 19}

// Get all Blocks added to the Chain with "user" as your name.
const AllUsers = Chain.All ("user"); // [{name: "john", last_name: "doe"}, {username: "ChristoPy", age: 19}]

// Tryies to get a Block that don't exists on the Chain.
const AllHeroes = Chain.All ("superheroes"); // null
```

## Why blockchain?
Why not blockchain?

## Version
2.0.3

## Thanks
Icon made by [chanut](https://www.flaticon.com/authors/chanut "chanut") from www.flaticon.com 