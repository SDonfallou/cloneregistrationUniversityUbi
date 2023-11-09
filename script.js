


function masterFunction() {
  var fn = document.getElementById("input-firstname").value;
  var ln = document.getElementById("input-lastname").value;
  var corsolaureaScelto = document.getElementById("corsolaureaScelto").value;
  var dataDiRiunione = riunioneMatricole();
  var gruppo = dataDiRiunione.var1;
  var data = dataDiRiunione.var2;
  var risultato = calculOfTheOld();
  var valoreIsee = document.getElementById("valoreIsee").value;
  var risultatoTasse = calcolaFasciaETasse(valoreIsee);
  var sesso = document.getElementById('genderType').getElementsByTagName('input');

  var form = document.getElementById("registrationForm");
  var valoreIseeInput = document.getElementById("valoreIsee");
  var votoDiploma = parseInt(document.getElementById("voto").value);

  if (form.checkValidity()) {
      // Vérifier si Valore ISEE contient uniquement des chiffres
      var isNumeric = /^\d+$/.test(valoreIseeInput.value);

      if (isNumeric!=true) {
      
          alert("Valore ISEE deve contenire unicamente dei numeri.");
          return;
      }
  }
  if (votoDiploma < 60 || votoDiploma > 100) {
    alert("Il voto di diploma deve essere compreso tra 60 e 100.");
    return;
  }


 
  if(fn!='' && ln!='' && corsolaureaScelto!="Corsi di Laurea" &&  valoreIsee!=''){
   
 
    
    let myWindow = window.open("messagiodellaConferma.html");
   

    myWindow.onload = function(){
        // Change background color based on the value of 'sesso'
 

       if (document.getElementById('customRadio2').checked) {
          if(rate_value = document.getElementById('customRadio2').value=='female'){
            myWindow.document.body.style.backgroundColor = "#ffb8c6";
         }  
      }else{
        myWindow.document.body.style.backgroundColor = "#007FFF";
      }

       myWindow.document.getElementById("fn").textContent = fn;
       myWindow.document.getElementById("ln").textContent = ln;
       myWindow.document.getElementById("corsolaureaScelto").textContent = corsolaureaScelto;
       myWindow.document.getElementById("gruppo").textContent = gruppo;
       myWindow.document.getElementById("data").textContent = data;
       myWindow.document.getElementById("anni").textContent = risultato.year;
       myWindow.document.getElementById("mesi").textContent = risultato.month;
       myWindow.document.getElementById("giorni").textContent = risultato.day;
       myWindow.document.getElementById("valoreIsee").textContent =valoreIsee;
      
  if (document.getElementById("residenza").value.toLowerCase()=="bergamo(bg)"){

    // TODO DEVO CHIAMARE LA FUNZIONE PER VERIFICARE SE UTENTE ABITA A BERGAMO (PROVINCIA) OR COMUNE 
      var percentoDiSconto =100-scontoSulleTasse();
       myWindow.document.getElementById("importoTasse").textContent =risultatoTasse.importoTasse*percentoDiSconto/100 ;

       myWindow.document.getElementById("ScontoSulleTasseImporto").innerHTML=" &#128204 Essendo Residente di Bergamo hai un Sconto Di 10 % Già applicato"
    }
    else{
          myWindow.document.getElementById("importoTasse").textContent = risultatoTasse.importoTasse;
       }
    };
   

  }else{ alert("Non puo registri campi voti");}
}

