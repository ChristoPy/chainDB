const Chain = require ("./../Chain.js");

const MyChain = new Chain ("Test");

MyChain.NewBlock ("lorem ipsum");
MyChain.NewBlock (["lorem ipsum"]);
MyChain.NewBlock (0);
MyChain.NewBlock ([0, 1, 2, 3.1]);
MyChain.NewBlock ({
	0: "lorem ipsum",
	1: ["lorem ipsum"],
	2: 0,
	3: [0, 1, 2, 3.1]
});