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
  input.accept = 'text/.er'; // extencion a permitir

  input.onchange = e => {

    var file = e.target.files[0];

    console.log(file);

    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = readerEvent => {
      var contenido = readerEvent.target.result;

      np++;
      crePes(file.name.replace(".txt", ""), contenido, np);
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

  if (tnom.endsWith(".txt")) {
    alert("si termina");
  } else {
    tnom += ".txt";
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

    if (tnom.endsWith(".txt")) {
      alert("si termina");
    } else {
      tnom += ".txt";
    }

    var elem = document.getElementById('guardarComo');
    elem.download = tnom;
    elem.href = "data:application/octet-stream," + encodeURIComponent(ttex);
  }
}

//////////////////////////////////// Reportes
function repErr() {
  let t = new Token("0", "tk_ide", "var1", "5", "5");
  let a = new AnaLex();
  a.analizar();
}

function repTok() {

}

//////////////////////////////////// otras
function leer() {
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
  ntex.setAttribute("name", "message");
  ntex.setAttribute("rows", "10");
  ntex.setAttribute("class", "input-block-level");
  ntex.innerHTML = cont;

  ndiv.appendChild(ntex);
  con.appendChild(ndiv);

}

