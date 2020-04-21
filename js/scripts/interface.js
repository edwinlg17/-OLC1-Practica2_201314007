
const tkPInt = "tkPInt", tkPDou = "tkPDou", tkPCha = "tkPCha", tkPBoo = "tkPBoo", tkPStr = "tkPStr";
const tkTru = "tkTru", tkFal = "tkFal", tkVoi = "tkVoi", tkMai = "tkMai", tkRet = "tkRet", tkBre = "tkBre", tkCont = "tkCont", tkIf = "tkIf", tkEls = "tkEls", tkSwi = "tkSwi", tkCas = "tkCas", tkDef = "tkDef", tkFor = "tkFor", tkDo = "tkDo", tkWhi = "tkWhi", tkCons = "tkCons", tkWri = "tkWri";
const tkSPun = "tkSPun", tkSCom = "tkSCom", tkSDosPun = "tkSDosPun", tkSPunCom = "tkSPunCom", tkSAbrLla = "tkSAbrLla", tkSCieLla = "tkSCieLla", tkSAbrPar = "tkSAbrPar", tkSCiePar = "tkSCiePar", tkSAbrCor = "tkSAbrCor", tkSCieCor = "tkSCieCor", tkSIgu = "tkSIgu", tkSMen = "tkSMen", tkSMay = "tkSMay", tkSAdm = "tkSAdm", tkSMas = "tkSMas", tkSGui = "tkSGui", tkSAst = "tkSAst", tkSAmp = "tkSAmp", tkSBarVer = "tkSBarVer", tkSBarInv = "tkSBarInv", tkSComSim = "tkSComSim", tkSComDob = "tkSComDob", tkSSal = "tkSSal", tkSTab = "tkSTab", tkSRet = "tkSRet", TkSDes = "TkSDes", tkSBarInc = "tkSBarInc";
const tkNum = "tkNum", tkCad = "tkCad", tkCar = "tkCar", tkCadHtm = "tkCadHtm", tkDec = "tkDec", tkCom = "tkCom", tkComMul = "tkComMul", tkIde = "tkIde", tkEps = "tkEps";;


const tipIde = "IDE", tipNum = "NUM", tipCad = "CAD", tipCar = "CAR", tipCadHtm = "CADHTM", tipSim = "SIM", tipCom = "COM", tipComMul = "COMMUL", tipDec = "DEC", tipEps = "EPS";

np = 0;

var errLex = [];
var errSin = [];

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

  let al = new AnaLex();
  al.analizar(ttex);
  errLex = al.obtErrLex();
  let as = new AnaSin();
  as.analizar(al.lisTok);
  errSin = as.obtErrSin();

}

function repTra() {
  ttextra = document.getElementById("texTrad").value;

  var elem = document.getElementById('genTra');
  elem.download = "traduccion.py";
  elem.href = "data:application/octet-stream," + encodeURIComponent(ttextra);
}

function repTok() {


}


//////////////////////////////////// otras
function repErr() {
  var cad = "<html>\n";
  cad += "\t<head>\n";
  cad += "\t\t<title>Lista de errores</title>\n";

  cad += "\t\t<style>\n";
  cad += "table{border-collapse:collapse;}  th,tr,td{    border:1px solid #000;    width:150px;    height:45px;    vertical-align:middle;    text-align:center;  }  th{    color:#fff;    background-color: #252525;  }    tr:nth-child(odd) td{    background-color:#eee;  }\n";

  cad += "\t\t</style>\n";

  cad += "\t</head>\n";
  cad += "\t<body>\n";
  cad += "\t\t<table BORDER class=\"table table-bordered table-striped mb-0\">\n";

  cad += "\t\t\t<thead id=tabTit>\n";
  cad += "\t\t\t\t<th scope=\"col\">Descripcion</th>\n";
  cad += "\t\t\t\t<th scope=\"col\">Lexema</th>\n";
  cad += "\t\t\t\t<th scope=\"col\">Fila</th>\n";
  cad += "\t\t\t\t<th scope=\"col\">Columna</th>\n";
  cad += "\t\t\t</thead>\n";

  cad += "\t\t\t<tbody id=tabLin>\n";
  for (var i = 0; i < errLex.length; i++) {
    var tt = errLex[i];
    cad += "\t\t\t<tr>";
    cad += "\t\t\t\t<td>Error Lexico</td>\n";
    cad += "\t\t\t\t<td>" + tt.lex + "</td>\n";
    cad += "\t\t\t\t<td>" + tt.fil + "</td>\n";
    cad += "\t\t\t\t<td>" + tt.col + "</td>\n";
    cad += "\t\t\t</tr>\n";
  }

  for (var i = 0; i < errSin.length; i++) {
    var tt = errSin[i];
    cad += "\t\t\t<tr>";
    cad += "\t\t\t\t<td>" + tt[0] + "</td>\n";
    cad += "\t\t\t\t<td>" + tt[1] + "</td>\n";
    cad += "\t\t\t\t<td>" + tt[2] + "</td>\n";
    cad += "\t\t\t\t<td>" + tt[3] + "</td>\n";
    cad += "\t\t\t</tr>\n";
  }
  cad += "\t\t\t</tbody>\n";

  cad += "\t\t</table>\n";
  cad += "\t</body>\n";
  cad += "</html>\n";


  var elem = document.getElementById('genErr');
  elem.download = "errores.html";
  elem.href = "data:application/octet-stream," + encodeURIComponent(cad);
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

