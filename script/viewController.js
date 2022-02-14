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
        mainContainer.innerHTML += get_home_button();

        headerElement.innerHTML = "";
        headerElement.setAttribute("class","sticky-section mb-5")
        divEpisodeContainer.className = "divEpisodeContainer";

        headerElement.innerHTML += 
                    '<div class="episodeHeaderImg" >'+
                        '<img  class="episodeHeaderImg" src="'+seriePic+'">'+
                    '</div>'
                
        divEpisodeContainer.appendChild(headerElement);

        series[0]["episodes"].map((element ,index )=>{

            
            html = '<div class="row list-item">'+
                        '<div class="col-sm-12 col-lg-6">'+
                            '<a href="javascript:void(0)">'+
                                '<div class="episodePhotoContainer zoom">'+
                                    '<img id="'+index+'" src="'+element.photo+'" alt="'+altId+'" class="episodeImg">'+                                
                                '</div>'+
                            '</a>'+
                        '</div>'+
                        '<div class="episodeTextContainer col-sm-12 col-lg-6">'+
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
    
    let header = document.querySelector("header");
    let series = getApiInfo(apiSeriesOne[1],"series",seriesId)[0];
    let episodeInfo = series["episodes"][id];
    let episodeVideoHtml;

    episodeVideoHtml = '<div style="padding:5%;"><iframe class="iframeVideo"  src="'+episodeInfo.link+'" title="'+episodeInfo.name+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></div></iframe>';

    header.innerHTML = ""
    header.innerHTML += episodeVideoHtml
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
    
    getElementById("headerPicture").src = "img/hermanoStoryMakersBanner2.jpeg";
    getElementById("headerPicture").alt = api[0]["header"].alt;
    insertWelcomeDescription();   
}

export function insertWelcomeDescription(){

    if(getElementById("descriptionSeries")){
        
        getElementById("descriptionSeries").innerHTML = '<div class="textDescriptionContainer"><p class="textDescription"> '+welcomeText+'</p></div>';
    }
}

export function renderHeaderDescriptionHtml(idSeries,descriptionBool){
    
    let seriesInfo = getApiInfo(apiSeriesOne[0],"catalog",idSeries)[0];

    if(descriptionBool){
        if(seriesInfo){

            let html = '<div class="textDescriptionSeries">'+
                        '<p class="textDescription">'+seriesInfo.text+'</p>'+
                    '</div>'
            
            getElementById("descriptionSeries").innerHTML = html; 
        }
    }else{
        getElementById("descriptionSeries").innerHTML = ""
    }
    
}
export function renderHeaderDescriptionOff(idSeries){
    
    let seriesInfo = getApiInfo(apiSeriesOne[0],"catalog",idSeries)[0];
    if(seriesInfo.text != undefined){
        getElementById("bannerText").innerHTML = seriesInfo.text;    
    }
    
}

function renderSeriesHtml(api){
    let counter = 0
    let html ="";
    let seriesContainer = getElementById("seriesContainer");
    api.shift();

    api[0]["catalog"].forEach((element,index) => {

        if(counter == 0) html += '<div class="row col-lg-6 col-sm-12">';
    
        html += '<div class="seriesItem zoom col-lg-6 col-sm-6">'+
                    '<a href="javascript:void(0)">'+
                        '<img src="'+element.photo+'" alt="'+element.photo+'" id="'+element.id+'" class="imgSeries">'+
                    '</a>'+
                '</div>';

        counter ++;
        if(counter == 2){
            html += '</div>';
            counter = 0;
        } 
    });
    seriesContainer.innerHTML += html;
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

function get_home_button(){
    return '<div class="homeBtn">'+
        '<a href="index.html">'+
            '<span style="color: white;">HOME</span>'+
        '</a>'+
    '<div>';
}