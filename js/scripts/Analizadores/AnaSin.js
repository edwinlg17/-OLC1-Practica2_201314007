class AnaSin {
    ////////////////////////// CONSTRUCTOR
    constructor() {
        this.lisTok = [];
        this.con = document.getElementById("texASin");
        this.con.innerHTML = "////////////////// Analisis Sintactico\n";
        this.con2 = document.getElementById("texTrad");
        this.con2.innerHTML = "////////////////// Traduccion\n";
    }

    ////////////////////////// METODOS
    analizar(lisTok) {
        this.lisTok = lisTok;

        if (lisTok.length > 0) {
            this.ind = 0;
            this.estINI();
        }
    }

    estINI() {
        var it = this.ind;
        if (!this.estDEC()) this.estErr();
        if (this.ind < this.lisTok.length) this.estINI();
    }

    estDEC() {
        if (this.estTIP()) {
            var ver = true;
            if (ver) ver = this.verTok(tkIde);
            if (ver) ver = this.estFUNVAR();
            if (ver) this.con2.innerHTML += "\n";
            return ver;
        } else if (this.verTok(tkVoi)) {
            var ver = true;
            if (ver) ver = this.estMAIMET();
            if (ver) this.con2.innerHTML += "\n";
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

    estMAIMET() {
        if (this.estDECMAI()) {
            return true;
        } else if (this.estDECMET()) {
            return true;
        }
        return false;
    }

    estFUNVAR() {
        if (this.estDECVAR()) return true;
        else if (this.estDECFUN()) return true;
        return false;
    }

    ////////////////////////////////////// 
    // ----------------------- MAIN
    estDECMAI() {
        if (this.verTok(tkMai)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.verTok(tkSAbrLla);
            this.con2.innerHTML += "\n";
            if (ver) ver = this.estINS();
            return ver;
        }
        return false;
    }

    // ----------------------- METODO
    estDECMET() {
        if (this.verTok(tkIde)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.estPAR();
            if (ver) ver = this.verTok(tkSAbrLla);
            this.con2.innerHTML += "\n";
            if (ver) ver = this.estINSMET();
            return ver;
        }
        return false;
    }

    // ----------------------- FUNCIONES
    estDECFUN() {
        if (this.verTok(tkSAbrPar)) {
            var ver = true;
            if (ver) ver = this.estPAR();
            if (ver) ver = this.verTok(tkSAbrLla);
            this.con2.innerHTML += "\n";
            if (ver) ver = this.estINSFUN();
            return ver;
        }
        return false;
    }

    ////////////////////////////////////// 
    // ----------------------- VARIABLES	
    estDECVAR() {
        if (this.verTok(tkSPunCom)) {
            return true;
        } else if (this.verTok(tkSIgu)) {
            if (this.estASI())
                return true;
        } else if (this.estODECVAR()) {
            return true;
        }
        return false;
    }

    estODECVAR() {
        if (this.verTok(tkSCom)) {
            if (this.verTok(tkIde)) {
                if (this.estDECVAR())
                    return true;
            }
        }
        return false;
    }

    //////////////////////////////////////
    // ----------------------- ASIGNACIONES
    estASI() {
        if (this.estVAL()) {
            var ver = true;
            if (ver) ver = this.estASIP();
            if (ver) ver = this.estASIS();
            return ver;
        } else if (this.verTok(tkSAbrPar)) {
            var ver = true;
            if (ver) ver = this.estASIR();
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.estASIP();
            if (ver) ver = this.estASIS();
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

    estASIS() {
        if (this.verTok(tkSPunCom)) {
            return true;
        } else if (this.estODECVAR()) {
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
        } else if (this.verTok(tkSCieLla)) {
            return true;
        }
        return false;
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
        if (this.estINSPRE()) {
            var ver = true;
            if (ver) ver = this.estINSFUN();
            return ver;
        } else if (this.verTok(tkRet)) {
            var ver = true;
            if (ver) ver = this.estASI();
            if (!ver) { this.estErr(); ver = true; }
            if (ver) ver = this.estINSFUN();
            return true;
        } else if (this.verTok(tkSCieLla)) {
            return true;
        }
        return false;
    }

    estINSMET() {
        if (this.estINSPRE()) {
            var ver = true;
            if (ver) ver = this.estINSMET();
            return ver;
        } else if (this.verTok(tkRet)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSPunCom);
            if (!ver) { this.estErr(); ver = true; }
            if (ver) ver = this.estINSMET();
            return ver;
        } else if (this.verTok(tkSCieLla)) {
            return true;
        }
        return false;
    }

    estINSCIC() {
        if (this.estINSPRE()) {
            var ver = true;
            if (ver) ver = this.estINSCIC();
            return ver;
        } else if (this.verTok(tkBre)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSPunCom);
            if (!ver) { this.estErr(); ver = true; }
            if (ver) ver = this.estINSCIC();
            return true;
        } else if (this.verTok(tkCont)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSPunCom);
            if (!ver) { this.estErr(); ver = true; }
            if (ver) ver = this.estINSCIC();
            return true;
        } else if (this.verTok(tkSCieLla)) {
            return true;
        }
        return false;
    }

    estINSPRE() {
        if (this.estVAR()) {
            this.con2.innerHTML += "\n";
            return true;
        } else if (this.estIF()) {
            this.con2.innerHTML += "\n";
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
        var it = this.ind;
        if (this.estTIP()) {
            var ver = true;
            if (ver) ver = this.verTok(tkIde);
            if (ver) ver = this.estDECVAR();
            if (!ver) this.estErr();
            return true;
        }
        return false;
    }

    // ----------------------- IF
    estIF() {
        if (this.verTok(tkIf)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.estCOM();
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.verTok(tkSAbrLla);
            if (ver) this.con2.innerHTML += "\n";
            if (ver) ver = this.estINS();
            if (!ver) { this.estErr(); ver = true; }
            if (ver) ver = this.estELS();
            return ver;
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
            if (ver) this.con2.innerHTML += "\n";
            if (ver) ver = this.estINS();
            if (!ver) { this.estErr(); ver = true; }
            if (ver) ver = this.estELS();
            return ver;
        } else if (this.verTok(tkSAbrLla)) {
            var ver = true;
            if (ver) this.con2.innerHTML += "\n";
            if (ver) ver = this.estINS();
            if (!ver) { this.estErr(); ver = true; }
            return ver;
        }
        return false;
    }

    // ----------------------- SWI
    estSWI() {
        if (this.verTok(tkSwi)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.verTok(tkIde);
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.verTok(tkSAbrLla);
            if (ver) this.con2.innerHTML += "\n";
            if (ver) ver = this.estCAS();
            if (ver) ver = this.verTok(tkSCieLla);
            if (!ver) this.estErr();
            return ver;
        }
        return false;
    }

    // ----------------------- FOR
    estFOR() {
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
            if (ver) this.con2.innerHTML += "\n";
            if (ver) ver = this.estINSCIC();
            if (!ver) this.estErr();
            return true;
        }
        return false;
    }

    // ----------------------- WHI
    estWHI() {
        if (this.verTok(tkWhi)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.estCOM();
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.verTok(tkSAbrLla);
            if (ver) this.con2.innerHTML += "\n";
            if (ver) ver = this.estINSCIC();
            if (!ver) this.estErr();
            return true;
        }
        return false;
    }

    // ----------------------- DO
    estDO() {
        if (this.verTok(tkDo)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSAbrLla);
            if (ver) this.con2.innerHTML += "\n";
            if (ver) ver = this.estINSCIC();
            if (ver) ver = this.verTok(tkWhi);
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.estCOM();
            if (ver) ver = this.verTok(tkSCiePar);
            if (ver) ver = this.verTok(tkSPunCom);
            if (!ver) this.estErr();
            return true;
        }
        return false;
    }

    // ----------------------- CON
    estCON() {
        if (this.verTok(tkCons)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSPun);
            if (ver) ver = this.verTok(tkWri);
            if (ver) ver = this.verTok(tkSAbrPar);
            if (ver) ver = this.estCONP();
            if (!ver) this.estErr();
            return true;
        }
        return false;
    }

    estCONP() {
        if (this.estASIR()) {
            var ver = true;
            if (ver) ver = this.verTok(tkSCiePar)
            if (ver) ver = this.verTok(tkSPunCom);
            return ver;
        } else if (this.verTok(tkSCiePar)) {
            ver = true;
            if (ver) ver = this.verTok(tkSPunCom);
            return ver;
        }
        return false;
    }

    // ----------------------- CASO
    estCAS() {
        if (this.verTok(tkCas)) {
            var ver = true;
            if (ver) ver = this.estVAL();
            if (ver) ver = this.verTok(tkSDosPun);
            if (ver) this.con2.innerHTML += "\n";
            if (ver) ver = this.estINSCAS();
            if (ver) ver = this.verTok(tkBre);
            if (ver) ver = this.verTok(tkSPunCom);
            if (ver) this.con2.innerHTML += "\n";
            if (!ver) { this.estErr(); ver = true; }
            if (ver) ver = this.estOCAS();
            return ver;
        }
        return false;
    }

    estOCAS() {
        if (this.estCAS()) {
            var ver = true;
            if (ver) ver = this.estOCAS();
            return ver;
        } else if (this.verTok(tkDef)) {
            var ver = true;
            if (ver) ver = this.verTok(tkSDosPun);
            if (ver) this.con2.innerHTML += "\n";
            if (ver) ver = this.estINSCAS();
            if (ver) ver = this.verTok(tkBre)
            if (ver) ver = this.verTok(tkSPunCom);
            if (ver) this.con2.innerHTML += "\n";
            if (!ver) { this.estErr(); ver = true; }
            return ver;
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
                this.con2.innerHTML += tem.lex + " ";
                this.ind++;
                return true;
            }
        }
        return false;
    }

    estErr() {
        if (this.ind < this.lisTok.length) {
            var tem = this.lisTok[this.ind++];
            this.con.innerHTML += "ERROR SINTACTICO " + tem.lex + " fil: " + tem.fil + " col: " + tem.col + "\n";

        } else {
            this.con.innerHTML += "ERROR SINTACTICO falta elemento de cierre\n";
        }

        while (this.ind < this.lisTok.length) {
            var tem = this.lisTok[this.ind++];
            if (tem.tok == tkSPunCom | tem.tok == tkSCieLla | tem.tok == tkEps) {
                this.con.innerHTML += "se recupero " + tem.lex + " fil: " + tem.fil + " col: " + tem.col + "\n";
                break;
            }
        }

    }

    estErr(it) {
        if (this.ind < this.lisTok.length) {
            var tem = this.lisTok[this.ind++];
            this.con.innerHTML += "ERROR SINTACTICO " + tem.lex + " fil: " + tem.fil + " col: " + tem.col + "\n";

        } else {
            this.con.innerHTML += "ERROR SINTACTICO falta elemento de cierre\n";
        }

        while (this.ind < this.lisTok.length) {
            var tem = this.lisTok[this.ind++];
            if (tem.tok == tkSPunCom | tem.tok == tkSCieLla | tem.tok == tkEps) {
                this.con.innerHTML += "se recupero " + tem.lex + " fil: " + tem.fil + " col: " + tem.col + "\n";
                break;
            }
        }

    }

}