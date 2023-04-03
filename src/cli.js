#!/usr/bin/env node
import chalk from "chalk";
import fs from "fs";
import pegaArquivo from "./index.js";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

async function imprimeLista(valida, resultado, diretorio = "") {
  if (valida) {
    console.log(
      chalk.yellow(`lista de validada`),
      chalk.black.bgGreen(diretorio),
      await listaValidada(resultado)
    );
  } else {
    console.log(
      chalk.yellow(`lista de Links`),
      chalk.black.bgGreen(diretorio),
      resultado
    );
  }
}

async function processarTexto(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === "valida";

  try {
    fs.lstatSync(caminho);
  } catch (error) {
    if (error.code === "ENOENT") {
      return console.log("arquivo ou diretório não existe!");
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegaArquivo(caminho);
    imprimeLista(valida, resultado);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (arquivo) => {
      const lista = await pegaArquivo(`${caminho}/${arquivo}`);
      imprimeLista(valida, lista, arquivo);
    });
  }
}

processarTexto(caminho);
