import * as fs from "fs";

// Specify the path to the file you want to read
const folderPath = "./input/";
const fileName = "4.vcf";

const filePath = folderPath + fileName;

interface Contact {
  fullName: string;
  contactNumber: string;
}

// * function for reading data from .vcf files
function readVcfData(filePath) {
  //output json
  const result: Contact[] = [];

  // Read the file using fs.readFile
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    // Split the file content into an array of lines using '\r\n' as the delimiter
    let vcfData = data.split("\r\n");

    const contacts = vcfData[0].split("END:VCARD");

    console.log("contacts", contacts.length);

    //go through each contact
    for (const contact of contacts) {
      const fullName = getFullName(contact);
      // console.log({fullName})
      const contactNumber = getContactNumber(contact);
      result.push({
        fullName,
        contactNumber,
      });
    }
    console.log(result);

    //remove last redundant element from result array
    result.pop();

    const outputFolder = `./output/${fileName[0]}.json`;

    fs.writeFileSync(outputFolder, JSON.stringify(result));
  });
}

// * function for getting full name from contactstring
function getFullName(contactString: string, idString = "FN:") {
  //identifying string for full name

  //get startIndex and endIndex
  const startIndex = contactString.indexOf(idString);
  if (startIndex == -1) return null;
  const endIndex = contactString.indexOf("\n", startIndex);

  //for removing redundant characters
  const redCharCount = idString.length;
  return contactString.substring(startIndex + redCharCount, endIndex);
}

// * function for getting contact string from contactstring
function getContactNumber(contactString: string, idString = "waid=") {
  //identifying string for full name

  //get startIndex and endIndex
  const startIndex = contactString.indexOf(idString);
  if (startIndex == -1) return null;
  const endIndex = contactString.indexOf(":", startIndex);

  //for removing redundant characters
  const redCharCount = idString.length;

  const contactNumber = contactString.substring(
    startIndex + redCharCount,
    endIndex
  );

  if (contactNumber?.length === 12 && contactNumber.substring(0, 2) === "91")
    return contactNumber.slice(2);

  return contactNumber;
}

readVcfData(filePath);

// const x = getFullName("asdfasdfasdf\nFN:Mukul Soni\nsadfasdfasdf");
// const y = getContactNumber(
//   "asdfasdfasdf\nFN:Mukul Soni\nsadfasdfasdf\nitem1.TEL;waid=918050637066:+91 80506 37066"
// );

// console.log({ x });
// console.log({ y });
