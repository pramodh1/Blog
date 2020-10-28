//Code - Tim Tesner - Early 2017, and 2018 - more coding and additions in March 2019
focus();

if (window.DeviceOrientationEvent) {
 console.clear();
  console.log("DeviceOrientation is supported");
}//Mobile Device ship steering by tilting screen - wip

base_url='https://TimT-code.github.io/StarFight';

space_view=document.createElement('img');
document.body.appendChild(space_view);
var space_view_array=[
  '29.jpg',
  'Beautiful-Outer-Space-Background.jpg',
  'space_galaxy_saturn_planet_94330_3840x2160.jpg',
  'blue-space-desktop-background.jpg',
  'Beautiful-Space-HD-Light-Picture-8415.jpg',
  'earth-from-space-uhd-wallpaper_1_2048x1152.jpg',
  'SPACE-FULL-HD-WALLPAPER-151.jpg',
  'd8118677c75ad205f10fb139c312566d.jpg',
  'space-wallpaper-screensaver-earth-background-desktop-planets-wallpapers-twilight.jpg'
];

var space_view_rnd = base_url + '/Images/Backgrounds/' + space_view_array[Math.floor(Math.random()*space_view_array.length)];
space_view.src=space_view_rnd;
space_view.style.cssText='position:absolute;top:-1500px;left:-2400px;z-index:-1;width:5000px;height:3000px';
console.log('Space View: '+space_view_rnd);


//new main div ship will be in here - not cockpit img
view_div=document.createElement('div');
document.body.appendChild(view_div);
//view_div.style.backgroundColor='black';
view_div.style.cssText='position:absolute;top:0;left:0;z-index:1;width:100%;height:100%';
//overlay div that will contain overlay_ship
view_overlay_div=document.createElement('div');
document.body.appendChild(view_overlay_div);
//view_overlay_div.style.backgroundColor='white';//to check alignment visually
view_overlay_div.style.cssText='position:absolute;top:0;left:0;z-index:7;width:100%;height:100%;opacity:0;filter:alpha(opacity=0)';


bg=document.createElement('img');//spaceship cockpit
document.body.appendChild(bg);
//view_div.appendChild(bg);
var bg_array=[
  'cockpit.gif',
  '140507_diamondback_cockpit.png',
  'bscockpit24.png',
  'Copperhead_cockpit.png',
  'Cockpit_infiltrator.png',
  'CockpitFullHD.png',
  'cockpit-transpLG6.png',
  'Copperhead_cockpit-2.png'
  ];
var bg_rnd = bg_array[Math.floor(Math.random()*bg_array.length)];//random background
bg.src=base_url + '/Images/Cockpits/' + bg_rnd;
bg.className='bg_class';
bg.style.cssText='margin:0;width:100%;height:100%;position:absolute;top:0;left:0;z-index:6';
console.log('Cockpit: '+bg_rnd);


function build_ship(){//by making the ship build inside a function, and the launching after the function, could relaunch a new ship later after explosion with calling function again.
  ship=document.createElement('img');//make sure "ship" is global scope
  view_div.appendChild(ship);//needs to be inside its own transparent div for movement vs all else - which is mirrored by an exact transparent div and transparent ship, 4 or so zIndexes above the visible ship - Needs this stack because ship needs to look like its underneath other layers like explosions,bullets,cockpit etc.
  var ship_array=[//Only Transparent gifs/pics
    {ship_src:'star-trek-y-viaje-a-las-estrellas-imagen-animada-0010.gif',ship_hp:300},
    {ship_src:'star-trek-4.gif',ship_hp:200},
    {ship_src:'anigalaxy.gif',ship_hp:250},
    {ship_src:'bewegende-animatie-starwars-678266.gif',ship_hp:400},
    {ship_src:'bewegende-animatie-starwars-677601.gif',ship_hp:125},
    {ship_src:'bewegende-animatie-starwars-678171.gif',ship_hp:500},
    {ship_src:'bewegende-animatie-starwars-405559.gif',ship_hp:225},
    {ship_src:'Cohete-Chico.gif',ship_hp:175},
    {ship_src:'Darkcrab2cn0.gif',ship_hp:325},
    {ship_src:'ZtcAyEv.gif',ship_hp:240},
    {ship_src:'animated-spaceship-image-0014.gif',ship_hp:340},
    {ship_src:'animated-spaceship-image-0022.gif',ship_hp:240},
    {ship_src:'animated-spaceship-image-0037.gif',ship_hp:440},
    {ship_src:'animated-spaceship-image-0045.gif',ship_hp:200},
    {ship_src:'animated-spaceship-image-0051.gif',ship_hp:640},
    {ship_src:'animated-spaceship-image-0052.gif',ship_hp:540},
    {ship_src:'animated-spaceship-image-0055.gif',ship_hp:440},
    {ship_src:'animated-spaceship-image-0056.gif',ship_hp:600},
    {ship_src:'animated-spaceship-image-0057.gif',ship_hp:300},
    {ship_src:'tumblr_miqtxf3WNW1r3ykkbo1_250.gif',ship_hp:450}
  ];
  var ship_rnd = ship_array[Math.floor(Math.random()*ship_array.length)];//random ship
  ship.src=base_url + '/Images/Ships/' + ship_rnd.ship_src;
  ship.className='img_class_1';
  ship.style.cssText='position:absolute;top:30px;left:30px;z-index:2';
  //document.body.onclick=bullet_maker;
  //view_div.onclick=bullet_maker;
  document.body.onclick=audio1_func;/*firing sounds within the body element only*/
  console.log('Ship src: '+ship.src);
  console.log('Ship hp: '+ship_rnd.ship_hp);
  full_enemy_hp=enemy_hp=ship_rnd.ship_hp;
  
  ship_overlay=document.createElement('img');//build overlay ship at a different higher zIndex - make sure "ship" is global scope
//document.body.appendChild(ship_overlay);
  view_overlay_div.appendChild(ship_overlay);
  ship_overlay.src=base_url + '/Images/Ships/' + ship_rnd.ship_src;//same as ship1
  ship_overlay.className='img_overlay_class_1';
  ship_overlay.style.cssText='position:absolute;top:30px;left:30px;z-index:8';
  //ship_overlay.style.opacity='0.6';
  //ship_overlay.style.filter='alpha(opacity=0.6)';
  //ship_overlay.style.border='2px solid red';
  //ship_overlay.onmouseover=function(){ship_overlay.style.border='2px solid purple';};
  ship_overlay.onclick=explosion_gif;//make an explosion only if certain things happen
}
build_ship();//Build 1st iteration of ship, and later when it explodes it will regenerate etc


