(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s);},$$=function(s,c){return [].slice.call((c||document).querySelectorAll(s));};
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var SRC='https://totem-experience.com/';

/* ouverture animée */
var body=document.body,intro=$('#intro');
function endIntro(){if(!body.classList.contains('intro-on'))return;body.classList.remove('intro-on');body.classList.add('intro-done');setTimeout(function(){intro.style.display='none';},900);}
if(reduce||sessionStorage.getItem('txIntro')){intro.style.display='none';body.classList.remove('intro-on');body.classList.add('intro-done');}
else{sessionStorage.setItem('txIntro','1');setTimeout(endIntro,2600);$('#skip').addEventListener('click',endIntro);}

/* en-tête, menu mobile, barre d'actions */
var top=$('#top'),dock=$('.dock'),burger=$('#burger');
function onScroll(){var y=window.scrollY;top.classList.toggle('solid',y>40);dock.classList.toggle('show',y>window.innerHeight*0.7);}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
burger.addEventListener('click',function(){var o=body.classList.toggle('menu-open');burger.setAttribute('aria-expanded',o);});
$$('#menu a').forEach(function(a){a.addEventListener('click',function(){body.classList.remove('menu-open');burger.setAttribute('aria-expanded','false');});});

/* diaporama du héros */
var slides=$$('.slide'),caps=['ADICOM Days, Abidjan','#MyChicAfrica, Air France et Accor Hôtels','Le public des ADICOM Days','Prise de parole aux ADICOM Days'];
var dots=$('#dots'),cap=$('#capTxt'),cur=0;
slides.forEach(function(_,i){var d=document.createElement('i');if(!i)d.className='on';dots.appendChild(d);});
var ds=[].slice.call(dots.children);
function go(n){slides[cur].classList.remove('on');ds[cur].classList.remove('on');cur=n;slides[cur].classList.add('on');ds[cur].classList.add('on');cap.textContent=caps[cur];}
if(!reduce)setInterval(function(){go((cur+1)%slides.length);},5200);

