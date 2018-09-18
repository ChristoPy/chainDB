import * as FS from "fs";
import * as Path from "path";
import Block from './Block';


export default class Chain {

	public Name:string;
	public Chain = [];
	private CurrentBlock:Block;

	constructor (Name:string) {

		if (!Name) {

			throw new Error ("The chain must have a name.");
		}

		this.Name = Name;
		this.__CheckChainFileExistence__ ();
	}

	public NewBlock (Name:string, Content:any):void {

		this.__MakeChainPath__ ();

		this.CurrentBlock = new Block (Name, Content, this.__PreviousBlockHash__ ());
		this.CurrentBlock.Encrypt ();


		this.Chain.push ({

			Name: this.CurrentBlock.Name,
			PreviousBlockHash: this.CurrentBlock.PreviousBlockHash,
			CurrentBlockHash: this.CurrentBlock.BlockHash
		});

		this.__MakeFile__ (this.CurrentBlock.BlockHash, JSON.stringify (this.CurrentBlock.Content), null);
		this.__MakeFile__ ("chainDB", JSON.stringify (this.Chain));
	}

	public GetBlock (BlockName:String, Return:String = "all") {

		const ReturnEspecification:any = ["all", "last", "first"];
		const Found = this.Chain.filter (Block => Block.Name === BlockName);

		if (Found.length === 0) {

			return null;
		}

		switch (ReturnEspecification) {

			case "first": return Found[0]
			case "last": return Found[Found.length-1];
			default: return Found;
		}
	}

	private __MakeChainPath__ ():void {

		try {

			FS.mkdirSync (Path.resolve (`./${this.Name}`));
		} catch (SomeError) {

			if (SomeError.code !== "EEXIST") {
			
				throw SomeError;
			}
		}
	}

	private __GetFile__ (FileName:string, Parse:boolean = false, Encode:any = "utf-8"):any {

		let File;

		try {

			File = FS.readFileSync (`./${this.Name}/${FileName}`, Encode);
		} catch (SomeError) {

			throw (SomeError);
		}

		if (File) {

			return (Parse ? JSON.parse (File) : File);
		}
	}

	private __MakeFile__ (FileName:any, Content:string, Encode:any = "utf-8"):any {

		try {
			FS.writeFileSync (`${this.Name}/${FileName}`, Content, Encode);
		} catch (SomeError) {

			throw (SomeError);
		}
	}

	private __CheckChainFileExistence__ ():any {

		const Chain = (FS.existsSync (`./${this.Name}/chainDB`) ? this.__GetFile__ ("chainDB", true) : []);

		if (Chain) {
			
			this.Chain = Chain;
		}
	}
	private __PreviousBlockHash__ ():any {

		return this.Chain.length > 0 ? this.Chain [this.Chain.length - 1].CurrentBlockHash : null;
	}
}