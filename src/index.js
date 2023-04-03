import chalk from "chalk";
import fs from "fs";

function extrairLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

  const capturas = [...texto.matchAll(regex)];

  const resultados = capturas.map((captura) => ({ [captura[1]]: captura[2] }));
  return resultados.length !== 0 ? resultados : "não há links no arquivo";
}


const trataErro = (erro) => {
  throw new Error(chalk.red(erro.code, "não há arquivos fodase"));
};

async function pegaArquivo(caminho) {
  try {
    const enconding = "utf-8";
    const texto = await fs.promises.readFile(caminho, enconding);

    return extrairLinks(texto)
  } catch (error) {
    trataErro(error);
  } finally {
    console.log(chalk.yellow("operação concluída"));
  }
}


export default pegaArquivo
