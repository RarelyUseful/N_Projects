const sample = "this is sample text with  number inside, some postcode 12-123 and phone  number 501-502-503";

const postCode = new RegExp("\\d{2}-\\d{3}");
let postCodeTestResult = postCode.test(sample);
console.log("Czy string zawiera kod pocztowy: " + postCodeTestResult);

const phoneNumber = new RegExp("\\d{3}[\\s-]\\d{3}[\\s-]\\d{3}");
let phoneNumberTestResult = phoneNumber.test(sample);
console.log("Czy string zawiera nr telefonu: " + phoneNumberTestResult);

const threeDigitsRegex = new RegExp("\\d{3}", "g");
let searchRes = sample.matchAll(threeDigitsRegex);
for (const match of searchRes) {
  console.log(`Found match: ${match[0]}, start at ${match.index} end at ${match.index + match[0].length}`);
}

const twoWhiteSpacesRegex = new RegExp("\\s{2}", "g");
let newString = sample.replace(twoWhiteSpacesRegex, " ");
console.log(newString);
