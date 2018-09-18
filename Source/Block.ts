import * as HashJS from "hash.js";
import * as BlowFish from "egoroof-blowfish";

const Hash = HashJS["sha"];
const GENESIS_BLOCK_HASH = Hash.sha256 ().update ("chainDB").digest ("hex");

export default class Block {

	public Name:String;
	public PreviousBlockHash:String;
	public Content:string;
	public TimeStamp:String;
	public BlockHash:Sha256;

	constructor (Name:String, Content:any, PreviousBlockHash:String) {

		this.Name = Name;
		this.PreviousBlockHash = PreviousBlockHash || GENESIS_BLOCK_HASH;
		this.Content = Content;
		this.TimeStamp = new Date ().toLocaleTimeString ();
	}

	Encrypt ():void {

		this.__EncryptBlockContent__ ();
		this.__CalculateHash__ ();
	}

	Decrypt ():void {

		return this.__DecryptBlockContent__ ();
	}

	private __CalculateHash__ ():void {

		const ThingsToBeHashed = `${this.Name} - ${this.Content} - ${this.PreviousBlockHash} - ${this.TimeStamp}`;
		this.BlockHash = Hash.sha256 ().update (ThingsToBeHashed).digest ("hex");
	}

	private __EncryptBlockContent__ ():void {

		const BF = this.__ConfigureBlowFish__ ();
		this.Content = BF.encode (JSON.stringify (this.Content));
	}

	private __DecryptBlockContent__ ():void {

		const BF = this.__ConfigureBlowFish__ ();
		return BF.decode (Uint8Array.from (Object["values"] (JSON.parse (this.Content))), BlowFish.TYPE.STRING);
	}

	private __ConfigureBlowFish__ ():BlowFish {

		const BF = new BlowFish (this.PreviousBlockHash, BlowFish.MODE.ECB, BlowFish.PADDING.NULL);
		BF.setIv (this.PreviousBlockHash.slice (0, 8));

		return BF;
	}
}