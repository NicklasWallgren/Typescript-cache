class Serializer_JSON implements Serializer_Interface {
	
	public serialize(data : any) : string {
		return JSON.stringify(data);
	}

}