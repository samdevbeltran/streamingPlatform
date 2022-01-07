import { getApiInfo,getElementById } from './apiController.js';

const url = "https://run.mocky.io/v3/7ebb6f54-94b7-420d-82e6-61a2aa6bd212";
var apiSeriesOne = [];
var welcomeText;
var mainContainer = getElementById("mainContainer");
var headerElement = document.querySelector("header");


function emptyMaiContainer(){

    mainContainer.innerHTML = "";
}

export function getSeries(id){
    
    removeEpisodesBtn();

    if(apiSeriesOne.length > 0){

        let html;
        let series = getApiInfo(apiSeriesOne[1],"series",id);
        let seriePic = apiSeriesOne[0]["catalog"].filter(item => item.id == id)[0].photo;
        let divEpisodeContainer = document.createElement("div");
        let altId = series[0].id;

        emptyMaiContainer();
        headerElement.innerHTML = "";
        divEpisodeContainer.className = "divEpisodeContainer";
        headerElement.innerHTML += '<img  class="episodeHeaderImg" src="'+seriePic+'">';
        divEpisodeContainer.appendChild(headerElement);

        series[0]["episodes"].map((element ,index )=>{

            
            html = '<div class="episodeContainerItem">'+
                        '<a href="javascript:void(0)">'+
                            '<div class="episodePhotoContainer zoom">'+
                                '<img id="'+index+'" src="'+element.photo+'" alt="'+altId+'" class="episodeImg">'+                                
                            '</div>'+
                        '</a>'+
                        '<div class="episodeTextContainer">'+
                            '<h3> '+(index+1)+'. '+element.name+'</h3>'+
                            '<p>'+element.text+'</p>'+
                        '</div>'
                    '</div>'; 

            divEpisodeContainer.innerHTML += html;    
        });
        
        mainContainer.appendChild(divEpisodeContainer);
    }   
}

export function insertVideo(id,seriesId){
    
    emptyMaiContainer();
    
    let series = getApiInfo(apiSeriesOne[1],"series",seriesId)[0];
    let episodeInfo = series["episodes"][id];
    let episodeVideoHtml;

    episodeVideoHtml = '<iframe class="iframeVideo"  src="'+episodeInfo.link+'" title="'+episodeInfo.name+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>'+
    '</iframe>';
    mainContainer.innerHTML = episodeVideoHtml;
    
    insertEpisodesBtn(seriesId);
}

function insertEpisodesBtn(seriesId){

    let html = '<a id="moreEpisodesBtn" href="javascript:void(0)" >'+
                    '<span class="btnMoreEpi" style="color: white;" id="'+seriesId+'">'+
                        'More Episodes'
                    '</span>'+
                '</a>';

    document.querySelector(".homeBtn").innerHTML += html;
}

function removeEpisodesBtn(){

    let btnEpisode = getElementById("moreEpisodesBtn");

    if(btnEpisode != null){

        btnEpisode.remove();
    }
}

function renderHeaderHtml(api){
    
    getElementById("headerPicture").src = api[0]["header"].photo; 
    getElementById("headerPicture").alt = api[0]["header"].alt;
    insertWelcomeDescription();   
}

export function insertWelcomeDescription(){

    if(getElementById("descriptionSeries")){
        
        getElementById("descriptionSeries").innerHTML = '<div class="textDescriptionContainer"><p class="textDescription"> '+welcomeText+'</p></div>';
    }
}

export function renderHeaderDescriptionHtml(idSeries){
    
    let seriesInfo = getApiInfo(apiSeriesOne[0],"catalog",idSeries)[0];

    if(seriesInfo){

        let html = '<div class="textDescriptionSeries">'+
                    '<p class="textDescription">'+seriesInfo.text+'</p>'+
                '</div>'
        
        getElementById("descriptionSeries").innerHTML = html; 
    }
}
export function renderHeaderDescriptionOff(idSeries){
    
    let seriesInfo = getApiInfo(apiSeriesOne[0],"catalog",idSeries)[0];
    getElementById("bannerText").innerHTML = seriesInfo.text;
}

function renderSeriesHtml(api){

    let html;
    let seriesContainer = getElementById("seriesContainer");
    api.shift();

    api[0]["catalog"].forEach((element,index) => {
        
        html = '<div class="seriesItem zoom">'+
                    '<div id="'+element.id+'">'+    
                        '<p class="titleSeriesItem">'+element.name+'</p>'+
                        '<a href="javascript:void(0)">'+
                            '<img src="'+element.photo+'" alt="'+element.photo+'" id="'+element.id+'" class="imgSeries">'+
                        '</a>'+
                    '</div>'+    
                '/<div>';
        
                seriesContainer.innerHTML += html;
    });
}

export function renderHomeView(){
    
    fetch(url).then(data => {
 
        if(data.ok){
 
            return data.json();
        }else{
 
            console.log("sorry the info was not able to load ");
        }
    }).then(series => {
 
            apiSeriesOne = series;
            welcomeText = apiSeriesOne[0]["header"].text;
            renderHeaderHtml(apiSeriesOne);
            renderSeriesHtml(apiSeriesOne);
    });
    
}