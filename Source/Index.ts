import * as FS from "fs";
import * as Path from "path";
import * as OS from "os";

import Chain from "./Chain";


try {

	FS.mkdirSync (Path.join (OS.homedir (), ".chainDB"));

} catch (SomeError) {

	if (SomeError.code !== "EEXIST") {
	
		throw SomeError;
	}
}

class chainDB {

	public DB:Chain;

	public New (Name:string) {

		this.DB = new Chain (Name);
	}

	public Add (Name:string, Content:any) {

		this.DB.NewBlock (Name, Content);
	}

	public First (Name:string):object {

		return this.DB.GetBlock (Name, "first");
	}

	public Last (Name:string):object {

		return this.DB.GetBlock (Name, "last");
	}

	public All (Name:string):Array<any> {

		return this.DB.GetBlock (Name);
	}
}

export = new chainDB ();