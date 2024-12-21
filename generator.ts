import * as fs from "fs";

const generateTCBank = (inputFilePath: string | null = null, outputFilePath: string | null = null) => {

    const finalInputFilePath = inputFilePath ?? ".cache/tc.bank";
    const finalOutputFilePath = outputFilePath ?? "./tests/tc-bank.g.ts";

    fs.readFile(finalInputFilePath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading the input file:", err);
            return;
        }

        const lines = data.split("\n").filter(line => line.trim() !== "");

        let formattedContent = "";
        lines.forEach(line => {
            const [tcId, module, description] = line.split("|");
            formattedContent += `/**
    * Module ${module} <br>
    * ${tcId} ${description}
    */
static ${tcId} = "[${tcId}] ${description}"\n`;
        });

        let finalResult = `export default class TestCaseBank {\n ${formattedContent} \n\n}`;

        // Write the formatted content to the output file
        fs.writeFile(finalOutputFilePath, finalResult, (err) => {
            if (err) {
                console.error("Error writing the output file:", err);
            } else {
                console.log(`File successfully written to: ${finalOutputFilePath}`);
            }
        });
    });
};

// Ensure command-line arguments are passed
if (process.argv.length > 3) {
    console.error("Usage: node generator.js <inputFilePath> <outputFilePath>");
    console.error("Or Simply use node generator.js to generate ./tests/tc.bank.ts to tc.bank");
    process.exit(1);
}

// Get the file paths from the command-line arguments
const inputFilePath = process.argv[2] || null;
const outputFilePath = process.argv[3] || null;

// Call the function with the provided file paths
generateTCBank(inputFilePath, outputFilePath);
