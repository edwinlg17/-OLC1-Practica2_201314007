class AnaLex {
    ////////////////////////// CONSTRUCTOR
    constructor() {
        this.lisTok = [];
    }

    ///////////////////////// METODOS
    analizar(tex) {
        alert("aver si se actualiza");
        //let t = new Token("0", "tk_ide", "var1", "5", "5");
        tex += "\n  ";
        this.lisTok = [];
        this.lisErr = [];

        var ind = 0, est = 0;
        var lex = "";
        var car = ' ';

        var fil = 1, col = 1, ft = 0, ct = 0;

        while (ind < tex.length) {
            car = tex[ind];

            switch (est) {
                // estado 0
                case 0:
                    lex = "";
                    ft = fil;
                    ct = col;

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
                        this.agrErr(car + " " + ft + " " + ct);
                    }

                    col++;
                    ind++;
                    break;
                /////////////////////////// IDENTIFICADORES
                // estado 1
                case 1:
                    if (this.verLet(car) | this.verNum(car) | car == '_') {
                        lex += car;
                        ind++;
                        col++;
                    } else {
                        est = 0;
                        this.agrTok(this.verPalRes(lex) + " " + lex + " " + ft + " " + ct);
                    }
                    break;

                /////////////////////////// NUMEROS
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
                        this.agrTok(lex + " " + ft + " " + ct);
                    }
                    break;

                // estado 7
                case 7:
                    if (this.verNum(car)) {
                        est = 13;
                        lex += car;
                        ind++;
                        col++;
                    } else {
                        est = 0;
                    }
                    break;

                // estado 13
                case 13:
                    if (this.verNum(car)) {
                        lex += car;
                        ind++;
                        col++;
                    } else {
                        est = 0;
                        this.agrTok(lex + " " + ft + " " + ct);
                    }
                    break;

                /////////////////////////// CADENAS
                // estado 3
                case 3:
                    if (car == '"') {
                        est = 0;
                        lex += car;
                        col++;
                        this.agrTok(lex + " " + ft + " " + ct);
                    } else if (car == '\\') {
                        est = 8;
                        lex += car;
                        col++;
                    } else {
                        lex += car;
                        col++;
                    }
                    ind++;
                    break;

                // estado 8
                case 8:
                    if (this.verSim(car)) {
                        est = 3;
                        lex += car;
                        ind++;
                        col++;
                    } else if (car == 'n' | car == 't' | car == 'r' | car == '"') {
                        est = 3;
                        lex += car;
                        ind++;
                        col++;
                    } else {
                        est = 0;
                    }
                    break;

                /////////////////////////// CARACTERES
                // estado 4
                case 4:
                    if (car == '\\') {
                        est = 10;
                        lex += car;
                        ind++;
                        col++;
                    } else if (this.verLet(car) | this.verNum(car) | this.verSim(car) | car == '"') {
                        est = 9;
                        lex += car;
                        ind++;
                        col++;
                    } else {
                        est = 0;

                    }
                    break;
                // estado 9
                case 9:
                    if (car == '\'') {
                        est = 0;
                        lex += car;
                        col++;
                        this.agrTok(lex + " " + ft + " " + ct);
                    } else {
                        est = 0;
                    }
                    break;
                // estado 10
                case 10:
                    if (this.verSim(car)) {
                        est = 9;
                        lex += car;
                        ind++;
                        col++;
                    } else if (car == 'n' | car == 't' | car == 'r' | car == '"' | car == '\'' | car == '\\') {
                        est = 9;
                        lex += car;
                        ind++;
                        col++;
                    } else {
                        est = 0;
                    }
                    break;

                /////////////////////////// COMENTARIOS
                // estado 5
                case 5:
                    if (car == '/') {
                        est = 11;
                        lex += car;
                        ind++;
                        col++;
                    } else if (car == '*') {
                        est = 12;
                        lex += car;
                        ind++
                        col++;
                    } else {
                        est = 0;
                        this.agrTok(lex + " " + ft + " " + ct);
                    }
                    break;

                // estado 11
                case 11:
                    if (car != '\n') {
                        lex += car;
                        col++;
                        ind++;
                    } else {
                        est = 0;
                        this.agrTok(lex + " " + ft + " " + ct);
                    }
                    break;

                // estado 12
                case 12:
                    if (car != '*') {
                        if (car != '\n') {
                            lex += car;
                            col++;
                        } else {
                            col = 1;
                            fil++;
                        }
                    } else {
                        est = 14;
                        lex += car;
                        col++;
                    }

                    ind++;
                    break;

                // estado 11
                case 14:
                    if (car == '/') {
                        est = 0;
                        lex += car;
                        col++;
                        this.agrTok(lex + " " + ft + " " + ct);
                    } else {
                        est = 12;
                        lex += car;
                        col++;
                    }
                    ind++;
                    break;

                /////////////////////////// SIMBOLOS
                // estado 6
                case 6:
                    est = 0;
                    this.agrTok(lex + " " + ft + " " + ct);
                    break;
            }
        }

        con = document.getElementById("texSal");

        con.innerHTML = "//////////////////\n";
        con.innerHTML += "Tokens:\n";

        for (var i = 0; i < this.lisTok.length; i++) {
            con.innerHTML += this.lisTok[i] + "\n";
        }

        con.innerHTML += "Errores:\n";
        for (var i = 0; i < this.lisErr.length; i++) {
            con.innerHTML += this.lisErr[i] + "\n";
        }

        //alert("fin analisis")
    }

    // agrega tokens 
    agrTok(lex) {
        this.lisTok.push(lex);
    }

    // agrega erroes
    agrErr(lex) {
        this.lisErr.push(lex);
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
            case '\'':
                return true;
                break;
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

    verPalRes(lex) {
        lex = lex.toLowerCase();

        switch (lex) {
            //////////////// de variable
            case "int":
                return "tkInt";
                break;
            case "double":
                return "tokDou";
                break;
            case "char":
                return "tkCha";
                break;
            case "bool":
                return "tkBol";
                break;
            case "string":
                return "tkstr";
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
                return "";
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


}