document.write('<title>by FruitScripts</title>')

var musicarr = Config.Songs

$(function() {
    shuffle(musicarr);
    init();
    window.addEventListener('message', function(event) {
        switch (event.data.eventName) {
            case 'loadProgress':
                $("#filled-logo").css("height", `${parseInt(event.data.loadFraction * 100)}%`);
                $("#progress_text").text(`${parseInt(event.data.loadFraction * 100)}%`);
            break
        }
    })
})

document.getElementById("volume").oninput = function() {
    const value = (this.value-this.min)/(this.max-this.min)*100
    music.volume = this.value / 200
}

function togglePlay() {
    audio[0].paused ? document.getElementById("pause").src = "assets/pause.png" : document.getElementById("pause").src = "assets/play.png";
    return audio[0].paused ? audio[0].play() : audio[0].pause();
};

function init(){
    document.getElementById("pause").src = "assets/pause.png"
    current = 0;
    audio = $('audio');
    audio[0].volume = .25;
    len = musicarr.length;
    
    run(musicarr[current], audio[0]);
    
    audio[0].addEventListener('ended',function(e){
        current++;
        if(current == len){
            current = 0;
        }
        run(musicarr[current],audio[0]);
    });
}

function run(link, player){
        player.src = link;
        audio[0].load();
        audio[0].play();
        $('#playing').html("<ul><li><a>" + link+ "</a></li></ul>");     
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function setup() {
    Config.Team.forEach((member, index) => {
        $(".team .innercards").append(`
        <div class="teammitlgied" id="teammitlgied_${index}">
            <span id="discord_name">${member.name}</span>
            <span id="rolle">${member.description}</span>
            <img id="team_logo" src="${member.image}">
        </div>
        `);
    })
    
    $('#name_top').html(Config.UpperName);
    $('#actual-text').html("&nbsp;" + Config.LowerName + "&nbsp;");
    $('#hover-text').html("&nbsp;" + Config.LowerName + "&nbsp;");
    $('#ourteam').html(Config.Title);
    document.getElementById("logo_transparent").src = Config.Logo;
    document.getElementById("filled-logo").src = Config.Logo;

    Config.Socials.forEach((social, index) => {
        $(".socials").append(`
        <div class="tooltip">
            <button class="social_button" id="social_button_${index}">
                <img id="social_img" src="${social.image}">
                <span class="tooltiptext" id="Tooltip_${index}">${social.help}</span>
            </button>
        </div>
        `);
        var object = document.getElementById(`social_button_${index}`);
        var tooltip = document.getElementById(`Tooltip_${index}`);
        object.onclick = function() {
            copyToClipboard(social.copytext);
            tooltip.innerHTML = social.success;
        };
        object.onmouseout = function() {
            tooltip.innerHTML = social.help;
        };
    })
}

function copyToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
 };

var currentPage = 0;
function next() {
    if(currentPage < Config.Team.length - 2) {
        $(`.team .pages > div[data-id="${currentPage}"]`).removeClass("active")
        currentPage++
        $(`.team .pages > div[data-id="${currentPage}"]`).addClass("active")
        $(".team .innercards").css("transform", `translate3d(calc(-${currentPage * 50}% - ${(currentPage+1) * .7}vw), 0, 0)`)
    }
}

function previous() {
    if(currentPage > 0) {
        $(`.team .pages > div[data-id="${currentPage}"]`).removeClass("active")
        currentPage--
        $(`.team .pages > div[data-id="${currentPage}"]`).addClass("active")
        $(".team .innercards").css("transform", `translate3d(calc(-${currentPage * 50}% - ${(currentPage+1) * .7}vw), 0, 0)`)
    }
}

setup();