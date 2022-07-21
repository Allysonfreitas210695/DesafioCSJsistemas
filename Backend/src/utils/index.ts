export function removeAcentos(texto: string){
  var semAcento = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  return semAcento;
}