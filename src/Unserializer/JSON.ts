class Unserializer_JSON implements Unserializer_Interface {
	
	public unserialize(data : any) : string {
		return JSON.parse(data);
	}

}