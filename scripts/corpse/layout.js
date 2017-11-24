function Layout(host)
{
  Corpse.call(this,host);

  this.term = this.host.lexicon.find("Home") ; this.term.start();

  // Header
  this.hd.appendChild(this.h1 = document.createElement('h1'));
  this.hd.appendChild(this.photo = document.createElement('photo'));
  this.hd.appendChild(this.logo = document.createElement('a'));
  this.hd.appendChild(this.search = document.createElement('input'));
  // Body
  this.md.appendChild(this.md_wr = document.createElement('wr'));
  this.md_wr.appendChild(this.sb = document.createElement('sb'));
  this.md_wr.appendChild(this.m1 = document.createElement('m1'));
  this.md_wr.appendChild(this.m2 = document.createElement('m2'));
  // Footer
  this.fd.appendChild(this.fd_wr = document.createElement('wr'));

  this.search.addEventListener('keydown', function(event) {
    if(event.key === "Enter"){ invoke.vessel.corpse.validate(); }
  });

  this.start = function()
  {
    this.load(invoke.vessel.query());
    this.fd_wr.innerHTML = "<a href='' class='icon twitter'></a><a href='https://github.com/neauoire' class='icon github'></a><a href='Rotonde' class='icon rotonde'></a><a href='Nataniev' class='icon nataniev'></a><a href='Devine+lu+linvega'>Devine Lu Linvega</a> © 2006—2017<br/>BY-NC-SA 4.0<hr />";
  }

  this.load = function(key)
  {
    if(key.toLowerCase() == this.term.name.toLowerCase()){ return; }
    
    this.term = this.host.lexicon.find(key.replace(/\+/g," ")) ; this.term.start();

    window.scrollTo(0,0);
    window.location = "#"+key;

    document.title = this.term.name;

    this.search.setAttribute("placeholder",this.term.location())
    this.logo.setAttribute("href",this.term.parent ? this.term.parent.name : "Home")
    this.h1.innerHTML = this.term.bref;
    this.hd.className = this.term.theme();
    this.photo.style.backgroundImage = this.term.photo();
    this.m1.innerHTML = this.term.long;
    this.m2.innerHTML = this.term.view();
    this.sb.innerHTML = this.term.sidebar();
  }

  this.link = function(target)
  {
    var name = target.replace("/","").trim();

    // External
    if(target.indexOf("http") > -1){
      window.open(target,'_blank');
    }
    else{
      this.load(name)
    }
  }

  this.validate = function()
  {
    var name = this.search.value.replace("/","").trim();
    this.load(name);
    this.search.value = "";
    this.search.blur();
  }

  this.on_scroll = function()
  {
    var offset = document.body.scrollTop * 0.75;
    this.logo.style.top = parseInt(30 - offset)+"px";
    this.search.style.top = parseInt(60 - offset)+"px";
  }

  window.onclick = function(e){ if(e.target.localName == "a"){ e.preventDefault(); invoke.vessel.corpse.link(e.target.getAttribute("href"));} };
  window.onscroll = function(){ invoke.vessel.corpse.on_scroll(); };
}

invoke.vessel.seal("corpse","layout");