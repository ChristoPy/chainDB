const Chain = require ("./../Chain.js");

const MyChain0 = new Chain ("Test");

MyChain0.NewBlock ("lorem ipsum");
MyChain0.NewBlock (["lorem ipsum"]);
MyChain0.NewBlock (0);
MyChain0.NewBlock ([0, 1, 2, 3.1]);
MyChain0.NewBlock ({
	0: "lorem ipsum",
	1: ["lorem ipsum"],
	2: 0,
	3: [0, 1, 2, 3.1]
});



const MyChain0Copy = new Chain ("Test");

MyChain0Copy.NewBlock ("some new data");
