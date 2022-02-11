import { renderHomeView,getSeries,insertVideo,renderHeaderDescriptionHtml,insertWelcomeDescription }from "./viewController.js";

var x = window.matchMedia("(min-width: 992px)")
renderHomeView();

document.addEventListener("click", function (click) {
    window.scrollTo(0, 0);
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

function responsoveLargeFunction(x) {
  
    document.addEventListener("mouseover",function(e){
        if (x.matches) {
            if(e.target.className == "imgSeries" ||  e.target.className == "seriesItem zoom"){
                renderHeaderDescriptionHtml(e.target.id,true);
            }else{
                insertWelcomeDescription();
            }
        }else{
            if(e.target.className == "imgSeries" ||  e.target.className == "seriesItem zoom"){
                renderHeaderDescriptionHtml(e.target.id,false);
                insertWelcomeDescription();
            }    
        }
    });
}

responsoveLargeFunction(x)
x.addListener(responsoveLargeFunction)





