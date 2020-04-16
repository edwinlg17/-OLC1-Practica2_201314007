
const tkInt = "tkInt", tkDou = "tkDou", tkCha = "tkCha", tkBoo = "tkBoo", tkStr = "tkStr", tkVoi = "tkVoi", tkMai = "tkMai", tkRet = "tkRet", tkBre = "tkBre", tkCont = "tkCont", tkIf = "tkIf", tkEls = "tkEls", tkSwi = "tkSwi", tkCas = "tkCas", tkDef = "tkDef", tkFor = "tkFor", tkDo = "tkDo", tkWhi = "tkWhi", tkCons = "tkCons", tkWri = "tkWri", tkIde = "tkIde", tkSPun = "tkSPun", tkSCom = "tkSCom", tkSDosPun = "tkSDosPun", tkSPunCom = "tkSPunCom", tkSAbrLla = "tkSAbrLla", tkSCieLla = "tkSCieLla", tkSAbrPar = "tkSAbrPar", tkSCiePar = "tkSCiePar", tkSAbrCor = "tkSAbrCor", tkSCieCor = "tkSCieCor", tkSIgu = "tkSIgu", tkSMen = "tkSMen", tkSMay = "tkSMay", tkSAdm = "tkSAdm", tkSMas = "tkSMas", tkSGui = "tkSGui", tkSAst = "tkSAst", tkSAmp = "tkSAmp", tkSBarVer = "tkSBarVer", tkSBarInv = "tkSBarInv", tkSComSim = "tkSComSim", tkSComDob = "tkSComDob", tkSSal = "tkSSal", tkSTab = "tkSTab", tkSRet = "tkSRet", TkSDes = "TkSDes", tkNum = "tkNum", tkCad = "tkCad", tkCar = "tkCar", tkCadHtm = "tkCadHtm", tkSBarInc = "tkSBarInc", tkCome = "tkCome";
np = 0;

//////////////////////////////////// Archivo
function nuePes() {
  np++;
  crePes("nuevo " + np, "", np);
}

function abr() {
  var input = document.createElement('input');
  input.type = 'file';
  input.id = 'archivo';
  input.accept = '.cs'; // extencion a permitir

  input.onchange = e => {

    var file = e.target.files[0];

    console.log(file);

    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = readerEvent => {
      var contenido = readerEvent.target.result;

      np++;
      crePes(file.name.replace(".cs", ""), contenido, np);
    }
  }

  input.click();
}

function gua() {
  con = document.getElementsByClassName("tab-pane active");
  ele = con[0];
  ide = ele.getAttribute('id');

  ttex = document.getElementById("t" + ide).value;
  tnom = document.getElementById("p" + ide).innerHTML;

  if (tnom.endsWith(".cs")) {
    //alert("si termina");
  } else {
    tnom += ".cs";
  }

  var elem = document.getElementById('guardar');
  elem.download = tnom;
  elem.href = "data:application/octet-stream," + encodeURIComponent(ttex);
}

function guaCom() {
  tnom = prompt("Nombre del archivo", "");

  if (tnom.valueOf() != "") {
    con = document.getElementsByClassName("tab-pane active");
    ele = con[0];
    ide = ele.getAttribute('id');

    ttex = document.getElementById("t" + ide).value;
    document.getElementById("p" + ide).innerHTML = tnom;

    if (tnom.endsWith(".cs")) {
      //alert("si termina");
    } else {
      tnom += ".cs";
    }

    var elem = document.getElementById('guardarComo');
    elem.download = tnom;
    elem.href = "data:application/octet-stream," + encodeURIComponent(ttex);
  }
}

//////////////////////////////////// Reportes
function ana() {
  // obtengo el texto
  con = document.getElementsByClassName("tab-pane active");
  ele = con[0];
  ide = ele.getAttribute('id');
  ttex = document.getElementById("t" + ide).value;

  let a = new AnaLex();
  a.analizar(ttex);

}

function repTok() {

}

//////////////////////////////////// otras
function repErr() {
  con = document.getElementsByClassName("tab-pane active");
  ele = con[0];
  ide = ele.getAttribute('id');
  ttex = document.getElementById("t" + ide).value;

  console.log(ttex);
  alert(ttex);
}

function crePes(nom, cont, nps) {
  // titulo etiqueta
  pes = document.getElementById("pes");

  nli = document.createElement('li');
  na = document.createElement('a');
  na.setAttribute("href", "#" + nps);
  na.setAttribute("data-toggle", "tab");
  na.setAttribute("id", "p" + nps);
  na.innerHTML = nom;

  nli.appendChild(na);
  pes.appendChild(nli);

  // contenido etiqueta 
  con = document.getElementById("con");

  ndiv = document.createElement('div');
  ndiv.setAttribute("class", "tab-pane");
  ndiv.setAttribute("id", nps);

  ntex = document.createElement('textarea');
  ntex.setAttribute("id", "t" + nps);
  ntex.setAttribute("name", "texto");
  ntex.setAttribute("rows", "10");
  ntex.setAttribute("class", "input-block-level");
  ntex.setAttribute("type", "email");
  ntex.setAttribute("wrap", "off");
  ntex.innerHTML = cont;

  ndiv.appendChild(ntex);
  con.appendChild(ndiv);

}