//a1 - firing sound
var audio1 = document.createElement('audio');
document.body.appendChild(audio1);
audio1.controls = false;
audio1.id = 'audio1_id';
var source1 = document.createElement('source');
source1.type = 'audio/mpeg';
source1.src = base_url + '/Audio/Firing/' + 'sound36.mp3';
audio1.appendChild(source1);

//a1b - firing sound-B - doubles the audio polyphony if audio1 is busy playing on click
var audio1b = document.createElement('audio');
document.body.appendChild(audio1b);
audio1b.controls = false;
audio1b.id = 'audio1b_id';
var source1b = document.createElement('source');
source1b.type = 'audio/mpeg';
source1b.src = base_url + '/Audio/Firing/' + 'sound36.mp3';
audio1b.appendChild(source1b);

//a1c - firing sound-C - triples the audio polyphony if audio1 is busy playing on click
var audio1c = document.createElement('audio');
document.body.appendChild(audio1c);
audio1c.controls = false;
audio1c.id = 'audio1c_id';
var source1c = document.createElement('source');
source1c.type = 'audio/mpeg';
source1c.src = base_url + '/Audio/Firing/' + 'blaster-firing.mp3';//star wars firing sound to make auxillary firing sounds
audio1c.appendChild(source1c);

//a2 - explosion sound
var audio2 = document.createElement('audio');
document.body.appendChild(audio2);
audio2.controls = false;
audio2.id = 'audio2_id';
var source2 = document.createElement('source');
source2.type = 'audio/mpeg';

function make_exp_snd(){
  var exp_snd_array=[
    'BAZOOKA+1.mp3',
    'bazooka+2.mp3',
    'Torpedo+Explosion.mp3',
    'Explosion+10.mp3',
    'Explosion+9.mp3',
    'Explosion+8.mp3',
    'Explosion+7.mp3',
    'Explosion+6.mp3',
    'Explosion+5.mp3',
    'Explosion+3.mp3',
    'Bomb+2.mp3',
    'Artillery+2.mp3',
    'Gun+1.mp3',
    'Grenade+3.mp3',
    '15%20-%20Explosion.mp3',
    'Long%20Zap.mp3',
    'HW3-sfx-explosion.mp3',
    'Small%20Fiery%20Explosion.mp3',
    'Explode-eRco_Inc-7833_hifi.mp3',
    'largeexplosion1.mp3',
    'largeexplosion2.mp3',
    'largeexplosion3.mp3',
    'largeexplosion4.mp3',
    'smallexplosion1.mp3',
    'smallexplosion2.mp3',
    'smallexplosion3.mp3'    
  ];
  var exp_snd_rnd = base_url + '/Audio/Explosions/' + exp_snd_array[Math.floor(Math.random()*exp_snd_array.length)];
  return exp_snd_rnd;
}
source2.src=make_exp_snd();//gets src from the return of the function
audio2.appendChild(source2);

