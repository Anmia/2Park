/* 
I am asuming here that only the pricing module is asked for. I am also asuming that a UI is not required.


I asume that the rental period is every started day or hour from the initial starting time. 
The format of the start time and end time is assumed to be milliseconds.

I am assuming that I only need to return a number.
*/
function treePricesCalculator (treeType, start, end) {
		var lengthOfTime = Math.ceil((end - start) / 6000); // converts the rental period to amount of hours. Then rounds up to nearest whole hour. 

		var priceToReturn = 0;

		switch (treeType) { // switch is easily maintainable
			case "standard":
				priceToReturn = standardTree(lengthOfTime);
				break;
			case "premium":
				priceToReturn = premiumTree(lengthOfTime);
				break;
			case "deluxe":
				priceToReturn = deluxeTree(lengthOfTime); // not neceserally needed, but useful for future use.
			default:
				throw("no such option");
				break;
		}

		return priceToReturn;
}

function standardTree (lengthOfTime) { // Standard Tree: US 10 per day.
	var numberOfDays = Math.ceil(lengthOfTime / 24); // converts  hours to days.
	return numberOfDays * 10; 
}

function premiumTree (lengthOfTime) { // Premium Tree: First day free. Second day USD10. Remaining days USD15.Max price 100 USD.
	var numberOfDays = Math.ceil(lengthOfTime / 24); // converts  hours to days.
	var price = 0;



	if (numberOfDays == 1) { // Most likely you wont be able to rent a tree for only a day. Included none the less.
			
		price = 0; // redundant, but makes change easier to implement

	} else if (numberOfDays == 2) { // 
		
		price = 10;

	} else { // it is assumed it is not possible to have non number values or negative values.
		price = ((numberOfDays - 2) * 15) + 10;
		if (price > 100) { // because max price is 100 USD 
			price = 100;
		}
	}

	return price;

}

function deluxeTree(lengthOfTime) { // DeluxeTree: USD 1 per hour.
	return lengthOfTime; 
}