function reduceTax(inputTaxe){
 inputTaxe*80/100;
}
function riunioneMatricole() {

  var corsolaureaScelto = document.getElementById("corsolaureaScelto").value;

  switch (corsolaureaScelto) {
    case "DIRITTO PER L'IMPRESA NAZIONALE E INTERNAZIONALE":
    case "GIURISPRUDENZA":
      return {var1:"09-02-2024",var2:"gruppo giurisprudenza"};

     
    case "INGEGNERIA DELLE TECNOLOGIE PER L'EDILIZIA":
    case "INGEGNERIA MECCANICA":
    case "INGEGNERIA DELLE TECNOLOGIE PER LA SOSTENIBILITÀ: ENERGETICA E AMBIENTAL":
    case "INGEGNERIA DELLE TECNOLOGIE PER LA SALUTE":
    case "INGEGNERIA GESTIONALE":
    case "INGEGNERIA INFORMATICA":
      return {var1:"09-03-2024",var2:"gruppo ingegneria"};

    case "MEDICINE AND SURGERY":
    case "FILOSOFIA":
    case "LETTERE":
    case "LINGUE E LETTERATURE STRANIERE MODERNE":
      return {var1:"09-04-2024",var2:"gruppo medicina e studi umanistici"};


    case "ECONOMIA AZIENDALE":
    case "ECONOMIA":
    case "SCIENZE POLITICHE E STRATEGIE GLOBALI":
      return {var1:"09-05-2024",var2:"gruppo economia"};


    case "SCIENZE DELL'EDUCAZIONE":
    case "SCIENZE MOTORIE E SPORTIVE":
    case "SCIENZE PSICOLOGICHE":
    case "SCIENZE DELLA FORMAZIONE PRIMARIA":
      return {var1:"09-06-2024",var2:" gruppo formazione psicologia"};


    default:
      return "Date not defined";
  }
}


function calcolaFasciaETasse(valoreISEE) {
  if (valoreISEE >= 0 && valoreISEE <= 14000) {
    return { fascia: 'A', importoTasse: 300 };
  } else if (valoreISEE <= 18000) {
    return { fascia: 'B', importoTasse: 600 };
  } else if (valoreISEE <= 25000) {
    return { fascia: 'C', importoTasse: 900 };
  } else if (valoreISEE <= 33000) {
    return { fascia: 'D', importoTasse: 1200 };
  } else if (valoreISEE <= 46000) {
    return { fascia: 'E', importoTasse: 1500 };
  } else if (valoreISEE <= 58000) {
    return { fascia: 'F', importoTasse: 1800 };
  } else if (valoreISEE <= 58001) {
    return { fascia: 'G', importoTasse: 1983 };
  } else {
    return { valoreISEE: 0, importoTasse: 0 };
  }

}
function calculOfTheOld() {
  var dataDiRiunione = riunioneMatricole().var1;
  var birthday = document.getElementById("dateStandard").value;

  // Check if the data is valid
  if (!dataDiRiunione || !birthday) {
    console.error('The values are not valid.');
    return null; // Return a default value
  }

  var birthdayConvert = new Date(birthday);
  var dataDiRiunioneDate = new Date(dataDiRiunione);


  var years = dataDiRiunioneDate.getFullYear() - birthdayConvert.getFullYear();
  var months = dataDiRiunioneDate.getMonth() - birthdayConvert.getMonth();
  var days = dataDiRiunioneDate.getDate() - birthdayConvert.getDate();

  // Adjustment for the case where the month or days are negative
  if (days < 0) {
    var lastMonth = new Date(dataDiRiunioneDate.getFullYear(), dataDiRiunioneDate.getMonth(), 0);
    days += lastMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // Adjustment for the case where the years are negative
  if (years < 0) {
    years = 0;
  }

  return {
    year: years,
    month: months,
    day: days
  };
}


function scontoSulleTasse(){
   var votoDiplomaPerTasse =document.getElementById("voto").value;
   var indirizzoUtente = document.getElementById("residenza").value;
   let sconto=0 ;

   if(votoDiplomaPerTasse>80){
         sconto +=10;
   }
  
   if(indirizzoUtente){

    var valSconto = validateLocationPerSconto(sconto);
    sconto+=valSconto;
   }

  return sconto;
}

function validateLocationPerSconto(scontoBG){
   let residenza = document.getElementById("residenza").value;
   let cityName,provinceCode;
   scontoBG=0;
   
  // Converto in LowerCase l'indirizzo 
  var lowercaseInput = residenza.toLowerCase();

  // Utilisation d'une expression régulière pour vérifier le format
  var regex = /^([a-zA-Z\s]+)\(([a-zA-Z]{2})\)$/;

  // Teste la chaîne par rapport à l'expression régulière
  var match = lowercaseInput.match(regex);

 
       cityName = match[1].trim(); // Recupero la città
       provinceCode = match[2].toUpperCase(); // Recupero la provincia
     
       console.log(cityName);
       console.log(provinceCode);
       
  

  if(cityName.toLowerCase()=="bergamo"){
    scontoBG+=3;
  
  }
  if(provinceCode.toLowerCase()=="bg"){
    scontoBG+=5;
  }
  
  return scontoBG;
}


