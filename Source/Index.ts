import Chain from "./Chain";



class chainDB {

	public DB:Chain;

	public New (Name:string):void {

		this.DB = new Chain (Name);
	}

	public AddBlock (Name:string, Content:any):void {

		this.DB.NewBlock (Name, Content);
	}

	public FirstLastBlock (Name:string):void {

		return this.DB.Get (Name, "First");
	}

	public GetLastBlock (Name:string):void {

		return this.DB.Get (Name, "Last");
	}

	public GetAllBlocks (Name:string):void {

		return this.DB.Get (Name);
	}
}

export = new chainDB ();