/* réalisations : contenus repris des pages cas de totem-experience.com */
var C=[
 {p:'agency',img:'c-glovo',tag:'Campagne d\u2019influence',t:'Glovo, l\u2019application adoptée à Abidjan',s:'Une quinzaine d\u2019influenceurs',
  ctx:'Spécialiste de la livraison à la demande nouvellement implanté en Côte d\u2019Ivoire, Glovo avait besoin d\u2019une campagne digitale capable de faire adopter son application par une audience large et diverse, en particulier la jeunesse ivoirienne.',
  pro:'Une quinzaine d\u2019influenceurs qui incarnent la jeunesse connectée de Côte d\u2019Ivoire ont promu l\u2019application : stories avec les livreurs Glovo, codes promo et messages clés de la marque.',url:'glovo/',w:1},
 {p:'factory',img:'c-om',tag:'Brand content',t:'#MaFemmeAfricaine avec Orange Money',s:'Plus de 22 000 réactions',
  ctx:'Deux campagnes pour Orange Money : #AmoureuxdAfrique pour la Saint-Valentin, et #MaFemmeAfricaine pour la journée internationale de la femme.',
  pro:'Un shooting photo avec des interviews de femmes noires, diffusé sur la page Facebook du média partenaire NOFI puis rendu viral par le Totem Influence Network : plus de 22 000 réactions. Pour #AmoureuxdAfrique, une vidéo virale produite par nos soins et un jeu.',url:'amoureuxdafrique-mafemmeafricaine-orange-money/'},
 {p:'agency',img:'c-mychic',tag:'Stratégie et influence',t:'#MyChicAfrica avec Air France et Accor Hôtels',s:'Une « french touch » à l\u2019africaine',
  ctx:'Air France et Accor Hôtels ont voulu s\u2019associer pour mettre en valeur leur positionnement chic, audacieux et raffiné auprès d\u2019une nouvelle génération de jeunes Africains connectés.',
  pro:'Un panel d\u2019influenceurs panafricains, un guide voyage d\u2019une Afrique chic publié sur le compte Instagram MyChicAfrica, puis le hashtag #MyChicAfrica et un jeu-concours pour le rendre viral.',url:'mychicafrica-air-france-accor-hotels/',w:1},
 {p:'factory',img:'c-auquartier',tag:'Web-série',t:'#AuQuartier avec Canal+',s:'Les « experts amateurs » du football',
  ctx:'Canal+ cherchait un moyen de valoriser les programmes de football de ses chaînes et de retranscrire les expériences de son audience autour du football.',
  pro:'Une web-série originale dans l\u2019univers des débats de quartier, avant, pendant et après le match. Veille, casting, production et diffusion via le Totem Influence Network. Deux saisons.',url:'auquartier-avec-canal/',w:1},
 {p:'factory',img:'c-ivoire',tag:'Web-série',t:'#AffairedeWeekend avec la bière Ivoire',s:'Lancement d\u2019une marque',
  ctx:'Pour son lancement sur le marché de la bière en Côte d\u2019Ivoire, la marque Ivoire souhaitait faire connaître et adopter son produit par les Ivoiriens.',
  pro:'La web-série « Affaire de Week-end », les aventures d\u2019une bande d\u2019amis, proposée, produite et diffusée via le Totem Influence Network, avec une veille concurrentielle et l\u2019identification des influences du web ivoirien.',url:'ivoire/'},
 {p:'agency',img:'c-sg2',tag:'Marque employeur',t:'#JeDécrocheLeJobSG, Société Générale',s:'Challenge et influenceurs',
  ctx:'Le continent regorge de talents et la compétition pour les attirer est forte : la Société Générale voulait développer son image de marque employeur par le digital.',
  pro:'Le challenge #JeDécrocheLeJobSG pour inciter les passionnés du digital à postuler, une vidéo de présentation boostée par des influenceurs et des visuels tirés de la vidéo sur les réseaux sociaux.',url:'societe-generale-promotion/'},
 {p:'factory',img:'c-sg',tag:'Vidéo et affichage',t:'Campagne Connect, Société Générale Sénégal',s:'Faire télécharger l\u2019application',
  ctx:'Dans un marché de la banque digitale de plus en plus concurrentiel, la Société Générale souhaitait faire connaître et différencier son application mobile.',
  pro:'La production d\u2019une vidéo illustrant les bénéfices de l\u2019application avec des ambassadeurs, déclinée en visuels pour une campagne d\u2019affichage online et offline.',url:'societe-generale-promotion/'},
 {p:'factory',img:'c-geek',tag:'Web-série',t:'#AfricanGeek pour Objis',s:'Six épisodes avec Dycosh',
  ctx:'Bousculer avec humour les idées reçues sur l\u2019informatique, tout en proposant aux jeunes Africains d\u2019être acteurs de la transformation digitale du continent.',
  pro:'Une web-série mensuelle avec le comédien Dycosh : « Rêve de footballeur », « Transfert d\u2019argent », « Le rêve africain », « Rêve de styliste », « Le prof d\u2019informatique », « Le marabout connecté ».',url:'africangeek-web-serie-objis/',w:1},
 {p:'adicom',img:'a-10e',tag:'Événement',t:'ADICOM Days, 10e édition',s:'Abidjan, 16 et 17 avril 2026',
  ctx:'Créateurs, marques, entrepreneurs, experts : les acteurs du digital africain réunis au même endroit pendant deux jours.',
  pro:'Des échanges forts, des connexions stratégiques, et des intervenants qui transmettent leur expérience et leur méthode sans filtre, directement sur scène.',src:'https://adicom-days.com/'},
 {p:'adicom',img:'a-foule',tag:'Communauté',t:'500 à 1 000 professionnels chaque année',s:'Africa Digital Community',
  ctx:'Totem Experience a créé ADICOM (Africa Digital Community), dont l\u2019événement phare réunit chaque année les acteurs influents du digital business africain.',
  pro:'Dix éditions, un réseau panafricain de créateurs, de marques et d\u2019experts, et un rendez-vous attendu par tout l\u2019écosystème.',src:SRC+'totem-experience-investit-dans-les-talents-qui-faconneront-la-communication-le-marketing-digital-africain-louverture-dun-nouveau-chapitre/'}
];
var POLE={agency:['Agency','y'],factory:['Factory','r'],adicom:['ADICOM','v']};
var grid=$('#cards'),h='';
C.forEach(function(c,i){h+='<button type="button" class="card rv'+(c.w?' wide':'')+'" data-c="'+c.p+'" data-i="'+i+'"><img src="img/p/'+c.img+'.jpg" alt="'+c.t.replace(/"/g,'')+'" loading="lazy"><span class="pole-tag '+POLE[c.p][1]+'">'+POLE[c.p][0]+'</span><span class="card-in"><small>'+c.tag+'</small><b>'+c.t+'</b><em>'+c.s+'</em></span><span class="arr">↗</span></button>';});
grid.innerHTML=h;

/* filtres */
var fb=$$('.filters button'),cards=$$('.card',grid);
function filt(f){fb.forEach(function(x){var on=x.dataset.f===f;x.classList.toggle('on',on);x.setAttribute('aria-selected',on);});
 cards.forEach(function(c){var ok=f==='tout'||c.dataset.c===f;c.classList.toggle('hide',!ok);if(ok)c.classList.add('in');});
 grid.classList.toggle('filtered',f!=='tout');}
fb.forEach(function(b){b.addEventListener('click',function(){filt(b.dataset.f);});});
$$('[data-go]').forEach(function(a){a.addEventListener('click',function(){filt(a.dataset.go);});});

/* fenêtre de détail */
var modal=$('#modal'),box=$('#modalBox');
function open(html,cls){box.innerHTML=html;modal.className='modal on '+(cls||'');body.classList.add('noscroll');}
function close(){modal.className='modal';box.innerHTML='';body.classList.remove('noscroll');}
$('#modalX').addEventListener('click',close);modal.addEventListener('click',function(e){if(e.target===modal)close();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
cards.forEach(function(el){el.addEventListener('click',function(){var c=C[+el.dataset.i],u=c.src||SRC+c.url;
 open('<img src="img/p/'+c.img+'.jpg" alt=""><div class="m-txt"><span class="pole-tag '+POLE[c.p][1]+'">'+POLE[c.p][0]+'</span><small>'+c.tag+'</small><h3>'+c.t+'</h3><h4>Le besoin</h4><p>'+c.ctx+'</p><h4>Notre proposition</h4><p>'+c.pro+'</p><a class="pill pill-lime" href="'+u+'" target="_blank" rel="noopener">Lire le cas complet ↗</a></div>','case');});});
$('#playReel').addEventListener('click',function(){open('<div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/nHhXSloLegg?autoplay=1&rel=0" title="Best of Totem Experience" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>','video');});

/* logos clients (repris de la page d'accueil de totem-experience.com) */
var L=[['client1','Accor Hôtels'],['client2','Air France'],['total-2','Total'],['client4','Axe'],['client5','Canal+'],['client6','CFAO'],['client7','Club Africa'],['client8','Dove'],['coca','Coca-Cola'],['client10','Heineken'],['client11','Ivoire'],['infinix','Infinix'],['client13','Nollywood Week'],['client14','Objis'],['client15','Orange'],
 ['client16','Orange Money'],['client17','Société Générale'],['glovo','Glovo'],['client19','TV5 Monde'],['client3','Afrik\u2019n\u2019fusion'],['client9','ECAir'],['client20','Unilever'],['pernod','Pernod Ricard'],['client12','Nollywood TV'],['client18','Thema'],['kiabi','Kiabi'],['campus-fr','Campus France'],['cosmos','Cosmos Yopougon'],['CIE','CIE'],['asus','Asus']];
function fill(t,arr){var s='';arr.concat(arr).forEach(function(l){s+='<div class="logo"><img src="img/c/'+l[0]+'.png" alt="'+l[1]+'" loading="lazy"></div>';});t.innerHTML=s;}
fill($('#t1'),L.slice(0,15));fill($('#t2'),L.slice(15));

/* révélation au défilement et compteurs */
function count(el){var n=+el.dataset.n,s=el.dataset.s||'',t0=null;if(reduce){el.textContent=n+s;return;}
 function f(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-k,3);el.textContent=Math.round(n*e)+s;if(k<1)requestAnimationFrame(f);}requestAnimationFrame(f);}
var rv=$$('.rv');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');var b=$('b[data-n]',e.target);if(b)count(b);io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});rv.forEach(function(el){io.observe(el);});}
else rv.forEach(function(el){el.classList.add('in');});

/* témoignages */
var qs=$$('#quotes blockquote'),qd=$('#qdots'),qi=0;
qs.forEach(function(_,i){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Témoignage '+(i+1));if(!i)b.className='on';b.addEventListener('click',function(){q(i);});qd.appendChild(b);});
function q(n){qs[qi].classList.remove('on');qd.children[qi].classList.remove('on');qi=n;qs[qi].classList.add('on');qd.children[qi].classList.add('on');}
if(!reduce)setInterval(function(){q((qi+1)%qs.length);},6500);

/* contact en trois questions, vers WhatsApp ou e-mail */
var step=1,steps=$$('.step'),bar=$('#bar'),stepN=$('#stepN'),next=$('#next'),back=$('#back'),hint=$('#hint'),send=$('#send'),val={};
$$('.chips').forEach(function(g){g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;$$('button',g).forEach(function(x){x.classList.remove('on');});b.classList.add('on');val[g.dataset.name]=b.textContent;hint.textContent='';if(step<3)setTimeout(function(){step++;show();},260);else show();});});
function show(){steps.forEach(function(s){s.classList.toggle('on',+s.dataset.s===step);});bar.style.width=(step/3*100)+'%';stepN.textContent='Question '+step+' sur 3';back.classList.toggle('show',step>1);
 var fin=step===3&&val.quand;next.style.display=fin?'none':'';send.classList.toggle('show',!!fin);}
function msg(){var nom=$('#nom').value.trim();return 'Bonjour Totem Experience,\n\nJe suis : '+val.profil+'\nMon besoin : '+val.besoin+'\nCalendrier : '+val.quand+(nom?'\n\n'+nom:'')+'\n\nMerci de me recontacter.';}
next.addEventListener('click',function(){var k=['profil','besoin','quand'][step-1];if(!val[k]){hint.textContent='Choisissez une réponse pour continuer.';return;}if(step<3){step++;show();}});
back.addEventListener('click',function(){if(step>1){step--;show();}});
$('#sendWa').addEventListener('click',function(){window.open('https://wa.me/2250798689078?text='+encodeURIComponent(msg()),'_blank','noopener');hint.textContent='WhatsApp s\u2019ouvre avec votre demande déjà rédigée.';});
$('#sendMail').addEventListener('click',function(){location.href='mailto:contact@totem-experience.com?subject='+encodeURIComponent('Nouveau projet : '+val.besoin)+'&body='+encodeURIComponent(msg());hint.textContent='Votre messagerie s\u2019ouvre avec la demande déjà rédigée.';});
show();
})();
