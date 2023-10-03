import * as ExcelJS from "exceljs";

const file1 = require("./output/1.json");
const file2 = require("./output/2.json");
const file3 = require("./output/3.json");
const file4 = require("./output/4.json");

const worksheets = [
  {
    name: "1",
    data: file1,
  },
  {
    name: "2",
    data: file2,
  },
  {
    name: "3",
    data: file3,
  },
  {
    name: "4",
    data: file4,
  },
];

const headers = [
    'Full Name',
    'Contact Number'
]

const filePath = './output/contacts.xlsx'

async function createExcel() {
  //create excelJs workbook
  const txnWorkbook = new ExcelJS.Workbook();

  //loop through the files
  for (const obj of worksheets) {
    //create worksheet
    const worksheet = txnWorkbook.addWorksheet(obj.name, {
      pageSetup: {
        horizontalCentered: true,
        verticalCentered: true,
      },
    });

    worksheet.addRow(headers);

    //loop through each row of array
    for(const rowObj of obj.data) {
        const rowCells = Object.values(rowObj);

        //converting phno string to number
        if(rowCells[1]) rowCells[1] = Number(rowCells[1])
        
        //add row to worksheet
        worksheet.addRow(rowCells);
    }

     //writing to file
     await txnWorkbook.xlsx.writeFile(filePath);

  }
}

createExcel();