//a3 - Greeting Audio -- no need for a function to launch this since it is autoplay
var audio3 = document.createElement('audio');
document.body.appendChild(audio3);
audio3.controls = false;
//audio3.autoplay = true;//comment this out to have same functionality as mobile/phone version which at time of coding won't let autoplay work without user interaction first, which for this game is to click on body/view of space
audio3.id = 'audio3_id';
var source3 = document.createElement('source');
source3.type = 'audio/mpeg';
var greeting_snd_array=[
  'tng-locutus-urlifeisover.mp3',
  'wickedlaugh1.mp3',
  'deeplaugh.mp3',
  'wickedwitchlaugh.mp3',
  'evilaugh.mp3',
  'jabba-the-hutt-laughing.mp3',
  'Long%20Muahahaha.mp3',
  'evil%20laugh.mp3',
  'monster.mp3',
  'Makuta%27s%20Evil%20Laugh.mp3',
  'The%20Outer%20Limits.mp3'
  ];
var greeting_snd_rnd = base_url + '/Audio/Greetings/' + greeting_snd_array[Math.floor(Math.random()*greeting_snd_array.length)];
source3.src=greeting_snd_rnd;
audio3.appendChild(source3);

//a4 - bg music Audio -- no need for a function to launch this since it is autoplay
var audio4 = document.createElement('audio');
document.body.appendChild(audio4);
audio4.controls = false;
//audio4.autoplay = true;//comment out to match mobile/phone version
audio4.id = 'audio4_id';
var source4 = document.createElement('source');
source4.type = 'audio/mpeg';
var bg_snd_array=[
  'dramatic.mp3',
  'Perpetual%20Motion.mp3',
  'Scanners.mp3',
  'Stargate%20SG1%20-%20Title%20Theme.mp3',
  'Star%20Wars%20IV%20-%20Cantina%20Band.mp3',
  'Star%20Wars%20I%20-%20Star%20Wars%20Main%20Title%20And%20The%20Arrival%20At%20Naboo.mp3',
  'Superman%20-%20Main%20Title.mp3',
  'ET-FlyingTheme.mp3',
  'Clint%20Mansell%20-%20Requiem%20for%20a%20Dream%20Remix.mp3',
  'sound%20effects%20-%2070%27s%20Porn%20Music.mp3'
  ];
var bg_snd_rnd = base_url + '/Audio/Background-Music/' + bg_snd_array[Math.floor(Math.random()*bg_snd_array.length)];
source4.src=bg_snd_rnd;
audio4.appendChild(source4);

//a5 - Zoom_out sound
var audio5 = document.createElement('audio');
document.body.appendChild(audio5);
audio5.controls = false;
audio5.id = 'audio5_id';
var source5 = document.createElement('source');
source5.type = 'audio/mpeg';
source5.src = base_url + '/Audio/FX/' + 'Vehicle%20flying%201.mp3';
audio5.appendChild(source5);

//a6 - Zoom_in sound
var audio6 = document.createElement('audio');
document.body.appendChild(audio6);
audio6.controls = false;
audio6.id = 'audio6_id';
var source6 = document.createElement('source');
source6.type = 'audio/mpeg';
source6.src = base_url + '/Audio/FX/' + 'Vehicle%20flying%202.mp3';
audio6.appendChild(source6);

//a7 - perfect/bonus sounds
var audio7 = document.createElement('audio');
document.body.appendChild(audio7);
audio7.controls = false;
audio7.id = 'audio7_id';
var source7 = document.createElement('source');
source7.type = 'audio/mpeg';
function make_perfect_bonus_sound(){
  var perfect_combo_sound_array=[
    'R2D2-yeah.mp3',
    'R2D2.mp3',
    'chewy_roar.mp3',
    'force.mp3'
  ];  
  var rand_perfect_combo_sound = base_url + '/Audio/FX/' + perfect_combo_sound_array[Math.floor(Math.random()*perfect_combo_sound_array.length)];
  
  return rand_perfect_combo_sound;
}
source7.src = make_perfect_bonus_sound();
audio7.appendChild(source7);

//a8a - Hitsounds-A
var audio8a = document.createElement('audio');
document.body.appendChild(audio8a);
audio8a.controls = false;
audio8a.id = 'audio8a_id';
var source8a = document.createElement('source');
source8a.type = 'audio/mpeg';
source8a.src = base_url + '/Audio/Firing/' + 'hitsound.mp3';
audio8a.appendChild(source8a);

//a8b - Hitsounds-B
var audio8b = document.createElement('audio');
document.body.appendChild(audio8b);
audio8b.controls = false;
audio8b.id = 'audio8b_id';
var source8b = document.createElement('source');
source8b.type = 'audio/mpeg';
source8b.src = base_url + '/Audio/Firing/' + 'hitsound.mp3';
audio8b.appendChild(source8b);

//a8c - Hitsounds-C
var audio8c = document.createElement('audio');
document.body.appendChild(audio8c);
audio8c.controls = false;
audio8c.id = 'audio8c_id';
var source8c = document.createElement('source');
source8c.type = 'audio/mpeg';
source8c.src = base_url + '/Audio/Firing/' + 'hitsound.mp3';
audio8c.appendChild(source8c);

