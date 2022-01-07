import { renderHomeView,getSeries,insertVideo,renderHeaderDescriptionHtml,insertWelcomeDescription }from "./viewController.js";


renderHomeView();

document.addEventListener("click", function (click) {
    if(click.target.className == "imgSeries"){
        getSeries(click.target.id);
    }
    if(click.target.className == "episodeImg"){
        insertVideo(click.target.id,click.target.alt)
    }
    if(click.target.className == "btnMoreEpi"){
        getSeries(click.target.id);
    }
    
});

document.addEventListener("mouseover",function(e){
    
    if(e.target.className == "imgSeries" ||  e.target.className == "seriesItem zoom"){
        renderHeaderDescriptionHtml(e.target.id);
    }else{
        insertWelcomeDescription();
    }
});



