var wrap = document.getElementById('wrapper');
var x = document.getElementById('fileReader');

var rulesIf = document.getElementById('rulesIf');
var rulesSo = document.getElementById('rulesSo');
var rulesLvl = document.getElementById('rulesLvl');
var facts = document.getElementById('facts');
var results = document.getElementById('results');


// TODO to OBJECT


// TODO Parse rules so 
// TODO Parse rules lvl
// TODO Parse facts


// TODO parse if non

function parseTxt (){

    var str = rulesIf.innerHTML;

    while(str.charAt(str.length - 1) == '\n'){
        str = str.slice(0, -1);
    }

    str = str.split('\n');

    var ruIf = [];

    for (var k=0; k < str.length; k++){

       var tmp = str[k].split(/&amp;/g);
        for(var h=0; h < tmp.length; h++){
            
            while (tmp[h].charAt(0) == ' '){
                tmp[h] = tmp[h].slice(1);
            }

            while (tmp[h].charAt(tmp[h].length -1) == ' '){
                tmp[h] = tmp[h].slice(0, -1);
            }
        }

        ruIf.push(tmp);
    }

    console.log(ruIf);
}


function readTxt (str){
 
    var tmpLine = str.split('\n');

    for (var k=0; k < tmpLine.length; k++){
        
        var tmpCol = tmpLine[k].split(',');

        while ((! tmpCol[tmpCol.length - 1]) || tmpCol[tmpCol.length - 1] == '\r'){
            tmpCol.splice(-1,1);
        }

        for (var h=0; h < tmpCol.length; h++){

            switch(h){

                case 0 :

                    rulesIf.innerHTML = rulesIf.innerHTML + tmpCol[h] + '\n';

                    break;

                case 1:

                    rulesSo.innerHTML = rulesSo.innerHTML + tmpCol[h] + '\n';

                    break;

                case 2:

                    if (tmpCol.length > 3){
                        rulesLvl.innerHTML = rulesLvl.innerHTML + tmpCol[h] + '\n';
                    } else {
                        rulesLvl.innerHTML = rulesLvl.innerHTML + "1" + '\n';
                        facts.innerHTML = facts.innerHTML + tmpCol[h] + '\n';
                    }

                    break;

                case 3:

                    facts.innerHTLM = facts.innerHTML + tmpCol[h] + '\n';

                    break;

                default:
                    break;
            }
        }
    }

    parseTxt();

}


function readFile (e){

    var txt = '';
    
    if ('files' in x) {
    
        if (x.files.length == 0) {
            
            txt = 'Select one or more files.';
            wrap.innerHTML = txt;

        } else {

            var tmptxt = '';

            for (var i = 0; i < x.files.length; i++) {

                var reader = new FileReader();
                reader.onload = function(){
                    readTxt(reader.result);
                };
         
                reader.readAsText(e.target.files[i]);
            }
        }

    } else {
        
        if (x.value == '') {

            txt = 'Select one or more files.';
            wrap.innerHTML = txt;

        } else {

            txt = 'The files property is not supported by your browser!';
            wrap.innerHTML = txt;
        }
    }

}
