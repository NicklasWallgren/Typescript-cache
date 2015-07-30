class Utility_Date {

	public static getTimeInSeconds() {
		// Get the current date
		var time = new Date();

		return (time.getTime() / 1000);
	}

}