//globals
var 
    score=0,//current score - No High Score yet because game doesn't end. Eventually I'll have to think of how to build the code to run again, and save the high score without resetting everything.
    enemy_dmg_rate=50,//hp taken off from each shot - in the future..this could change with a different weapon used
    full_enemy_hp,//HP specs
    enemy_hp,//HP current
    enemy_hits=0,//determines bonus/sounds
    enemy_misses=0,
    my_hp;//not used yet

function make_exp_gif(){
  var expArray = [//time till gone numbers setting may need adjusting for some explosions
    {exp_src:'Ws1o.gif',time_till_gone:400},
    {exp_src:'ZVxa.gif',time_till_gone:100},
    //{exp_src:'d7ac4f38b77abe73165d85edf2cbdb9e_w200.gif',time_till_gone:800},
    {exp_src:'explode.gif',time_till_gone:400},
    {exp_src:'explosion-1.gif',time_till_gone:500},
    {exp_src:'explosion.gif',time_till_gone:800},
    {exp_src:'explosion-gif-animado-6.gif',time_till_gone:500},
    {exp_src:'explosion-gif-transparent-10.gif',time_till_gone:800},
    {exp_src:'explosion-gif-transparent-13.gif',time_till_gone:1000},
    //{exp_src:'explosion-gif-transparent-background-10.gif',time_till_gone:500},
    //{exp_src:'medium-spark.gif',time_till_gone:300},
    //{exp_src:'small-spark.gif',time_till_gone:200},
    {exp_src:'1092fa7d42c7db063aaf5f1d517b1692.gif',time_till_gone:900},
    {exp_src:'tumblr_msta67lgeE1rmdrjqo1_400.gif',time_till_gone:1800},
    {exp_src:'Animated-clip-art-picture-of-black-inferno-fire-flames.gif',time_till_gone:800},
    {exp_src:'tumblr_md72r6Ui8d1ri9266o1_250.gif',time_till_gone:900},
    {exp_src:'KTjpXk5Gc.gif',time_till_gone:700},
    {exp_src:'Explosion2.gif',time_till_gone:700},
    {exp_src:'explosion_ball.gif',time_till_gone:1500},
    {exp_src:'explosion_animation_preview.gif',time_till_gone:650},
    {exp_src:'blowup.gif',time_till_gone:850},
    {exp_src:'explosion4.gif',time_till_gone:700}
 ];
  var rand_explosion = expArray[Math.floor(Math.random()*expArray.length)];
  //var rand_explosion_with_timer = rand_explosion.time_till_gone;
  return rand_explosion;
}

var 
    expl_gif=document.createElement('img'),
    expl_gif_beginning_width='320',//use as a reset later
    expl_gif_beginning_height='320',//use as a reset later
    expl_gif_width='320',
    expl_gif_height='320',
    expl_gif_timer='off';//unused

function explosion_gif(){//Function launches upon click of target
  //Only transparent explosions!
  //*Black background is what I started with when either a transparent gif, or a Black background gif would of worked on a blank black background.
  /* Scoring & Bonus Logic */
  shotz_size='40';//Larger sized shots when enemies are hit
  audio8_func();//firing hit sounds
  shots_counter-=1;
  enemy_misses-=1;//counter the automatic +1 that the shot makes first
  if(enemy_hp>0){
    enemy_hits+=1;
    shots_counter+=1;
    console.log('enemy_hits: '+enemy_hits);
    //console.log('Shots Taken1: '+shots_counter);
    enemy_hp-=enemy_dmg_rate;
    console.log('enemy_hp: '+enemy_hp);
    if(enemy_misses>0){
      console.log('enemy misses: '+enemy_misses);
    }
  }
  
  if(enemy_hp<=0){
    shots_counter+=1;
    if(enemy_misses===0){
      make_perfect_bonus_sound();
      document.getElementById('audio7_id').src=make_perfect_bonus_sound();
      audio7_func();//play sound already made randomly
      console.log('perfect: Shots Counter: '+shots_counter+' - Shot Misses: '+enemy_misses);
    }
    //enemy_hp=0;//reset - maybe not needed
    enemy_hits=0;//reset
    enemy_misses=0;
    shots_counter=0;//reset after explosion
    shot_init=0;//set variable to mean nothing fired yet
  view_div.removeChild(ship);
  view_overlay_div.removeChild(ship_overlay);
  var cursor_x=event.clientX;
  var cursor_y=event.clientY;
  //var exp_gif=document.createElement('img');
  exp_gif=expl_gif;//bring in variable from outside
    document.body.appendChild(exp_gif);
    //view_div.appendChild(exp_gif);
    exp_gif.className='exp_gif_class';
    exp_gif.id='exp_gif_id';
    exp_gif.style.zIndex='4';
    exp_gif.style.width=expl_gif_width+'px';//bring in variable from outside
    exp_gif.style.height=expl_gif_height+'px';//bring in variable from outside
    exp_gif.style.position='absolute';
    exp_gif.style.left=cursor_x-/* 160 */exp_gif.width/2+'px';//move back half of explosion width to center on crosshair
    exp_gif.style.top=cursor_y-/* 160 */exp_gif.height/2+'px';//move back half of explosion height to center on crosshair
    
    make_exp_gif();//Run the function to create a new explosion image src
    var explo_gif=make_exp_gif();//transfer the result/return of running the function to this variable.
  
  exp_gif.src=base_url + '/Images/Explosions/' + explo_gif.exp_src;//look for src from expl_gif after function makes it - above outside function
  make_exp_snd();//make new explosion sound from the return of the function
  document.getElementById('audio2_id').src=make_exp_snd();//change to new explosion sound src of returned variable
  expl_gif_timer='on';//unused
    
  score_add();
  
  setTimeout(function(){
    document.body.removeChild(window.exp_gif);
    expl_gif_width=expl_gif_beginning_width;console.log('reset exp width to:'+expl_gif_width+'px');//reset
    expl_gif_height=expl_gif_beginning_height;console.log('reset exp height to:'+expl_gif_height+'px');//reset
    expl_gif_timer='off';//unused
    var explo_gif=make_exp_gif();//run new random pick of gif after getting rid of old explosion source data
  },explo_gif.time_till_gone);/*make gif disappear at a precise time to keep from looping*/
  
  audio2_func();
    
  setTimeout(function(){build_ship();},3000);//launch another ship 3 seconds after it's destruction
  console.log('Explosion Pic: '+exp_gif.src);
  console.log('Explosion Timer: '+explo_gif.time_till_gone);
  console.log('Explosion Sound: '+make_exp_snd());
  console.log('Explosion Width: '+exp_gif.style.width);
  console.log('Explosion Height: '+exp_gif.style.height);
}
}

