var wrap = document.getElementById('wrapper');
var x = document.getElementById('fileReader');

var rulesIf = document.getElementById('rulesIf');
var rulesSo = document.getElementById('rulesSo');
var rulesLvl = document.getElementById('rulesLvl');
var facts = document.getElementById('facts');
var results = document.getElementById('results');


var rulesList = [];
var factsList = [];





function expertJob (){

    for(var ifW=0; ifW < rulesList.length; ifW++){

        var check = true;

        for(var k=0; k < rulesList[ifW].if.length; k++){
           
            var subCheck = false;

            for (var faW=0; faW < factsList.length; faW++){
                for (var h=0; h < factsList[faW].length; h++){

                    if (rulesList[ifW].if[k] == factsList[faW][h]){
                        subCheck = subCheck || true;
                    }

                }
            }

            check = check && subCheck;
        }

        if (check){
            console.log(rulesList[ifW].if);

            // TODO ADD TO Facts
            
            // Reboot without it
        }
    }
}



function parseTxt (){

    var str = rulesIf.innerHTML;

    while(str.charAt(str.length - 1) == '\n'){
        str = str.slice(0, -1);
    }

    str = str.split('\n');


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

        rulesList.push({if:tmp});
    }


    str = rulesSo.innerHTML;

    while(str.charAt(str.length - 1) == '\n'){
        str = str.slice(0, -1);
    }

    str = str.split('\n');


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

        rulesList[k].so = tmp;
    }


    str = rulesLvl.innerHTML;

    while(str.charAt(str.length - 1) == '\n'){
        str = str.slice(0, -1);
    }

    str = str.split('\n');


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

        rulesList[k].lvl = tmp;
    }


    str = facts.innerHTML;

    while(str.charAt(str.length - 1) == '\n'){
        str = str.slice(0, -1);
    }

    str = str.split('\n');


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

        factsList.push(tmp);
    }


    console.log(rulesList);
    console.log(factsList);


    expertJob();


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

                    if (tmpCol.length < 3){
                        rulesLvl.innerHTML = rulesLvl.innerHTML + "1" + '\n';
                    }

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




function pastRules (e){
    var tg = e.target;
    console.log(tg);
}


function pastFacts (e){

}


function pastRes (e){

}




function editRules (e){
    var tg = e.target;
    console.log(tg);
}


function editFacts (e){

}


function editRes (e){

}
