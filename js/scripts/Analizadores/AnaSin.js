class AnaSin {
    ////////////////////////// CONSTRUCTOR
    constructor() {
        this.lisTok = [];
        this.con = document.getElementById("texASin");
        this.con.innerHTML = "////////////////// Analisis Sintactico\n";
        this.con2 = document.getElementById("texTrad");
        this.con2.innerHTML = "////////////////// Traduccion\n";
        this.tab = document.getElementById("tabLin");
        this.indt = 1;

        this.lisTokTra = [];

        this.lisVarTem = [];
        this.ttkt = null;
        this.ttki = null;

        this.tktem = null;
    }

    ////////////////////////// METODOS
    analizar(lisTok) {
        this.lisTok = lisTok;
        this.tab.innerHTML = "";

        if (lisTok.length > 0) {
            this.ind = 0;
            this.estINI();
        }
        this.agrVarVac();

        var ct = "";
        if (this.lisTokTra.length > 0) {
            for (var i = 0; i < this.lisTokTra.length; i++) {
                ct += this.lisTokTra[i] + " ";
            }
            this.con2.innerHTML = ct;
        }

    }

    estINI() {
        var it = this.obtPos();
        if (!this.estDEC(it)) {
            var ver = true;
            if (ver) ver = this.estErr(it);
        }
        if (this.ind < this.lisTok.length) {
            var ver = true;
            if (ver) ver = this.estINI();
        }
    }

    estDEC(it) {
        this.ttkt = this.lisTok[this.ind];
        if (this.estTIP()) {
            var ver = true;
            this.ttki = this.lisTok[this.ind];
            if (ver) ver = this.verTok(tkIde);
            if (ver) ver = this.estFUNVAR(it);
            return ver;
        } else if (this.verTok(tkVoi)) {
            var ver = true;
            if (ver) ver = this.estMAIMET(it);
            return ver;
        } else if (this.verTok(tkCom)) {
            if (ver) this.con2.innerHTML += "\n";
            return true;
        } else if (this.verTok(tkComMul)) {
            if (ver) this.con2.innerHTML += "\n";
            return true;
        }
        return false;
    }

    estMAIMET(it) {
        if (this.estDECMAI(it)) {
            return true;
        } else if (this.estDECMET(it)) {
            return true;
        }
        return false;
    }

    estFUNVAR(it) {
        if (this.estDECVAR(it)) {
            return true;
        }
        else if (this.estDECFUN(it)) {
            return true;
        }
        return false;
    }

    ////////////////////////////////////// 
    // ----------------------- MAIN
    estDECMAI(it) {
        if (this.verTok(tkMai)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.verTok(tkSAbrLla);
            if (ver) ver = this.estINS();
            if (ver) ver = this.verTok(tkSCieLla);
            if (ver) this.traFun(it);
            if (!ver) ver = this.estErr(it);
            return true;
        }
        return false;
    }

    // ----------------------- METODO
    estDECMET(it) {
        if (this.verTok(tkIde)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.estPAR();
            if (ver) ver = this.verTok(tkSAbrLla);
            if (ver) ver = this.estINSMET();
            if (ver) ver = this.verTok(tkSCieLla);
            if (!ver) ver = this.estErr(it);
            return ver;
        }
        return false;
    }

    // ----------------------- FUNCIONES
    estDECFUN(it) {
        if (this.verTok(tkSAbrPar)) {
            var ver = true;
            if (ver) ver = this.estPAR();
            if (ver) ver = this.verTok(tkSAbrLla);
            if (ver) ver = this.estINSFUN();
            if (ver) ver = this.verTok(tkSCieLla);
            if (!ver) ver = this.estErr(it);
            return ver;
        }
        return false;
    }

    ////////////////////////////////////// 
    // ----------------------- VARIABLES	
    estDECVAR(it) {
        if (this.verTok(tkSPunCom)) {
            this.lisVarTem.push([this.ttkt, this.ttki, this.ttkt.fil]);
            this.agrVar();
            this.traVar(it);
            return true;
        } else if (this.verTok(tkSIgu)) {
            var ver = true;
            if (ver) ver = this.estASI(it);
            return ver;
        } else if (this.estODECVAR(it)) {
            return true;
        }
        return false;
    }

    estODECVAR(it) {
        if (this.verTok(tkSCom)) {
            this.lisVarTem.push([this.ttkt, this.ttki, this.ttkt.fil]);
            var ver = true;
            this.ttki = this.ttki = this.lisTok[this.ind];
            if (ver) ver = this.verTok(tkIde);
            if (ver) ver = this.estDECVAR(it);
            return ver;
        }
        return false;
    }

    //////////////////////////////////////
    // ----------------------- ASIGNACIONES
    estASI(it) {
        if (this.estVAL()) {
            var ver = true;
            if (ver) ver = this.estASIP();
            if (ver) ver = this.estASIS(it);
            return ver;
        } else if (this.verTok(tkSAbrPar)) {
            var ver = true;
            if (ver) ver = this.estASIR();
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.estASIP();
            if (ver) ver = this.estASIS(it);
            return ver;
        }
        return false;
    }

    estASIP() {
        if (this.estOPE()) {
            var ver = true;
            if (ver) ver = this.estASIR();
            return ver;
        }
        return true;
    }

    estASIR() {
        if (this.estVAL()) {
            var ver = true;
            if (ver) ver = this.estASIP();
            return ver;
        } else if (this.verTok(tkSAbrPar)) {
            var ver = true;
            if (ver) ver = this.estASIR();
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.estASIP();
            return ver;
        }
        return false;
    }

    estASIS(it) {
        if (this.verTok(tkSPunCom)) {
            if (this.ttkt != null && this.ttki != null) {
                this.lisVarTem.push([this.ttkt, this.ttki, this.ttkt.fil]);
                this.ttkt = null;
                this.ttki = null;
                this.agrVar();
            }
            this.traVar(it);
            return true;
        } else if (this.estODECVAR(it)) {
            return true;
        }
        return false;
    }

    // ----------------------- PARAMETROS
    estPAR() {
        if (this.verTok(tkSCiePar)) {
            return true;
        } else if (this.estTIP()) {
            var ver = true;
            if (ver) ver = this.verTok(tkIde);
            if (ver) ver = this.estOPAR();
            return ver;
        }
        return false;
    }

    estOPAR() {
        if (this.verTok(tkSCiePar)) {
            return true;
        } else if (this.verTok(tkSCom)) {
            var ver = true;
            if (ver) ver = this.estTIP();
            if (ver) ver = this.verTok(tkIde);
            if (ver) ver = this.estOPARP();
            return ver;
        }
        return false;
    }

    estOPARP() {
        if (this.verTok(tkSCiePar)) {
            return true;
        } else if (this.estOPAR()) {
            return true;
        }
        return false;
    }

    // ----------------------- INSTRUCCIONES
    estINS() {
        if (this.estINSPRE()) {
            var ver = true;
            if (ver) ver = this.estINS();
            return ver;
        }
        return true;
    }

    estINSCAS() {
        if (this.estINSPRE()) {
            var ver = true;
            if (ver) ver = this.estINSCAS();
            return ver;
        }
        return true;
    }

    estINSFUN() {
        var it = this.obtPos();
        if (this.estINSPRE()) {
            var ver = true;
            if (ver) ver = this.estINSFUN();
            return ver;
        } else if (this.verTok(tkRet)) {
            var ver = true;
            if (ver) ver = this.estASI();
            if (!ver) { ver = this.estErr(it); ver = true; }
            if (ver) ver = this.estINSFUN();
            return ver;
        }
        return true;
    }

    estINSMET() {
        var it = this.obtPos();
        if (this.estINSPRE()) {
            var ver = true;
            if (ver) ver = this.estINSMET();
            return ver;
        } else if (this.verTok(tkRet)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSPunCom);
            if (!ver) { ver = this.estErr(it); ver = true; }
            if (ver) ver = this.estINSMET();
            return ver;
        }
        return true;
    }

    estINSCIC() {
        var it = this.obtPos();
        if (this.estINSPRE()) {
            var ver = true;
            if (ver) ver = this.estINSCIC();
            return ver;
        } else if (this.verTok(tkBre)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSPunCom);
            if (!ver) { ver = this.estErr(it); ver = true; }
            if (ver) ver = this.estINSCIC();
            return true;
        } else if (this.verTok(tkCont)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSPunCom);
            if (!ver) { ver = this.estErr(it); ver = true; }
            if (ver) ver = this.estINSCIC();
            return ver;
        }
        return true;
    }

    estINSPRE() {
        if (this.estVAR()) {
            return true;
        } else if (this.estREAVAR()) {
            return true;
        } else if (this.estIF()) {
            return true;
        } else if (this.estSWI()) {
            this.con2.innerHTML += "\n";
            return true;
        } else if (this.estFOR()) {
            this.con2.innerHTML += "\n";
            return true;
        } else if (this.estWHI()) {
            this.con2.innerHTML += "\n";
            return true;
        } else if (this.estDO()) {
            this.con2.innerHTML += "\n";
            return true;
        } else if (this.estCON()) {
            this.con2.innerHTML += "\n";
            return true;
        } else if (this.verTok(tkCom)) {
            this.con2.innerHTML += "\n";
            return true;
        } else if (this.verTok(tkComMul)) {
            this.con2.innerHTML += "\n";
            return true;
        }
        return false;
    }

    // ----------------------- VAR
    estVAR() {
        var it = this.obtPos();
        this.ttkt = this.lisTok[this.ind];
        if (this.estTIP()) {
            var ver = true;
            this.ttki = this.lisTok[this.ind];
            if (ver) ver = this.verTok(tkIde);
            if (ver) ver = this.estDECVAR();
            if (ver) this.traVar(it);
            if (!ver) ver = this.estErr(it);
            return true;
        }
        return false;
    }

    estREAVAR() {
        var it = this.obtPos();
        if (this.verTok(tkIde)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSIgu);
            if (ver) ver = this.estASI();
            if (!ver) ver = this.estErr(it);
            return true;
        }
        return false;
    }

    // ----------------------- IF
    estIF() {
        var it = this.obtPos();
        if (this.verTok(tkIf)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.estCOM();
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.verTok(tkSAbrLla);
            if (ver) ver = this.estINS();
            if (ver) ver = this.verTok(tkSCieLla);
            if (ver) ver = this.estELS();
            if (!ver) ver = this.estErr(it);
            return true;
        }
        return false;
    }

    estELS() {
        if (this.verTok(tkEls)) {
            var ver = true;
            if (ver) ver = this.estELSP();
            return ver;
        }
        return true;
    }

    estELSP() {
        if (this.verTok(tkIf)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.estCOM();
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.verTok(tkSAbrLla);
            if (ver) ver = this.estINS();
            if (ver) ver = this.verTok(tkSCieLla);
            if (ver) ver = this.estELS();
            return ver;
        } else if (this.verTok(tkSAbrLla)) {
            var ver = true;
            if (ver) ver = this.estINS();
            if (ver) ver = this.verTok(tkSCieLla);
            return ver;
        }
        return false;
    }

    // ----------------------- SWI
    estSWI() {
        var it = this.obtPos();
        if (this.verTok(tkSwi)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.verTok(tkIde);
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.verTok(tkSAbrLla);
            if (ver) ver = this.estCAS();
            if (ver) ver = this.verTok(tkSCieLla);
            if (!ver) ver = this.estErr(it);
            return ver;
        }
        return false;
    }

    // ----------------------- FOR
    estFOR() {
        var it = this.obtPos();
        if (this.verTok(tkFor)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.estTIP();
            if (ver) ver = this.verTok(tkIde);
            if (ver) ver = this.verTok(tkSIgu);
            if (ver) ver = this.estVAL();
            if (ver) ver = this.verTok(tkSPunCom);
            if (ver) ver = this.verTok(tkIde);
            if (ver) ver = this.estREL();
            if (ver) ver = this.estVAL();
            if (ver) ver = this.verTok(tkSPunCom);
            if (ver) ver = this.verTok(tkIde);
            if (ver) ver = this.estINC();
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.verTok(tkSAbrLla);
            if (ver) ver = this.estINSCIC();
            if (ver) ver = this.verTok(tkSCieLla);
            if (!ver) ver = this.estErr(it);
            return true;
        }
        return false;
    }

    // ----------------------- WHI
    estWHI() {
        var it = this.obtPos();
        if (this.verTok(tkWhi)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.estCOM();
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.verTok(tkSAbrLla);
            if (ver) ver = this.estINSCIC();
            if (ver) ver = this.verTok(tkSCieLla);
            if (!ver) ver = this.estErr(it);
            return true;
        }
        return false;
    }

    // ----------------------- DO
    estDO() {
        var it = this.obtPos();
        if (this.verTok(tkDo)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrLla);
            if (ver) ver = this.estINSCIC();
            if (ver) ver = this.verTok(tkSCieLla);
            if (ver) ver = this.verTok(tkWhi);
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.estCOM();
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.verTok(tkSPunCom);
            if (!ver) ver = this.estErr(it);
            return true;
        }
        return false;
    }

    // ----------------------- CON
    estCON() {
        var it = this.obtPos();
        if (this.verTok(tkCons)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSPun);
            if (ver) ver = this.verTok(tkWri);
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.estCONP(it);
            return ver;
        }
        return false;
    }

    estCONP(it) {
        if (this.estASIR()) {
            var ver = true;
            if (ver) ver = this.verTok(tkSCiePar)
            if (ver) ver = this.verTok(tkSPunCom);
            if (!ver) ver = this.estErr(it);
            return true;
        } else if (this.verTok(tkSCiePar)) {
            ver = true;
            if (ver) ver = this.verTok(tkSPunCom);
            if (!ver) ver = this.estErr(it);
            return true;
        }
        return false;
    }

    // ----------------------- CASO
    estCAS() {
        var it = this.obtPos();
        if (this.verTok(tkCas)) {
            var ver = true;
            if (ver) ver = this.estVAL();
            if (ver) ver = this.verTok(tkSDosPun);
            if (ver) ver = this.estINSCAS();
            if (ver) ver = this.verTok(tkBre);
            if (ver) ver = this.verTok(tkSPunCom);
            if (!ver) { ver = this.estErr(it); ver = true; }
            if (ver) ver = this.estOCAS();
            return ver;
        }
        return false;
    }

    estOCAS() {
        var it = this.obtPos();
        if (this.estCAS()) {
            var ver = true;
            if (ver) ver = this.estOCAS();
            return ver;
        } else if (this.verTok(tkDef)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSDosPun);
            if (ver) ver = this.estINSCAS();
            if (ver) ver = this.verTok(tkBre)
            if (ver) ver = this.verTok(tkSPunCom);
            if (!ver) ver = this.estErr(it);
            return true;
        }
        return true;
    }

    // ----------------------- COMPARACIONES
    estCOM() {
        if (this.estNEG()) {
            var ver = true;
            if (ver) ver = this.estCOMP();
            return ver;
        }
        return false;
    }

    estCOMP() {
        if (this.estVAL()) {
            var ver = true;
            if (ver) ver = this.estOCOM();
            return ver;
        } else if (tkSAdm) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.estCOM();
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.estOCOM();
            return ver;
        }
        return false;
    }

    estOCOM() {
        if (this.estREL()) {
            var ver = true;
            if (ver) ver = this.estCOM();
            return ver;
        } else if (this.estLOG()) {
            var ver = true;
            if (ver) ver = this.estOCOM();
            return ver;
        }
        return true;
    }

    //////////////////////////////////////
    // ----------------------- TERMINALES
    estOPE() {
        if (this.verTok(tkSMas)) {
            return true;
        } else if (this.verTok(tkSGui)) {
            return true;
        } else if (this.verTok(tkSAst)) {
            return true;
        } else if (this.verTok(tkSBarInc)) {
            return true;
        }
        return false;
    }

    estVAL() {
        if (this.verTok(tkNum)) {
            return true;
        } else if (this.verTok(tkCar)) {
            return true;
        } else if (this.verTok(tkCad)) {
            return true;
        } else if (this.verTok(tkTru)) {
            return true;
        } else if (this.verTok(tkFal)) {
            return true;
        } else if (this.verTok(tkCadHtm)) {
            return true;
        } else if (this.verTok(tkIde)) {
            return true;
        } else if (this.verTok(tkSGui)) {
            var ver = true;
            if (ver) ver = this.estVALSIG();
            return ver;
        } else if (this.verTok(tkSMas)) {
            var ver = true;
            if (ver) ver = this.estVALSIG();
            return ver;
        }
        return false;
    }

    estVALSIG() {
        if (this.verTok(tkNum)) {
            return true;
        } else if (this.verTok(tkDec)) {
            return true;
        } else if (this.verTok(tkIde)) {
            return true;
        }
        return false;
    }

    estTIP() {
        if (this.verTok(tkPInt)) {
            return true;
        } else if (this.verTok(tkPDou)) {
            return true;
        } else if (this.verTok(tkPCha)) {
            return true;
        } else if (this.verTok(tkPStr)) {
            return true;
        } else if (this.verTok(tkPBoo)) {
            return true;
        }
        return false;
    }

    estREL() {
        if (this.verTok(tkSIgu)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSIgu);
            return ver;
        } else if (this.verTok(tkSMay)) {
            var ver = true;
            if (ver) ver = this.estIGU();
            return ver;
        } else if (this.verTok(tkSMen)) {
            var ver = true;
            if (ver) ver = this.estIGU();
            return ver;
        } else if (this.verTok(tkSAdm)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSIgu);
            return ver;
        }
        return false;
    }

    estIGU() {
        if (this.verTok(tkSIgu))
            return true;
        return true;
    }

    estNEG() {
        if (this.verTok(tkSAdm))
            return true;
        return true;;
    }

    estLOG() {
        if (this.verTok(tkSAmp)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAmp);
            return ver;
        } else if (this.verTok(tkSBarVer)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSBarVer);
            return ver;
        }
        return false;
    }

    estINC() {
        if (this.verTok(tkSMas)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSMas);
            return ver;
        } else if (this.verTok(tkSMen)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSMen);
            return ver;
        }
        return false;
    }

    // VALIDACIONES
    verTok(tok) {
        if (this.ind < this.lisTok.length) {
            var tem = this.lisTok[this.ind];
            if (tok == tem.tok) {
                //this.con2.innerHTML += tem.lex + " ";
                this.lisTokTra.push(tem.lex);
                this.ind++;
                return true;
            }
        }
        return false;
    }

    estErr() {
        if (this.ind < this.lisTok.length) {
            var tem = this.lisTok[this.ind];
            this.con.innerHTML += "ERROR SINTACTICO " + tem.lex + " fil: " + tem.fil + " col: " + tem.col + "\n";

        } else {
            this.con.innerHTML += "ERROR SINTACTICO falta elemento de cierre\n";
        }

        while (this.ind < this.lisTok.length) {
            var tem = this.lisTok[this.ind];
            if (tem.tok == tkSPunCom | tem.tok == tkSCieLla | tem.tok == tkEps) {
                this.con.innerHTML += "se recupero " + tem.lex + " fil: " + tem.fil + " col: " + tem.col + "\n";
                this.ind++;
                break;
            }
            this.ind++;
        }

    }

    estErr(ie) {
        if (this.ind < this.lisTok.length) {
            var tem = this.lisTok[this.ind];
            var ia = this.obtPos();
            console.log(ie + " " + ia);
            console.log(this.lisTokTra);
            console.log(this.lisTokTra.splice(ie, ia));
            this.con.innerHTML += "ERROR SINTACTICO " + tem.lex + " fil: " + tem.fil + " col: " + tem.col + "\n";

        } else {
            this.con.innerHTML += "ERROR SINTACTICO falta elemento de cierre\n";
        }

        while (this.ind < this.lisTok.length) {
            var tem = this.lisTok[this.ind];
            if (tem.tok == tkSPunCom | tem.tok == tkSCieLla | tem.tok == tkEps) {
                this.con.innerHTML += "se recupero " + tem.lex + " fil: " + tem.fil + " col: " + tem.col + "\n";
                this.ind++;
                break;
            }
            this.ind++;
        }
        return true;

    }

    eliErr(it, ft) {
        this.lisTokTra.slice(it, ft);
    }


    // agrega las variables 
    agrVar() {
        for (var i = 0; i < this.lisVarTem.length; i++) {
            ele = this.lisVarTem[i];
            this.creVar(ele[0], ele[1], ele[2]);
        }
        this.lisVarTem = [];
    }

    creVar(ttip, tnom, tlin) {
        var ttr = document.createElement('tr');
        var tth = document.createElement('th');
        var ttdt = document.createElement('td');
        var ttdn = document.createElement('td');
        var ttdl = document.createElement('td');

        tth.scope = "row";
        tth.innerHTML = this.indt++;

        ttdt.innerHTML = ttip.lex;
        ttdn.innerHTML = tnom.lex;
        ttdl.innerHTML = tlin;

        ttr.appendChild(tth);
        ttr.appendChild(ttdt);
        ttr.appendChild(ttdn);
        ttr.appendChild(ttdl);

        this.tab.appendChild(ttr);
    }

    agrVarVac() {
        for (var i = 0; i < 6; i++) {
            this.creVarVac("&nbsp;", "&nbsp;", "&nbsp;");
        }
    }

    creVarVac(ttip, tnom, tlin) {
        var ttr = document.createElement('tr');
        var tth = document.createElement('th');
        var ttdt = document.createElement('td');
        var ttdn = document.createElement('td');
        var ttdl = document.createElement('td');

        tth.scope = "row";
        tth.innerHTML = "&nbsp;";

        ttdt.innerHTML = ttip;
        ttdn.innerHTML = tnom;
        ttdl.innerHTML = tlin;

        ttr.appendChild(tth);
        ttr.appendChild(ttdt);
        ttr.appendChild(ttdn);
        ttr.appendChild(ttdl);

        this.tab.appendChild(ttr);
    }

    obtPos() {
        return this.lisTokTra.length;
    }

    ///////////////// traducciones
    traVar(ie) {
        var ia = this.obtPos();
        this.lisTokTra[ie] = "var";
        this.lisTokTra[ia - 1] = "\n";
        var ct = "";
        for (var i = ie; i < ia - 1; i++) {
            ct += this.lisTokTra[i] + " ";
            this.lisTokTra[i] = "";
        }
        this.lisTokTra.slice(ie + 1, ia);
        this.lisTokTra[ie] = ct;
    }

    traFun(ie) {
        var ia = this.obtPos();
        this.lisTokTra[ie] = "def";
        this.lisTokTra[ie + 4] = ":\n";
        this.lisTokTra[ia - 1] = "if __name__ = “__main__”:\n        main()\n";

        for (var i = ie + 4; i < ia - 1; i++) {
            this.lisTokTra[i] = "\t" + this.lisTokTra[i];
        }
    }
}