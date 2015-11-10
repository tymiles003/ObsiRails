//     ███▄    █  ▒█████      ▄▄▄██▀▀▀█████   █    ██ ▓█████  ██▀███ ▓██   ██▓    ▐██▌ 
//     ██ ▀█   █ ▒██▒  ██▒      ▒██ ▒██▓  ██▒ ██  ▓██▒▓█   ▀ ▓██ ▒ ██▒▒██  ██▒    ▐██▌ 
//    ▓██  ▀█ ██▒▒██░  ██▒      ░██ ▒██▒  ██░▓██  ▒██░▒███   ▓██ ░▄█ ▒ ▒██ ██░    ▐██▌ 
//    ▓██▒  ▐▌██▒▒██   ██░   ▓██▄██▓░██  █▀ ░▓▓█  ░██░▒▓█  ▄ ▒██▀▀█▄   ░ ▐██▓░    ▓██▒ 
//    ▒██░   ▓██░░ ████▓▒░    ▓███▒ ░▒███▒█▄ ▒▒█████▓ ░▒████▒░██▓ ▒██▒ ░ ██▒▓░    ▒▄▄  
//    ░ ▒░   ▒ ▒ ░ ▒░▒░▒░     ▒▓▒▒░ ░░ ▒▒░ ▒ ░▒▓▒ ▒ ▒ ░░ ▒░ ░░ ▒▓ ░▒▓░  ██▒▒▒     ░▀▀▒ 
//    ░ ░░   ░ ▒░  ░ ▒ ▒░     ▒ ░▒░  ░ ▒░  ░ ░░▒░ ░ ░  ░ ░  ░  ░▒ ░ ▒░▓██ ░▒░     ░  ░ 
//       ░   ░ ░ ░ ░ ░ ▒      ░ ░ ░    ░   ░  ░░░ ░ ░    ░     ░░   ░ ▒ ▒ ░░         ░ 
//             ░     ░ ░      ░   ░     ░       ░        ░  ░   ░     ░ ░         ░    
//                                                                    ░ ░              
// Tutti à la mano - Bidouilleur Numérique POWAA
//
// Player Audio JS
//
// Avec persistances des données (morceau en cours, volume, lecteur mini...)
// pour une session.


