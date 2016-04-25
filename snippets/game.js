
//chainvas
(function(){var e=window.Chainvas={chainable:function(a){return function(){var b=a.apply(this,arguments);return b===void 0?this:b}},chainablizeOne:function(a,b){try{e.utils.hasOwnProperty(a,b)&&e.utils.isFunction(a[b])&&(a[b]=e.chainable(a[b]))}catch(c){}return this},chainablize:function(a,b){var c=a.prototype;if(b)for(var d=b.length;d--;)e.chainablizeOne(c,b[d]);else for(d in c)e.chainablizeOne(c,d);return this},helpers:function(a,b){var c=a.prototype,d;for(d in e.methods)c&&!(d in c)&&(c[d]=e.methods[d]);e.extend(c,b);return this},extend:function(a,b){return Chainvas.methods.prop.call(a,b)},global:function(a,b,c){typeof a==="string"&&(a=[a]);for(var d=a.length;d--;){var f=window[a[d]];f&&e.chainablize(f,c).helpers(f,b)}},methods:{prop:function(){if(arguments.length===1){var a=arguments[0],b;for(b in a)this[b]=a[b]}else arguments.length===2&&(this[arguments[0]]=arguments[1]);return this}},utils:{isFunction:function(a){var b=Object.prototype.toString.call(a);return b==="[object Function]"||b==="[object Object]"&& "call"in a&&"apply"in a&&/^\s*\bfunction\s+\w+\([\w,]*\) \{/.test(a+"")},hasOwnProperty:function(a,b){try{return a.hasOwnProperty(b)}catch(c){return b in a&&(!a.prototype||!(b in a.prototype)||a.prototype[b]!==a[b])}}}}})();
Chainvas.chainablize(Element)
Chainvas.helpers(Element)
Chainvas.chainablize(CanvasRenderingContext2D)
Chainvas.helpers(CanvasRenderingContext2D)

//allows use of Math functions in global scope https://gist.github.com/2221488
;(function(a,b){for(b in a=Object.getOwnPropertyNames(Math))this[a[b]]=Math[a[b]]})()
//useful math functions:
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
}
var sign = Math.sign;

//
var imgToMap = function(img,a,i){
	var hitMap=[];
	var w=img.width,h=img.height;
	a=document.createElement("canvas").prop({width:w,height:h}).getContext("2d").drawImage(img,0,0).getImageData(0,0,w,h).data;

	for(i=0;i<w*h;i++) hitMap[i]=a[i<<2]<128
	hitMap.w=w;
	hitMap.h=h;
	return hitMap
};


//key press handling
var key={
	left  : false,
	right : false,
	space : false,
	up    : false,
	down  : false
}

;(function(foo){
	onkeydown = function(e){foo(true,e)}
	onkeyup   = function(e){foo(false,e)}

	foo=function(a,e){
		key[{
			37 : "left",
			39 : "right",
			32 : "space",
			38 : "up",
			40 : "down"
		}[e.keyCode]]=a
	}
})()


//only initialize game ounce images have loaded
onload=function(){
	"use strict";

	//global variables
	var w=480, h=320, FPS = 30, scaling=2;

	var defaultDraw = function(){
		canvas.drawImage(
			 this.image
			,(this.x|0)*scaling
			,(this.y|0)*scaling
			,this.w*scaling
			,this.h*scaling
		)
	}

	//images
	var  levelimg     = document.images[0]
		,playerr      = document.images[1]
		,playerl      = document.images[2]
		,playerHitImg = document.images[3];

	//var [ levelimg, playerr, playerl, playerHitImg ] = document.images;


	var level={
		 x     : 0
		,y     : 0
		,w     : 480
		,h     : 320
		,hit   : imgToMap(levelimg)
		,image : levelimg
	};

	//collision detection functions for both collision maps and simple rectangles

	var loop = function(n,f){
		var i=0;
		n = abs(n)
		for(i=0;i<n;i++) f(i);
	}

	var collides = function(o1,xoff,yoff){

		xoff |= 0 //offset of object 2 (optional)
		yoff |= 0

		//inputs to the function

		var o1x = o1.x |0
		var o1y = o1.y |0

		var o2x = this.x + xoff |0
		var o2y = this.y + yoff |0

		var o1w = o1.w
		var o1h = o1.h
		var o2w = this.w
		var o2h = this.h

		if(   o1.hit  &&   this.hit  ) return ᑎ.mapMap( o1x, o1y, o1w, o1h, o2x, o2y, o2w, o2h, o1.hit, this.hit )
		if(   o1.hit  && (!this.hit) ) return ᑎ.mapBox( o1x, o1y, o1w, o1h, o2x, o2y, o2w, o2h, o1.hit         )
		if( (!o1.hit) &&   this.hit  ) return ᑎ.boxMap( o1x, o1y, o1w, o1h, o2x, o2y, o2w, o2h, this.hit         )
		if( (!o1.hit) && (!this.hit) ) return ᑎ.boxBox( o1x, o1y, o1w, o1h, o2x, o2y, o2w, o2h                 )

	}

	var player={
		 x     : 180
		,y     : 150
		,w     : playerr.width
		,h     : playerr.height
		,vy    : 0
		,image : playerr
		,hit   : imgToMap(playerHitImg)

		,collides: collides

		,move: function(x,y){
			var a=false;
			if(!this.collides(level,x,y)){
				this.x += x;
				this.y += y;
				a=true;
			}
			return a
		}
		,walk:function(v){
			var direction = sign(v);
			this.move(v,0)||this.move(v>>1,-1)||this.move(v>>2,-2)
			this.image=~direction?playerr:playerl
		}
		,update: function(){
			var that = this

			var direction = key.right - key.left

			direction && that.walk(direction*4)

			//jump if character is on floor and doesn't have ceiling over it.
			key.up && that.collides(level,0,1) && !that.collides(level,0,-1) && ( that.vy = -9 )
			
			//pixel perfect vertical movement
			loop(that.vy, function(i){
				that.move(0, sign(that.vy))||(that.vy = 0)
			});

			//gravity
			that.vy += 1

			/*
			
			var walk = ( v )=>this.walk( v )
			var move = (x,y)=>this.move(x,y)
			var ᐅ = key.right
			var ᐊ = key.left
			var ᑎ = (x,y)=>this.collides(level,x,y)
			var vy = this.vy

			var d = ᐅ - ᐊ
			d && walk( d*4 )
			ᐃ && ᑎ( 0, 1 ) && !ᑎ( 0, -1 ) && ( vy = -9 )
			loop( vy, i=>move(0,sign(vy))||vy=0 )
			vy += 1
			
			this.vy = vy

			*/

		}
	}

		var gameObjects = [ level, player ];

		setInterval(function(){

			canvas
				.clearRect(0,0,w*scaling,h*scaling)

			var i, l = gameObjects.length;
			for(i=0;i<l;i++){
				
				if(gameObjects[i].update)
					gameObjects[i].update()


				if(gameObjects[i].draw){
					gameObjects[i].draw()
				}else if(gameObjects[i].image){
					defaultDraw.apply(gameObjects[i]);
				}
			}


		},1e3/FPS)

		//create the actual canvas
		var canvas=document.body.appendChild(
			document.createElement("canvas")
				.prop({ width:w*scaling, height:h*scaling })
		).getContext("2d").prop({webkitImageSmoothingEnabled:false, mozImageSmoothingEnabled:false})
        
}
