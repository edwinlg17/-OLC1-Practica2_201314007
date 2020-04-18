class AnaSin {
    ////////////////////////// CONSTRUCTOR
    constructor() {
        this.lisTok = [];
        this.cod = "";
        this.con = document.getElementById("texASin");
        this.con.innerHTML = "////////////////// Analisis Sintactico\n";
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
        if (!this.estDEC()) this.estErr();
        if (this.ind < this.lisTok.length) this.estINI();
    }

    estDEC() {
        this.cod = "";
        if (this.estTIP()) {
            var ver = true;
            if (ver) ver = this.verTok(tkIde);
            if (ver) ver = this.estFUNVAR();
            if (ver) this.con.innerHTML += this.cod + "\n"; // esto es para mostra en consola
            return ver;
        } else if (this.verTok(tkVoi)) {
            var ver = true;
            if (ver) ver = this.estMAIMET();
            if (ver) this.con.innerHTML += this.cod + "\n";// esto es para mostra en consola
            return ver;
        } else if (this.verTok(tkCom)) {
            this.con.innerHTML += this.cod + "\n";// esto es para mostra en consola
            return true;
        } else if (this.verTok(tkComMul)) {
            this.con.innerHTML += this.cod + "\n";// esto es para mostra en consola
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
            if (ver) ver = this.estINS();
            if (ver) ver = this.verTok(tkSCieLla);
            return ver;
        }
        return false;
    }

    // ----------------------- METODO
    estDECMET() {
        if (this.verTok(tkIde)) {
            var ver = true;
            if (ver) ver = this.estDECFUN();
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
            if (ver) ver = this.estINS();
            if (ver) ver = this.verTok(tkSCieLla);
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
            return ver;
        } else if (this.verTok(tkSAbrPar)) {
            var ver = true;
            if (ver) ver = this.estASI();
            return ver;
        }
        return false;
    }

    estASIP() {
        if (this.estOPE()) {
            var ver = true;
            if (ver) ver = this.estASI();
            return ver;
        } else if (this.verTok(tkSPunCom)) {
            return true;
        } else if (this.verTok(tkSCiePar)) {
            var ver = true;
            if (ver) ver = this.estASIP();
            return ver;
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

    // VALIDACIONES
    verTok(tok) {
        if (this.ind < this.lisTok.length) {
            var tem = this.lisTok[this.ind];
            if (tok == tem.tok) {
                console.log(tem.lex);
                this.cod += tem.lex + " ";
                this.ind++;
                return true;
            }
        }
        return false;
    }

    estErr() {
        if (this.ind < this.lisTok.length) {
            var tem = this.lisTok[this.ind++];
            console.log("ERROR SINTACTICO " + tem.lex);
            this.con.innerHTML += "ERROR SINTACTICO " + tem.lex + "\n";
        } else {
            console.log("ERROR SINTACTICO falta elemento de cierre");
            this.con.innerHTML += "ERROR SINTACTICO falta elemento de cierre\n";
        }

        while (this.ind < this.lisTok.length) {
            var tem = this.lisTok[this.ind++];
            if (tem.tok == tkSPunCom | tem.tok == tkSCieLla | tem.tok == tkEps) {
                break;
            }
        }
    }

}