$(document).ready(function() {

    var song;
    var firstTime = true;
    var morceau=1;
    var last = document.querySelector('#playlist ul');
    var sound_vol = 0.5;
    var mini = false;
    var playlist_visible = false;
    var volume_lock = false;
    var newpage = true;

    ///////////////////////////////////////////////////////////////////////////
    // Toggle visible of the playlist
    function playlist_toggle() {
        pl = document.getElementById("playlist");
        btn = document.getElementById("togglepl");
        setPrefixedValue(pl, "transition", "transform 0.5s ease");
        if (btn.classList.contains("fa-bars")) {
            setPrefixedValue(pl, "transform", "scaleY(1)");  
            btn.classList.remove("fa-bars");
            btn.classList.add("fa-close");
            playlist_visible = true;
        } else {
            setPrefixedValue(pl, "transform", "scaleY(0)");        
            btn.classList.remove("fa-close");
            btn.classList.add("fa-bars");
            playlist_visible = false;
        }
    }   
    
    document.getElementById("togglepl").addEventListener('click', playlist_toggle);
    
    
    ///////////////////////////////////////////////////////////////////////////
    // Inits an audio element
    function initAudio(elem) {
        var url = elem.getAttribute("audiourl");
        var cover = elem.getAttribute("cover");
        var title = elem.getElementsByTagName("li")[1].innerHTML;
        var artist = elem.getElementsByTagName("li")[2].innerHTML;
        document.getElementById("title").innerHTML = artist + " - " + title;
        document.getElementById("cover").src = cover;
        document.getElementById("time").innerHTML = "00:00/00:00";
        
        song = new Audio(url);
        
        song.volume = sound_vol;
        setpercent(document.getElementById("percent"), 0, "#111");
        setpercent(document.getElementById("timeline"), 0, "#F00");    
            
        if (parseInt(sessionStorage.getItem('play'))==1) {
            playAudio();
            document.getElementById("play").classList.remove("fa-play");
            document.getElementById("play").classList.add("fa-pause");
        }
    
        // loading progress listener
        song.addEventListener('progress', function() {
            if (song.buffered.length) {
                var loadedPercentage = this.buffered.end(0) / this.duration * 100;
                setpercent(document.getElementById("percent"), Math.floor(loadedPercentage), "#111");
            }
        });
        
        // is song ready to play ?
        song.addEventListener('canplaythrough', function() {
            if (sessionStorage.getItem('curtime')!=null && newpage) {
                song.currentTime = parseFloat(sessionStorage.getItem('curtime'));
                newpage = false;
            }
            if (!firstTime) {
                playAudio();
            }
            if (song.buffered.length) {
                var loadedPercentage = this.buffered.end(0) / this.duration * 100;
                setpercent(document.getElementById("percent"), Math.floor(loadedPercentage), "#111");
            } 
        });
        
        // timeupdate event listener
        song.addEventListener('timeupdate', function() {
            if (!this.paused || sessionStorage.getItem('curtime')!=null) {
                var percentPlayed = this.currentTime / this.duration * 100;
                document.getElementById("time").innerHTML = to_time(this.currentTime) + "/" + to_time(this.duration);
                setpercent(document.getElementById("timeline"), percentPlayed, "#333");
                sessionStorage.setItem('curtime', this.currentTime);
            }
        });
    }
    
    function to_time(time) {
        var sec = new Number();
        var min = new Number();
        sec = Math.floor(time);
        min = Math.floor( sec / 60 );
        min = min >= 10? min : '0' + min;
        sec = Math.floor( sec % 60);
        sec = sec >= 10 ? sec : '0' + sec;
        return min + ":" + sec;
    }
    
    function playAudio() {
        sessionStorage.setItem("play", 1);
        song.play();
    }
    
    function stopAudio() {
        sessionStorage.setItem("play", 0);
        song.pause();
    }
    
    
    ///////////////////////////////////////////////////////////////////////////
    // Bouton PLAY
    document.getElementById("play").onclick = function() {
        if (song.paused)
        {
            playAudio();
            document.getElementById("play").classList.remove("fa-play");
            document.getElementById("play").classList.add("fa-pause");
        } else {
            stopAudio();
            document.getElementById("play").classList.remove("fa-pause");
            document.getElementById("play").classList.add("fa-play");
        }
    }
    
    
    ///////////////////////////////////////////////////////////////////////////
    // Bouton PREV
    document.getElementById("prev").onclick = function() {
        sessionStorage.removeItem('curtime');
        stopAudio();
        firstTime=false;
        morceau-=1;
        if (morceau<1) {morceau = document.querySelectorAll('#playlist ul').length;}
        sessionStorage.setItem('morceau', morceau);
        last.classList.remove("active-pl");
        last = document.querySelectorAll('#playlist ul')[morceau-1];
        last.classList.add("active-pl");
        document.getElementById("play").classList.remove("fa-play");
        document.getElementById("play").classList.add("fa-pause");
        initAudio(last);
    }
    
    
    ///////////////////////////////////////////////////////////////////////////
    // Bouton NEXT
    document.getElementById("next").onclick = function() {
        sessionStorage.removeItem('curtime');    
        stopAudio();
        firstTime=false;
        morceau+=1;
        if (morceau>document.querySelectorAll('#playlist ul').length) {morceau = 1;}
        sessionStorage.setItem('morceau', morceau);    
        last.classList.remove("active-pl");
        last = document.querySelectorAll('#playlist ul')[morceau-1];
        last.classList.add("active-pl");
        document.getElementById("play").classList.remove("fa-play");
        document.getElementById("play").classList.add("fa-pause");
        initAudio(last);
    }
    
    
    ///////////////////////////////////////////////////////////////////////////
    // Barre de chargement, lecture
    var setpercent = function(e, percent, color) {
        setPrefixedValue(e, "background", "linear-gradient(left, "+color+" "+percent+"%, transparent 0%)");
    }
    
    
    ///////////////////////////////////////////////////////////////////////////
    // Click sur playlist
    pl= document.querySelectorAll('#playlist ul');
    for (var item in pl) {
        pl[item].onclick = function() {
            firstTime=false;
            last.classList.remove("active-pl");
            last = this;
            this.classList.add("active-pl");
            stopAudio();
            sessionStorage.removeItem('curtime');
            morceau = this.getElementsByTagName("li")[0].innerHTML;
            sessionStorage.setItem('morceau',morceau);
            initAudio(this);
            playlist_toggle();
        }
    }
    
    
    ///////////////////////////////////////////////////////////////////////////
    // Volume
    var vol_visible = true;
    
    var s = document.createElement('style'), r = document.querySelector('[type=range]');
        document.body.appendChild(s);
    
    r.addEventListener('input', function() {
        var val = this.value + '% 100%';
        sound_vol = this.value / 100;
        song.volume = sound_vol;
        sessionStorage.setItem('volume', sound_vol);
        s.textContent =
            'input[type=range]::-webkit-slider-runnable-track { background-size:' + val + '}' +
            'input[type=range]::-moz-range-track { background-size:' + val + '}';
    }, false);
    
    function show_vol() {
        vol_visible = true;
        document.getElementById("volume").style.display= "block";
    }
    function hide_vol() {
        vol_visible = false;
        document.getElementById("volume").style.display= "none";
    }   
    
    function vol_attach() {
        document.getElementById("btn-vol").addEventListener('mouseover', show_vol);
        document.getElementById("slider").addEventListener('mouseover', show_vol);
        document.getElementById("slider").addEventListener('mouseout', hide_vol);
        document.getElementById("clearer-g").addEventListener('mouseover', hide_vol);
        document.getElementById("clearer-d").addEventListener('mouseover', hide_vol);
    }
    
    function vol_detach() {
        document.getElementById("btn-vol").removeEventListener('mouseover', show_vol);
        document.getElementById("slider").removeEventListener('mouseover', show_vol);
        document.getElementById("slider").removeEventListener('mouseout', hide_vol);
        document.getElementById("clearer-g").removeEventListener('mouseover', hide_vol);
        document.getElementById("clearer-d").removeEventListener('mouseover', hide_vol);
    }
    
    document.getElementById("btn-vol").onclick = function() {
        volume_lock=!volume_lock;
        
        if (volume_lock) {
            this.classList.add('fa-rotate-270');
            vol_detach();        
        } else {
            this.classList.remove('fa-rotate-270');    
            vol_attach();
        }
        sessionStorage.setItem('volume_lock', volume_lock);
    }
    
    
    
    ///////////////////////////////////////////////////////////////////////////
    // Version Mini du lecteur
    function minify(value) {      
        if (playlist_visible) playlist_toggle();
    
        if (value !== undefined) {mini=value;}
        if (mini==false) {
            if (volume_lock) {hide_vol();}
            document.getElementById("prev").style.display="none";
            document.getElementById("next").style.display="none";
            document.getElementById("percent").style.display="none";
            document.getElementById("btn-vol").style.display="none";
            document.getElementById("clearer-g").style.display="none";
            document.getElementById("clearer-d").style.display="none";
            document.getElementById("togglepl").style.display="none";
            document.getElementById("cover").classList.add("mini");
            document.getElementById("player").style.background = "transparent";
            document.getElementById("caret").classList.remove("fa-caret-left");
            document.getElementById("caret").classList.add("fa-caret-right");
            document.getElementById("player").style.display="flex";
            sessionStorage.setItem('mini', 0);
            mini = true;
        } else {
            if (volume_lock) {show_vol();}        
            document.getElementById("prev").style.display="block";
            document.getElementById("next").style.display="block";
            document.getElementById("btn-vol").style.display="block";
            document.getElementById("clearer-g").style.display="block";
            document.getElementById("clearer-d").style.display="block";
            document.getElementById("cover").classList.remove("mini");
            document.getElementById("percent").style.display="flex";
            document.getElementById("togglepl").style.display="block";
            document.getElementById("player").style.background = "#000";
            document.getElementById("caret").classList.remove("fa-caret-right");
            document.getElementById("caret").classList.add("fa-caret-left");
            document.getElementById("player").style.display="flex";        
            sessionStorage.setItem('mini', 1);        
            mini = false;
        }
    }
    document.getElementById("caret").addEventListener('click', function() {minify();},false);
    
    
    ///////////////////////////////////////////////////////////////////////////
    // prefixes pour css
    function setPrefixedValue(elm, prop, value) {
        var prefixes = ['-moz-', '-webkit-', '-o-', '-ms-', '-khtml-'];
        var i, v, starting;
        // Clear
        elm.style[prop] = "";
        starting = elm.style[prop];
        // Try raw first
        try {
            elm.style[prop] = value;
            if (elm.style[prop] !== starting) {
                //console.log("No prefix");
                return;
            }
        }
        catch (e) {
        }
        // Try prefixes
        for (i = 0; i < prefixes.length; ++i) {
            v = prefixes[i] + value;
            try {
                elm.style[prop] = v;
                if (elm.style[prop] !== starting) {
                    //console.log("Prefix: " + prefixes[i]);
                    return;
                }
            }
            catch (e2) {
            }
        }
        //console.log("Didn't find prefix");
    }
        
    
    ///////////////////////////////////////////////////////////////////////////
    // Surcharge des MediaQueries CSS
    function check_screen() {
        
        if("matchMedia" in window) {
            if (window.matchMedia("(max-width:720px)").matches || window.matchMedia("(max-width:480px)").matches) {
                if (!mini) {
                    document.getElementById("prev").style.display="none";
                    document.getElementById("next").style.display="none";
                    document.getElementById("btn-vol").style.display="none";
                    document.getElementById("clearer-g").style.display="none";
                    document.getElementById("clearer-d").style.display="none";
                    document.getElementById("cover").classList.add("mini");
                } else {
                    document.getElementById("percent").style.display="flex";
                    document.getElementById("togglepl").style.display="block";
                    document.getElementById("player").style.background = "#000";
                }
                if (volume_lock) hide_vol();
            } else if (!mini) {
                document.getElementById("prev").style.display="block";
                document.getElementById("next").style.display="block";
                document.getElementById("btn-vol").style.display="block";
                document.getElementById("clearer-g").style.display="block";
                document.getElementById("clearer-d").style.display="block";
                document.getElementById("cover").classList.remove("mini");
                if (volume_lock) show_vol();
            } else {
                document.getElementById("percent").style.display="none";
                document.getElementById("togglepl").style.display="none";
                document.getElementById("player").style.background = "transparent";
            }   
        }
    }
    
    window.addEventListener('resize', check_screen);
    
    
    ///////////////////////////////////////////////////////////////////////////
    // Au Chargement de la page
    window.onload = function() {
        if (sessionStorage.getItem('mini')!=null) {
            minify(parseInt(sessionStorage.getItem('mini')));
        } else {minify(1);}
        
        if (sessionStorage.getItem('morceau')!=null) {
            morceau = parseInt(sessionStorage.getItem('morceau'));        
            last.classList.remove("active-pl");        
            last = document.querySelectorAll('#playlist ul')[morceau-1];
            last.classList.add("active-pl");
        }
        if (sessionStorage.getItem('volume')!=null) {
            sound_vol = parseFloat(sessionStorage.getItem('volume'));
            
            r.value = sound_vol * 100;
            var val = sound_vol * 100 + '% 100%';
            s.textContent =
            'input[type=range]::-webkit-slider-runnable-track { background-size:' + val + '}' +
            'input[type=range]::-moz-range-track { background-size:' + val + '}';
        }
        vol_attach();
        if (sessionStorage.getItem('volume_lock')!=null) {
            volume_lock = sessionStorage.getItem('volume_lock');
            btn = document.getElementById("btn-vol");
            if (volume_lock=='true') {
                show_vol();
                btn.classList.add('fa-rotate-270');
                vol_detach();        
            } else {
                hide_vol();
                btn.classList.remove('fa-rotate-270');
                vol_attach();
            }
        }
        check_screen();
        initAudio(last);
    }
    
});