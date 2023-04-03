import chalk from "chalk";

function extrairLinks(arrLinks) {
  return arrLinks.map((obj) => Object.values(obj).join());
}

async function checaStatus(listaURLs) {
  const arrStatus = await Promise.all(
    listaURLs.map(async (url) => {
      try {
        const res = await fetch(url);
        return `${res.status} - ${res.statusText}`;
      } catch (error) {
        return manejaErros(error);
      }
    })
  );
  return arrStatus;
}

function manejaErros(error) {
  if (error.cause.code === "ENOTFOUND") {
    return "Link não encontrado!";
  } else {
    return "Ocorreu algum erro!"
}
}

async function listaValidada(listaDeLinks) {
  const listaUrls = extrairLinks(listaDeLinks);
  const status = await checaStatus(listaUrls);
  return listaDeLinks.map((links, index) => ({
    ...links,
    status: status[index],
  }));
}

export default listaValidada;
