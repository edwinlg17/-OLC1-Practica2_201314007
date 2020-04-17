class AnaLex {

    ////////////////////////// CONSTRUCTOR
    constructor() {
        this.lisTok = [];
        this.lisErr = [];
    }

    ///////////////////////// METODOS
    analizar(tex) {
        tex += "\n  ";
        this.lisTok = [];
        this.lisErr = [];

        var ind = 0, est = 0;
        var lex = "";
        var car = ' ';

        var fil = 1, col = 1, ft = 0, ct = 0, it = 0;;

        while (ind < tex.length) {
            car = tex[ind];

            switch (est) {
                // estado 0
                case 0:
                    lex = "";
                    ft = fil;
                    ct = col;
                    it = ind;

                    if (this.verLet(car) | car == '_') {
                        est = 1;
                        lex += car;
                    } else if (this.verNum(car)) {
                        est = 2;
                        lex += car;
                    } else if (car == '"') {
                        est = 3;
                        lex += car;
                    } else if (car == '\'') {
                        est = 4;
                        lex += car;
                    } else if (car == '/') {
                        est = 5;
                        lex += car;
                    } else if (this.verSim(car)) {
                        est = 6;
                        lex += car;
                    } else if (car == '\n') {
                        // caracteres omitibles
                        col = 0;
                        fil++;
                    } else if (car == '\t' | car == '\r' || car == ' ') {
                        // caracteres omitibles
                    } else {
                        this.agrErr("tkErr", car, ft, ct, "ERR");
                    }

                    col++;
                    ind++;
                    break;

                // estado 1
                case 1:
                    if (this.verLet(car) | this.verNum(car) | car == '_') {
                        lex += car;
                        ind++;
                        col++;
                    } else {
                        est = 0;
                        this.agrTok(this.verTPalRes(lex), lex, ft, ct, "IDE");
                    }
                    break;

                // estado 2
                case 2:
                    if (this.verNum(car)) {
                        lex += car;
                        ind++;
                        col++;
                    } else if (car == '.') {
                        est = 7;
                        lex += car;
                        ind++;
                        col++;
                    } else {
                        est = 0;
                        this.agrTok("tkNum", lex, ft, ct, "NUM");
                    }
                    break;

                // estado 3
                case 3:
                    if (car == '"') {
                        est = 0;
                        lex += car;
                        this.agrTok("tkCad", lex, ft, ct, "CAD");
                    } else if (car == '\\') {
                        est = 8;
                        //lex += car;´
                    } else if (car == '\n') {
                        est = 0;
                        col = ct;
                        fil = ft;
                        ind = it;
                    } else {
                        lex += car;
                    }
                    col++;
                    ind++;
                    break;

                // estado 4
                case 4:
                    if (car == '\'') {
                        est = 0;
                        lex += car;
                        if (lex.length >= 1 & lex.length <= 2) {
                            this.agrTok("tkCar", lex, ft, ct, "CAR");
                        } else {
                            this.agrTok("tkCadHtm", lex, ft, ct, "CADHTM");
                        }
                    } else if (car == '\\') {
                        est = 9;
                        //lex += car;
                    } else if (car == '\n') {
                        est = 0;
                        col = ct;
                        fil = ft;
                        ind = it;
                    } else {
                        lex += car;
                    }
                    ind++;
                    col++;
                    break;

                // estado 5
                case 5:
                    if (car == '/') {
                        est = 10;
                        lex += car;
                        ind++;
                        col++;
                    } else if (car == '*') {
                        est = 11;
                        lex += car;
                        ind++
                        col++;
                    } else {
                        est = 0;
                        this.agrTok("tkSBarInc", lex, ft, ct, "SIM");
                    }
                    break;

                // estado 6
                case 6:
                    est = 0;
                    this.agrTok(this.verTSim(lex), lex, ft, ct, "SIM");
                    break;

                // estado 7
                case 7:
                    if (this.verNum(car)) {
                        est = 12;
                        lex += car;
                        ind++;
                        col++;
                    } else {
                        est = 0;
                    }
                    break;

                // estado 8
                case 8:
                    est = 3;
                    if (this.verSimEsp(car)) {
                        lex += "\\" + car;
                    } else {
                        this.agrErr("tkErr", '\\', ft, ct, "ERR");
                        lex += car;
                    }
                    ind++;
                    col++;
                    break;

                // estado 9
                case 9:
                    est = 4;
                    if (this.verSimEsp(car)) {
                        lex += "\\" + car;
                    } else {
                        this.agrErr("tkErr", '\\', ft, ct, "ERR");
                        lex += car;
                    }
                    ind++;
                    col++;
                    break;

                // estado 10
                case 10:
                    if (car != '\n') {
                        lex += car;
                        col++;
                        ind++;
                    } else {
                        est = 0;
                        this.agrTok("tkCom", lex, ft, ct, "COM");
                    }
                    break;

                // estado 11
                case 11:
                    if (car != '*') {
                        if (car != '\n') {
                            lex += car;
                            col++;
                        } else {
                            col = 1;
                            fil++;
                        }
                    } else {
                        est = 13;
                        lex += car;
                        col++;
                    }
                    ind++;
                    break;

                // estado 12
                case 12:
                    if (this.verNum(car)) {
                        lex += car;
                        ind++;
                        col++;
                    } else {
                        est = 0;
                        this.agrTok("tkDec", lex, ft, ct, "DEC");
                    }
                    break;

                // estado 13
                case 13:
                    if (car == '/') {
                        est = 0;
                        lex += car;
                        col++;
                        this.agrTok("tkComMul", lex, ft, ct, "COMMUL");
                    } else {
                        est = 11;
                        lex += car;
                        col++;
                    }
                    ind++;
                    break;
            }
        }

        con = document.getElementById("texSal");

        con.innerHTML = "//////////////////\n";
        con.innerHTML += "Tokens:\n";

        var tk;
        for (var i = 0; i < this.lisTok.length; i++) {
            tk = this.lisTok[i];
            con.innerHTML += tk.tok + " - " + tk.lex + " - " + tk.fil + " - " + tk.col + " - " + tk.tip + "\n";
        }

        con.innerHTML += "Errores:\n";
        for (var i = 0; i < this.lisErr.length; i++) {
            tk = this.lisErr[i];
            con.innerHTML += tk.tok + " - " + tk.lex + " - " + tk.fil + " - " + tk.col + " - " + tk.tip + "\n";
        }

    }

    // agrega tokens 
    agrTok(tok, lex, fil, col, des) {
        let tk = new Token(tok, lex, fil, col, des);
        this.lisTok.push(tk);
    }

    // agrega erroes
    agrErr(tok, lex, fil, col, des) {
        let tk = new Token(tok, lex, fil, col, des);
        this.lisErr.push(tk);
    }

    // funciones de verificacion
    verLet(c) {
        if (c >= 'a' & c <= 'z')
            return true;
        if (c >= 'A' & c <= 'Z')
            return true;
        if (c == 'ñ' | c == 'Ñ')
            return true;
        return false;
    }

    verNum(c) {
        if (c >= '0' && c <= '9')
            return true;
        return false;
    }

    verSim(c) {
        switch (c) {
            // sintaxis
            case '.':
                return true;
                break;
            case ',':
                return true;
                break;
            case ':':
                return true;
                break;
            case ';':
                return true;
                break;
            case '{':
                return true;
                break;
            case '}':
                return true;
                break;
            case '(':
                return true;
                break;
            case ')':
                return true;
                break;
            case '[':
                return true;
                break;
            case ']':
                return true;
                break;
            // relacionales
            case '=':
                return true;
                break;
            case '<':
                return true;
                break;
            case '>':
                return true;
                break;
            case '!':
                return true;
                break;
            // aritmeticos
            case '+':
                return true;
                break;
            case '-':
                return true;
                break;
            case '*':
                return true;
                break;
            // logicos
            case '&':
                return true;
                break;
            case '|':
                return true;
                break;
        }
        return false;
    }

    verSimEsp(c) {
        switch (c) {
            case '\\':
                return true;
                break;
            case '\'':
                return true;
                break;
            case '\"':
                return true;
                break;
            case 'n':
                return true;
                break;
            case 't':
                return true;
                break;
            case 'r':
                return true;
                break;
        }
        return false;
    }

    // funciones de espesificacion Token
    verTPalRes(lex) {
        lex = lex.toLowerCase();

        switch (lex) {
            //////////////// de variable
            case "int":
                return "tkPInt";
                break;
            case "double":
                return "tkPDou";
                break;
            case "char":
                return "tkPCha";
                break;
            case "bool":
                return "tkPBoo";
                break;
            case "string":
                return "tkPStr";
                break;
            case "true":
                return "tkTru";
                break;
            case "false":
                return "tkFal";
                break;

            ///////////////// de funcion
            case "void":
                return "tkVoi";
                break;
            case "main":
                return "tkMai";
                break;

            ///////////////// funcionales
            case "return":
                return "tkRet";
                break;
            case "break":
                return "tkBre";
                break;
            case "continue":
                return "tkCont";
                break;

            ///////////////// condicional
            case "if":
                return "tkIf";
                break;
            case "else":
                return "tkEls";
                break;

            case "switch":
                return "tkSwi";
                break;
            case "case":
                return "tkCas";
                break;
            case "default":
                return "tkDef";
                break;

            ///////////////// ciclos
            case "for":
                return "tkFor";
                break;

            case "do":
                return "tkDo";
                break;
            case "while":
                return "tkWhi";
                break;

            ///////////////// consola
            case "console":
                return "tkCons";
                break;
            case "write":
                return "tkWri";
                break;
        }
        return "tkIde";
    }

    verTSim(c) {
        switch (c) {
            // sintaxis
            case '.':
                return "tkSPun";
                break;
            case ',':
                return "tkSCom";
                break;
            case ':':
                return "tkSDosPun";
                break;
            case ';':
                return "tkSPunCom";
                break;
            case '{':
                return "tkSAbrLla";
                break;
            case '}':
                return "tkSCieLla";
                break;
            case '(':
                return "tkSAbrPar";
                break;
            case ')':
                return "tkSCiePar";
                break;
            case '[':
                return "tkSAbrCor";
                break;
            case ']':
                return "tkSCieCor";
                break;
            // relacionales
            case '=':
                return "tkSIgu";
                break;
            case '<':
                return "tkSMen";
                break;
            case '>':
                return "tkSMay";
                break;
            case '!':
                return "tkSAdm";
                break;
            // aritmeticos
            case '+':
                return "tkSMas";
                break;
            case '-':
                return "tkSGui";
                break;
            case '*':
                return "tkSAst";
                break;
            // logicos
            case '&':
                return "tkSAmp";
                break;
            case '|':
                return "tkSBarVer";
                break;
            // especiales
            case '\\':
                return "tkSBarInv";
                break;
            case '\'':
                return "tkSComSim";
                break;
            case '\"':
                return "tkSComDob";
                break;
            case 'n':
                return "tkSSal";
                break;
            case 't':
                return "tkSTab";
                break;
            case 'r':
                return "tkSRet";
                break;
        }
        return "TkSDes";
    }


}