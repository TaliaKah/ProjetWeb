var a;
var b;
const NB_DEPUTES = 576;
const page1=document.querySelector('div.page1');
const page2=document.querySelector('div.page2');
const nomDepute=document.querySelector('#nomDepute');
const nomDepute2=document.querySelector('#nomDepute2');
const dateNaissance=document.querySelector('#dateNaissance');
const circo=document.querySelector('#circo');
const jobDepute=document.querySelector('#jobDepute');
const parti=document.querySelector('#parti');
const boutonNouveauDepute=document.querySelector('#nouveauDepute');
const boutonP2=document.querySelector('#moreInfo');
const boutonAccueil=document.querySelector('#accueil');

const boutonRecherche=document.querySelector('#searchButton');

function setPhotoDepute(URL){
  let x = document.getElementById("photoDepute");
  let y = document.getElementById("photoDepute2");
  x.setAttribute("src", URL);
  y.setAttribute("src", URL);
}

async function fetchDeputes() {
  const res = await fetch("https://www.nosdeputes.fr/deputes/json");
  const data = await res.json();
  a = await data;
  afficherInfo();
}

page1.style.display='block';
page2.style.display='none';

fetchDeputes();

boutonP2.addEventListener('click', function(){
  page1.style.display='none';
  page2.style.display='block';
})

boutonAccueil.addEventListener('click', function(){
  page1.style.display='block';
  page2.style.display='none';
})

boutonNouveauDepute.addEventListener('click', fetchDeputes)

boutonRecherche.addEventListener('click', research)

function sansAccent(str){
  var accent = [
    /[\300-\306]/g, /[\340-\346]/g, // A, a
    /[\310-\313]/g, /[\350-\353]/g, // E, e
    /[\314-\317]/g, /[\354-\357]/g, // I, i
    /[\322-\330]/g, /[\362-\370]/g, // O, o
    /[\331-\334]/g, /[\371-\374]/g, // U, u
    /[\321]/g, /[\361]/g, // N, n
    /[\307]/g, /[\347]/g, // C, c
];
var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
 
var str1 = str;
for(var i = 0; i < accent.length; i++){
    str1 = str1.replace(accent[i], noaccent[i]);
}
 
return str1;
}

function research(){
  var input=document.querySelector('#input').value.toString();
  if (input==='')
  {
    alert("La barre de recherche est vide")
  }
  else
  {
    var input1=sansAccent(input);
    var input2=input1.replaceAll(' ', '-');
    var input3=input2.replaceAll('\'', '-');
    var input4=input3.toLowerCase();
    
    let URLDepute1='https://www.nosdeputes.fr/' + input4 +'/json';
    researchAA(URLDepute1, input4)
    }
}

function researchAA(URLDepute, slug){
  var request = new XMLHttpRequest();
  request.open('GET', URLDepute);

  request.onreadystatechange = function() 
  {
    if (this.readyState==4)
    {
      var response = JSON.parse(this.responseText)
      if(response.depute==undefined)
      {
        alert('Le député n\'existe pas')
      }
      else
      {
        let deputeID=response.depute;
        let URL = "https://www.nosdeputes.fr/depute/photo/" + slug + "/600"
        let y = document.getElementById("photoDepute2");
        y.setAttribute("src", URL);
        nomDepute2.innerHTML=deputeID.nom;
        if(deputeID.sexe=='H')
        {
          dateNaissance.innerHTML='Né le ' + deputeID.date_naissance;
        }
        else{
          dateNaissance.innerHTML='Née le ' + deputeID.date_naissance;
        }
        circo.innerHTML=
        'Circonscription n°' + deputeID.num_circo + ' - '+deputeID.nom_circo + ' - '+ deputeID.num_deptmt;
        if(deputeID.profession!=null)
        {  
          jobDepute.innerHTML=deputeID.profession;
        }
        parti.innerHTML=deputeID.parti_ratt_financier;
        page1.style.display='none';
        page2.style.display='block';
      }
    }
  };
  request.send();
  
}

async function fetchDepute(URLevent) {
  try{
  const res = await fetch(URLevent);
  console.log(res);
  const data = await res.json();
  b = await data;
  afficherInfoDepute();
  }

  catch{
    console.log('error hapenned', 'e');
    alert("Rentrez un député existant");
  }
}

function afficherInfoDepute(){
  let deputeID = b;
  if (deputeID.nom==undefined)
  {
    alert('Le député n\'existe pas !')
  }
  console.log(deputeID.nom);
}

function afficherInfo() {
  let i = Math.floor(Math.random() * NB_DEPUTES);
  let deputeID = a.deputes[i].depute;
  //console.log(deputeID);
  let slugDepute = deputeID.slug; //Slug = Identifiant depute dans BDD
  let URL = "https://www.nosdeputes.fr/depute/photo/" + slugDepute + "/600"
  setPhotoDepute(URL);
  nomDepute.innerHTML=deputeID.nom;
  nomDepute2.innerHTML=deputeID.nom;
  if(deputeID.sexe=='H')
  {
    dateNaissance.innerHTML='Né le ' + deputeID.date_naissance;
  }
  else{
    dateNaissance.innerHTML='Née le ' + deputeID.date_naissance;
  }
  circo.innerHTML=
    'Circonscription n°' + deputeID.num_circo + ' - '+deputeID.nom_circo + ' - '+ deputeID.num_deptmt;
  if(deputeID.profession!=null){  
    jobDepute.innerHTML=deputeID.profession;
  }
  parti.innerHTML=deputeID.parti_ratt_financier;
}
