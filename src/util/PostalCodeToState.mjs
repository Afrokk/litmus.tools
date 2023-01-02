import csvFilePath from './zip_code_database.csv';

const getStateFromPostalCode = async (postalCode) => {
	if (postalCode === "" || postalCode.length < 5) {
		return 0;
	}
	const postalCodeData = {};
	try {
		let PostalDatabase = await fetch(csvFilePath);
		PostalDatabase = await PostalDatabase.text();

		PostalDatabase.split("\n").forEach((line) => {
			const [key, value] = line.split(",");
			if (value !== undefined) {
				postalCodeData[key] = value.replace("\r", "");
			}
		});

		if (postalCode in postalCodeData) {
			return postalCodeData[postalCode];
		}
		else {
			return -5;
		}
	} 
	catch (error) {
		console.log("Postal Code Database Error: ", error);
		return 0;
	}
};

export default getStateFromPostalCode;
