import Chain from "./Chain";



class chainDB {

	public DB:Chain;

	public New (Name:string):void {

		this.DB = new Chain (Name);
	}

	public AddBlock (Name:string, Content:any):void {

		this.DB.NewBlock (Name, Content);
	}

	public GetFirstBlock (Name:string):void {

		return this.DB.GetBlock (Name, "First");
	}

	public GetLastBlock (Name:string):void {

		return this.DB.GetBlock (Name, "Last");
	}

	public GetAllBlocks (Name:string):void {

		return this.DB.GetBlock (Name);
	}
}

export = new chainDB ();