function audio1_func() {/*shot - multi polyphony */
  if(audio1_id.paused || !audio1_id.currentTime){//check if paused or started playing yet
    document.getElementById('audio1_id').play();
    console.log('shot sound 1-audio1_func()');
  }else if(audio1b_id.paused || !audio1b_id.currentTime){
    document.getElementById('audio1b_id').play();
    console.log('shot sound 2-audio1_func()');
    }else{
      document.getElementById('audio1c_id').play();
      console.log('shot sound 3-audio1_func()');
    }
  
  //Start audio3 and audio4 functions only if paused or not playing yet - Needed because Android/phone audio autoplay is nerfed on chrome version to not play until a user action even if autoplay=true for those audio elements.For desktop the audio3 and audio4 will automatically play
  if (typeof run_once !== "undefined")run_once();//play audio3 and audio4 Once at first fire, when you click body, and then set "run_once" to undefined to not reuse audio3 and audio4 function included with shot sound everytime you shoot.  
  bullet_maker();
}

var run_once = function(){
     run_once = function(){}; // kill function after launch by setting it to outer function name;
     play_on_start();//play audio3 and audio4 only once
    run_once=undefined;//throws error if you try to call it again, and just added code to check if run_once is now undefined before trying to launch function
  };

function audio2_func(){/*explosions*/document.getElementById('audio2_id').play();}
function audio3_func(){/*greetings*/document.getElementById('audio3_id').play();}
function audio4_func(){/*bg music sounds*/document.getElementById('audio4_id').play();}
function audio5_func(){/*zoom_out*/document.getElementById('audio5_id').play();}
function audio6_func(){/*zoom_in*/document.getElementById('audio6_id').play();}
function audio7_func(){/*perfect/bonus*/document.getElementById('audio7_id').play();}
function audio8_func(){/*firing hit sounds-triple polyphony*/
    if(audio8a_id.paused || !audio8a_id.currentTime){//check if paused or started playing yet
      document.getElementById('audio8a_id').play();
      console.log('hitsound1');
    }else if(audio8b_id.paused || !audio8b_id.currentTime){//play #2 instead when busy
        document.getElementById('audio8b_id').play();
        //audio8b_func();
        console.log('hitsound2');
      }else{//play #3 if both #1 and #2 audio sources are busy
        document.getElementById('audio8c_id').play();
        //audio8c_func();
        console.log('hitsound3');
      }
    }

function play_on_start(){
  if(audio3_id.paused || !audio3_id.currentTime && audio4_id.paused || !audio4_id.currentTime){//check if audio has started or is paused on both audio3 and audio4 elements - disabled autoplay=true in html audio tag attribute so it is the same experience on phone/mobile as desktop - Android chrome currently doesn't allow audio autoplay on start - requires user click or interaction.
  audio3_func();
  audio4_func();
  }
}

var 
    shot=document.createElement('img'),
    shot_timer='off',
    shots_counter=0,//a changing number to test for misses
    shotz_src=base_url + '/Images/Firing/' + 'clear.gif',//bullet gif
    shotz_id='shotz_id',
    shotz_size='24';

