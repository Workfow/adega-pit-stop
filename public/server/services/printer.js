// const printer = require('printer');
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

// const thermalPrinter = new ThermalPrinter({
//   type: PrinterTypes.EPSON,
//   characterSet: 'SLOVENIA',
//   lineCharacter: '-'
// });

// thermalPrinter.alignCenter();
// thermalPrinter.println("Adega Recanto da Cerveja");
// thermalPrinter.drawLine();

// try {
//   thermalPrinter.execute();
//   console.log("Print done");
// } catch (err) {
//   console.log("Print failed", err);
// }

// printer.printDirect({
//   data: thermalPrinter.getBuffer(),
//   printer: 'PDF',
//   type: 'RAW',
//   success: function (jobID) {
//       console.log(`printer job: ${jobID}`);
//       thermalPrinter.clear();
//   },
//   error: function (err) {
//       console.log(err);
//   }
// })

const printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: "/dev/usb/lp1",
  characterSet: "SLOVENIA",
  removeSpecialCharacters: false,
  lineCharacter: "-",
});

printer.alignCenter();
printer.println("Adega Recanto da Cerveja");
printer.drawLine();
printer.cut();

printer.execute(function (err) {
  if (err) {
    console.log("Print Failed", err);
  } else {
    console.log("Print done");
  }
});
