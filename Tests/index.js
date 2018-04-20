const Chain = require ("./../Chain.js");

const MyChain0 = new Chain ("Test");

MyChain0.NewBlock ("Title", "lorem ipsum");
MyChain0.NewBlock ("Title inside an Array", ["lorem ipsum"]);
MyChain0.NewBlock ("Zero", 0);
MyChain0.NewBlock ("Zero to 3.1 inside an Array", [0, 1, 2, 3.1]);
MyChain0.NewBlock ("Object with all data before this Block", {
	0: "lorem ipsum",
	1: ["lorem ipsum"],
	2: 0,
	3: [0, 1, 2, 3.1]
});



const MyChain0Copy = new Chain ("Test");

MyChain0Copy.NewBlock ("Update", "some new data");

console.log (MyChain0Copy.GetBlock ("Update"));