function bullet_maker(){
  var 
      shot=document.createElement('img'),
      shot_size=shotz_size,//both width and height size - make the variable global outside function to change size of shot if it hits something, and not just shoots into open space to fade...
      shot_ev_x=event.clientX,
      shot_ev_y=event.clientY;
  if(enemy_hp>0){//only increment shots_counter/enemy_misses if enemy_hp is above 0, otherwise it will increment after the explosion too
    shot_timer='on';//a testing variable - not currently useful - It was made to help determine if a shot was on screen once an explosion happened so I could make the shot disappear underneath the explosion, and secondary shots to be placed in front/on top zIndex'd on top of explosion...
    //console.log('Shots Taken: '+shots_counter);//first shot
    shots_counter+=1;//a global variable counter to use to test for misses based on a subtraction of this number each hit, and firing with no hits will continually add up this variable;
    console.log('Shots Taken: '+shots_counter);
    enemy_misses+=1;
    if(enemy_misses>0){
      console.log('enemy misses: '+enemy_misses);
    }
  }
  document.body.appendChild(shot);
  //view_div.appendChild(shot);
  shot.src=shotz_src;//so console.log() can output bullet src
  shot.id=shotz_id;
  shot.style.position='absolute';
  shot.style.left=event.clientX-shot_size/2+'px';//half width to center on crosshair
  shot.style.top=event.clientY-shot_size/2+'px';//half height to center on crosshair
  shot.style.width=shot_size+'px';
  shot.style.height=shot_size+'px';
  //shot.style.zIndex='3';//hide shot behind explosions
  //shot.style.zIndex='1';//hide shot behind cockpit,explosion, and ship z-indexes, but above background image
  shot.style.zIndex='1';
  if(expl_gif_timer==='off'){
    shot.style.zIndex='1';
  }else{
    shot.style.zIndex='5';
  }
  
  function shot_fade() {//make shots fade and decrease size in time
    
    setTimeout(function(){
      document.body.removeChild(shot);
      //console.log('shot removed');//to test the timer
      clearInterval(shot_intv);
      shot_timer='off';
    },510);
    var shot_intv=setInterval(function () {//variable name the setInterval to clear it later
      opacity_of_shot=window.getComputedStyle(shot).getPropertyValue("opacity");
      width_of_shot=shot.offsetWidth;
      height_of_shot=shot.offsetHeight;
      shot.style.opacity=opacity_of_shot-0.15;
      shot.style.width=width_of_shot-6+'px';//rate of resize
      shot.style.height=height_of_shot-6+'px';//rate of resize
      shot.style.left=shot.offsetLeft+3+'px';//half of resize rate
      shot.style.top=shot.offsetTop+3+'px';//half of resize rate
      shotz_size='24';
    }, 200);
  }
  shot_fade();//run function to fade shots in size and opacity
  
  //setTimeout(function(){document.body.removeChild(shot);/* document.body.removeChild(shot); */},430);//timer to make bullet disappear eventually
  /* note - removeChild(shot), then assign to another variable, then set that variable to null - because it was throwing errors for trying to push the bullets when moving if they didnt exist from removeChild - Had idea to removeChild(shot) at beginning of function instead of after timer*/
}

console.log('Bullet Pic: '+shotz_src);

function score_add(){
    score+=1000;
    console.log(score);
  }



/*
//hammerjs
var mc = new Hammer(window);
//var pinch = new Hammer.Pinch();
//var pinch = new Hammer.Pinch();
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
mc.get('pan').set({ threshold: 1 });
mc.on("panup pandown panleft panright", function panCheck(e){
checkkey(e)
});
*/
/*
var mc = new Hammer.Manager(window);

// create a pinch and rotate recognizer
// these require 2 pointers
var pinch = new Hammer.Pinch();
var rotate = new Hammer.Rotate();

// we want to detect both the same time
pinch.recognizeWith(rotate);

// add to the Manager
mc.add([pinch, rotate]);


mc.on("pinch rotate", function pinchRotate(e) {
    zoom_out(e);
});
*/


window.addEventListener("keydown", checkkey, false);

