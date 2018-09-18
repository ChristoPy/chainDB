import Chain from './Chain';



class chainDB {

	public DB:Chain;

	public New (Name:string) {

		this.DB = new Chain (Name);
	}

	public AddBlock (Name:string, Content:any) {

		this.DB.NewBlock (Name, Content);
	}

	public GetFirstBlock (Name:string):object {

		return this.DB.GetBlock (Name, "first");
	}

	public GetLastBlock (Name:string):object {

		return this.DB.GetBlock (Name, "last");
	}

	public GetAllBlocks (Name:string):Array<any> {

		return this.DB.GetBlock (Name);
	}

	public DecryptBlock (Block:any) {

		return this.DB.DecryptBlock (Block);
	}
}

export = new chainDB ();