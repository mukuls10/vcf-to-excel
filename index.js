// Import the vcf package
const vcf = require("vcf");
const fs = require('fs');

const folderPath = "./input";

const fileCount = 2;

const contactInfo = [];

//loop through each vcf file
for (let i = 2; i <= fileCount; i++) {
  console.log(`fileName = ${1}.vcf`);

  const filePath = folderPath + "/" + i + ".vcf";

  console.log(`filePath ${filePath}`);

  fs.readFileSync(filePath);
  console.log('read done')

  // Read the VCF file
  const vcfData = vcf.parse(filePath);

  console.log({ vcfData });

  //   // Get an array of vCards from the VCF file
  //   const vCards = vcfData.getVCards();

  //   let c = 0;

  //   // Iterate through each contact (vCard)
  //   vCards.forEach((vCard, index) => {
  //     // console.log(`Contact ${index + 1}:`);
  //     console.log("Full Name:", vCard.fn);
  //     console.log("Phone Numbers:", vCard.get("tel"));
  //     c++;
  //     // console.log("Email Addresses:", vCard.get("email"));
  //     // You can access and print other contact details here.
  //   });

  console.log(`count : ${c}`);
}
