import fs from "fs";

const filePath = "./archivo.txt";
const searchText = "Python";

const content = fs.readFileSync(filePath, "utf-8");

if (content.includes(searchText)) {
  console.log(`✅ Se encontró: "${searchText}"`);
} else {
  console.log(`❌ No se encontró: "${searchText}"`);
}