function checkkey(e) {
  var the_shot=document.getElementById('shotz_id');//use this variable to check for shots fired later
  
  if (e.keyCode == "87" /*|| e.type == "panup"*//*hammerjs*/) {//w key - up
     var view_div_up=view_div.offsetTop+30+'px';//ship div
     view_div.style.top=view_div_up;
     var view_overlay_div_up=view_overlay_div.offsetTop+30+'px';//ghost overlay ship div
     view_overlay_div.style.top=view_overlay_div_up;
     
     if(typeof(bullet_maker) != 'undefined' && the_shot !== null){//if shot(s) fired, and on screen, or not removed yet
       var shot_move_up=the_shot.offsetTop+15+'px';//shot
       the_shot.style.top=shot_move_up;
     }
     
     if(typeof exp_gif != 'undefined' /*&& space_view.offsetTop<='-6'*/){//if exp_gif is not undefined and space_view background isn't already pushed to farthest up - throws error without- if statement..
       exp_gif_up=exp_gif.offsetTop+15+'px';//exp_gif at half of movement rate of ship (15) movement rate (30) instead of stuck in view
     exp_gif.style.top=exp_gif_up;
       //Without the explosion happening first... it wants to move an explosion that doesn't exist yet
     }
     
     if(space_view.offsetTop<='-6'){//won't let you see outside top edge of background
       var view_space_div_up=space_view.offsetTop+18+'px';//move background view down
       space_view.style.top=view_space_div_up;
     }
       //console.log(space_view.offsetTop+'px');
   }
  
  if (e.keyCode == "83" /*|| e.type == "pandown"*//*hammerjs*/) {//s key - down
    var view_div_down=view_div.offsetTop-30+'px';
    view_div.style.top=view_div_down;
    var view_overlay_div_down=view_overlay_div.offsetTop-30+'px';
    view_overlay_div.style.top=view_overlay_div_down;
    
    if(typeof(bullet_maker) != 'undefined' && the_shot !== null){//if shot(s) fired, and on screen, or not removed yet
       var shot_move_down=the_shot.offsetTop-15+'px';//shot
       the_shot.style.top=shot_move_down;
     }
    
    if(typeof exp_gif != 'undefined' /*&& space_view.offsetTop>='-1500'*/){//if exp_gif is not undefined and space_view background isn't already pushed to farthest down - throws error without- if statement..
    exp_gif_down=exp_gif.offsetTop-15+'px';//exp_gif at half of movement rate of ship (15) movement rate (30) instead of stuck in view
    exp_gif.style.top=exp_gif_down;
    }
    
    if(space_view.offsetTop>='-1500' || space_view.offsetTop>'-5'){//won't let you see outside bottom edge of background
      var view_space_div_down=space_view.offsetTop-18+'px';//move background view up
      space_view.style.top=view_space_div_down;
     }
       //console.log(space_view.offsetTop+'px');
   }
  
  if (e.keyCode == "65" /*|| e.type == "panleft"*//*hammerjs*/) {//a key - left
    var view_div_left=view_div.offsetLeft+30+'px';
    view_div.style.left=view_div_left;
    var view_overlay_div_left=view_overlay_div.offsetLeft+30+'px';
    view_overlay_div.style.left=view_overlay_div_left;
    
    if(typeof(bullet_maker) != 'undefined' && the_shot !== null){//if shot(s) fired, and on screen, or not removed yet
       var shot_move_left=the_shot.offsetLeft+15+'px';//shot
       the_shot.style.left=shot_move_left;
     }
    
    if(typeof exp_gif != 'undefined' /*&& space_view.offsetLeft<='-16'*/){//if exp_gif is not undefined and space_view background isn't already pushed to farthest left - throws error without- if statement..
    exp_gif_left=exp_gif.offsetLeft+15+'px';//exp_gif at half of movement rate of ship (15) movement rate (30) instead of stuck in view
     exp_gif.style.left=exp_gif_left;
    }
    
    /* if(typeof shotz != 'undefined' && !null){ //errors when trying to move a shot then fades out      
    shot_left=document.getElementById('shotz_id').offsetLeft+15+'px';
     document.getElementById('shotz_id').style.left=shot_left;
    } */
    
    if(space_view.offsetLeft<='-16'){//won't let you see outside left edge of background
      var view_space_div_left=space_view.offsetLeft+18+'px';//move background view left
      space_view.style.left=view_space_div_left;
    }
        //console.log(space_view.offsetLeft+'px');
   }
  
  if (e.keyCode == "68" || e.type == "panright"/*hammerjs*/) {//d key - right
    var view_div_right=view_div.offsetLeft-30+'px';
    view_div.style.left=view_div_right;
    var view_overlay_div_right=view_overlay_div.offsetLeft-30+'px';
    view_overlay_div.style.left=view_overlay_div_right;
    
    if(typeof(bullet_maker) != 'undefined' && the_shot !== null){//if shot(s) fired, and on screen, or not removed yet
       var shot_move_right=the_shot.offsetLeft-15+'px';//shot
       the_shot.style.left=shot_move_right;
     }
    
    if(typeof exp_gif != 'undefined' /*&& space_view.offsetLeft>'-2434'*/){//if exp_gif is not undefined and space_view background isn't already pushed to farthest right - throws error without- if statement;
    exp_gif_right=exp_gif.offsetLeft-15+'px';//move exp_gif right at half of movement rate of ship (15) movement rate (30) instead of stuck in view
     exp_gif.style.left=exp_gif_right;
    }
    
    if(space_view.offsetLeft>'-2434'){//won't let you see outside right edge of background
       var view_space_div_right=space_view.offsetLeft-18+'px';//move background view right
       space_view.style.left=view_space_div_right;
       }
          //console.log(space_view.offsetLeft+'px');
   }
  
}

