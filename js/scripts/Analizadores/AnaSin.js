class AnaSin {
    ////////////////////////// CONSTRUCTOR
    constructor() {
        this.lisTok = [];
        this.cod = "";
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
        if (this.estDEC()) {
            this.estINI();
        } else if (this.verTok(tkEps)) {
            alert("fin del Analis")
        } else {
            if (this.ind < this.lisTok.length) {
                console.log("ERROR SINTACTICO " + this.lisTok[this.ind++].lex);
                this.estINI();
            }
        }
    }

    estDEC() {
        this.cod = "";
        if (this.estTIP()) {
            var ver = true;
            if (ver) ver = this.verTok(tkIde);
            if (ver) ver = this.estFUNVAR();
            if (ver) console.log(this.cod + "\n")
            return ver;
        } else if (this.verTok(tkVoi)) {
            return true;
        } else if (this.verTok(tkCom)) {
            console.log(this.cod + "\n")
            return true;
        } else if (this.verTok(tkComMul)) {
            console.log(this.cod + "\n")
            return true;
        }
        return false;
    }

    estFUNVAR() {
        if (this.estDECVAR()) return true;
        else if (this.estDECFUN()) return true;
        return false;
    }

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

    estDECFUN() {
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

    verTok(tok) {
        if (this.ind < this.lisTok.length) {
            var tem = this.lisTok[this.ind];
            if (tok == tem.tok) {
                //console.log(tem.lex);
                this.cod += tem.lex + " ";
                this.ind++;
                return true;
            }
        }
        return false;
    }

}