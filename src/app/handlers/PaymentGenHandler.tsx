export function generatePaymentNumber(
        indexNumber: string,
        typeOfStudies: string,
        enrollmentYear: string,
        paymentPurpose: string
    ): string {
    // Index number must be exactly 3 digits, so we will pad with zeros if necessary (since I don't force the user to enter exactly 3 digits)
    const paddedIndex = indexNumber.padStart(3, "0");

    //? We could do validation here instead, but it's fine for now
  
    // Payment number structure: https://pmc.edu.rs/wp-content/uploads/2024/08/Evidentiranje-uplata-2024.pdf
    return `${typeOfStudies}${paddedIndex}${enrollmentYear}${paymentPurpose}`;
}

export function validatePaymentData(
        indexNumber: string,
        typeOfStudies: string,
        enrollmentYear: string,
        paymentPurpose: string
    ): [boolean, string | null] {
    
    let isValid = true;
    let validationMessage = "";

    // Index number must be exactly 3 digits, so we will pad with zeros if necessary (since I don't force the user to enter exactly 3 digits)
    const paddedIndex = indexNumber.padStart(3, "0");

    if (isValid) {
        const [isIndexValid, indexValidationMessage] = validateIndexNumber(indexNumber, paddedIndex);
        validationMessage += indexValidationMessage;
        if (!isIndexValid) {
            isValid = false;
        }
    }

    return [isValid, validationMessage];
}

function validateIndexNumber(indexNumber: string, paddedIndex: string): [boolean, string | null] {
    let isValid = true;
    let validationMessage = "";

    if (indexNumber.length < 3) {
        validationMessage = `Broj indeksa ima manje od 3 cifre (${indexNumber.length}). Umesto nedostajućih cifara, dodate su nule.\nNovi broj indeksa: ${paddedIndex}`;
    }

    // Check if the PADDED  index number is exactly 3 digits
    if (paddedIndex.length !== 3) {
        isValid = false;
        validationMessage += `Broj indeksa nema tačno 3 cifre (${paddedIndex.length})\n`;
    }

    // Check if the index number is a number
    if (!/^\d+$/.test(paddedIndex)) {
        isValid = false;
        validationMessage += "Broj indeksa ne sadrži samo brojeve\n";
    }

    return [isValid, validationMessage];
}