window.addEventListener("keydown", zoom_out, false);//still working on this feature
window.addEventListener("keydown", zoom_in, false);//still working on this feature

view_overlay_div.focus();

function zoom_out(e){
   if(space_view.height>1600 && space_view.width>2500){
  if(e.keyCode == '88' /*|| e.type == 'pinch rotate'*//*hammerjs*/){
    window.audio5_func();//zoom_out sound
    var 
        hc=space_view.height,
        wc=space_view.width,
        hcd=hc*0.008,
        wcd=wc*0.008,
        tc=space_view.offsetTop,
        lc=space_view.offsetLeft,
        tcd=tc*0.008,
        lcd=lc*0.008;
    space_view.style.height=hc-hcd+'px';
    space_view.style.width=wc-wcd+'px';
    space_view.style.top=tc-tcd+'px';
    space_view.style.left=lc-lcd+'px';
    console.clear();
    console.log('height:'+hc+'px --- width:'+wc+'px');
    console.log('offsetTop:'+tcd+'px --- offsetLeft:'+lcd+'px');
    
    var 
        ship_width=ship.width,
        ship_height=ship.height,
        ship_width_divide=ship_width*0.01,
        ship_height_divide=ship_height*0.01;
    ship.style.width=ship_width-ship_width_divide+'px';
    ship.style.height=ship_height-ship_height_divide+'px';
    console.log('Ship Width: '+ship.style.width);
    console.log('Ship Height: '+ship.style.height);    
    var exp_gif=expl_gif;//get variable into this function from outside
    
    var
        exp_width=expl_gif_width,
        exp_height=expl_gif_height,
        exp_width_divide=exp_width*0.010,//this value used to be 30, but explosion was changing size too fast
        exp_height_divide=exp_height*0.010;//this value used to be 30, but explosion was changing size too fast
    exp_gif.width=exp_width-exp_width_divide;
    exp_gif.height=exp_height-exp_height_divide;
    //exp_gif.width=exp_width+exp_width_divide;//changed to addition for closeup explosions effects
    //exp_gif.height=exp_height+exp_height_divide;//""
    expl_gif_width=exp_gif.width;
    expl_gif_height=exp_gif.height;
    console.log('Pre-Explosion Width: '+exp_gif.width+'px');
    console.log('Pre-Explosion Height: '+exp_gif.height+'px');
    
    if(typeof exp_gif != 'undefined'){//explosion on screen already
      exp_width=exp_gif.width;
      exp_height=exp_gif.height;
      exp_width_divide=exp_width*0.030;
      exp_height_divide=exp_height*0.030;      
      exp_gif.style.width=exp_width-exp_width_divide+'px';
      exp_gif.style.height=exp_height-exp_height_divide+'px';
      console.log('Movement Explosion Width: '+exp_gif.style.width);
      console.log('Movement Explosion Height: '+exp_gif.style.height);
    }
    //expl_gif_width=expl_gif_beginning_width;
    //expl_gif_height=expl_gif_beginning_height;
  }
  } 
}

function zoom_in(e){
   if(space_view.height>2600 && space_view.width>3500){//will need to make double parameters for largest and smallest views widths and heights
  if(e.keyCode == '67'){
    window.audio6_func();//zoom_in sound
    var 
        hc=space_view.height,
        wc=space_view.width,
        hcd=hc*0.008,
        wcd=wc*0.008,
        tc=space_view.offsetTop,
        lc=space_view.offsetLeft,
        tcd=tc*0.008,
        lcd=lc*0.008;
    space_view.style.height=hc+hcd+'px';
    space_view.style.width=wc+wcd+'px';
    space_view.style.top=tc+tcd+'px';
    space_view.style.left=lc+lcd+'px';
    console.clear();
    console.log('height:'+hc+'px --- width:'+wc+'px');
    console.log('offsetTop:'+tcd+'px --- offsetLeft:'+lcd+'px');
    
    var 
        ship_width=ship.width,
        ship_height=ship.height,
        ship_width_divide=ship_width*0.01,
        ship_height_divide=ship_height*0.01;
    ship.style.width=ship_width+ship_width_divide+'px';
    ship.style.height=ship_height+ship_height_divide+'px';
    console.log('Ship Width: '+ship.style.width);
    console.log('Ship Height: '+ship.style.height);
    
    var exp_gif=expl_gif;//get variable into this function from outside
    
    if(typeof exp_gif !== null){//explosion on screen already
      var 
          exp_width=exp_gif.width,
          exp_height=exp_gif.height,
          exp_width_divide=exp_width*0.030,
          exp_height_divide=exp_height*0.030;
      exp_gif.style.width=exp_width+exp_width_divide+'px';
      exp_gif.style.height=exp_height+exp_height_divide+'px';
      console.log('Explosion Width: '+exp_gif.style.width);
      console.log('Explosion Height: '+exp_gif.style.height);
    }
    
  }
  }  
}