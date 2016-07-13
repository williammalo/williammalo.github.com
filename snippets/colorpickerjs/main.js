
(function(undefined){

  var __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  var husl = $.husl;

  var Color = function(color,options){
    var r,g,b, h,s,l

    var setR = function(a){
      r=a
      var hsl = husl._conv.rgb.lch([r,g,b])
      h=hsl[2]
      s=hsl[1]
      l=hsl[0]
    };
    var setG = function(a){
      g=a
      var hsl = husl._conv.rgb.lch([r,g,b])
      h=hsl[2]
      s=hsl[1]
      l=hsl[0]
    };
    var setB = function(a){
      b=a
      var hsl = husl._conv.rgb.lch([r,g,b])
      h=hsl[2]
      s=hsl[1]
      l=hsl[0]
    };

    var setH = function(a){
      h=a
      var maxChoma = husl._maxChromaForLH(l,h)
      if(s>maxChoma)
        s=maxChoma
      var rgb = husl._conv.lch.rgb([l,s,h])
      r=rgb[0]
      g=rgb[1]
      b=rgb[2]
    };
    var setS = function(a){
      s=a
      var maxChoma = husl._maxChromaForLH(l,h)
      if(s>maxChoma)
        s=maxChoma
      var rgb = husl._conv.lch.rgb([l,s,h])
      r=rgb[0]
      g=rgb[1]
      b=rgb[2]
    };
    var setL = function(a){
      l=a
      var maxChoma = husl._maxChromaForLH(l,h)
      if(s>maxChoma)
        s=maxChoma
      var rgb = husl._conv.lch.rgb([l,s,h])
      r=rgb[0]
      g=rgb[1]
      b=rgb[2]
    };

    Object.defineProperties(this, {
      r:{get:function(){return r},set:setR},
      g:{get:function(){return g},set:setG},
      b:{get:function(){return b},set:setB},

      h:{get:function(){return h},set:setH},
      s:{get:function(){return s},set:setS},
      l:{get:function(){return l},set:setL},

      hex:{get:function(){return husl._conv.rgb.hex([r,g,b])},set:function(){}}
    })

    if(color){
      this.h = color.h
      this.s = color.s
      this.l = color.l
    }
    if(options){
      if(options.h!==undefined) this.h = options.h
      if(options.s!==undefined) this.s = options.s
      if(options.l!==undefined) this.l = options.l
      if(options.r!==undefined) this.r = options.r
      if(options.g!==undefined) this.g = options.g
      if(options.b!==undefined) this.b = options.b
    }
  }

  var dom=function(a,b){
    if(a==="br")return document.createElement("br");//dumb ie bug fix
    var e=arguments, l=e.length, c, i=1,
    element = document.createElement(a)
    if(b&&b.constructor===Object)
      for(c in b)
        element.setAttribute(c, b[c])
      ,i=2
    for(;i<l;i++) element.appendChild(e[i])
    return element
  }

  var _Math = Math;
  var cos = _Math.cos;
  var sin = _Math.sin;
  var sqrt = _Math.sqrt;
  var abs = _Math.abs;
  var round = _Math.round;
  var atan2 = _Math.atan2;
  var min = _Math.min;
  var max = _Math.max;
  var atan = _Math.atan;
  var π = Math.PI;
  var dist = function dist(x1, y1, x2, y2) {
      return sqrt(abs((x1 - x2) * (x1 - x2)) + abs((y1 - y2) * (y1 - y2)));
  };
  var dir = function dir(x1, y1, x2, y2) {
      return atan2(y2 - y1, x2 - x1) * 180 / π;
  };

  var dirRad = function dir(x1, y1, x2, y2) {
    return atan2( y2 - y1,x2 - x1 )
  }

  var normalizeRad = function(hrad) {
    return (hrad + 2 * Math.PI) % (2 * Math.PI);
  };

  var intersection = function(c1, s1, c2, s2) {
    var x, y;
    x = (c1 - c2) / (s2 - s1);
    y = c1 + x * s1;
    return [x, y];
  };

  var intersection3 = function(line1, line2) {
    return intersection(line1[0], line1[1], line2[0], line2[1]);
  };

  var intersects = function(line1, point) {
    var int, line2;
    line2 = [0, point[1] / point[0]];
    int = intersection3(line1, line2);
    if (int[0] > 0 && int[0] < point[0]) {
      return true;
    }
    if (int[0] < 0 && int[0] > point[0]) {
      return true;
    }
    return false;
  };

  var distanceFromPole = function(point) {
    return Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2));
  };

  var programmaticGradient=function(f,steps){
    var i
    var gradient="linear-gradient(90deg"
    for(i=0;i<10;i++){
      gradient+=","+f(i)+" "+(i*100/steps)+"%"
    }
    gradient+=")"
    return gradient
  }

  var combinations = function(a){
    var i,j,n;
    n=a.length;
    var a2=[];
    for(i = 0; i < n; i++){
      for(j = i + 1; j < n; j++){
        a2.push( [ a[i] , a[j] ] ) 
      }
    }
    return a2
  }

  var includes=function(a,b){return __indexOf.call(a, b) >= 0}

  var getBounds = function(L) {
    var b=$.husl._getBounds(L);
    var rev = function(p) {
      return [p[1], p[0]];
    };

    return [
      [ 'R0', rev(b[0]) ],
      [ 'R1', rev(b[1]) ],
      [ 'G0', rev(b[2]) ],
      [ 'G1', rev(b[3]) ],
      [ 'B0', rev(b[4]) ],
      [ 'B1', rev(b[5]) ]
    ];
  }

  var getIntersections = function(L) {

    var bounds = getBounds(L)

    var pairs = combinations(bounds);
    return pairs
      .map(function(a){
        return{
          names: [ a[0][0] , a[1][0] ],
          point: intersection3( a[0][1] , a[1][1] )
        }
      })
      .filter(function(i){
        return bounds.every(function(j){
          var name = j[0]
          var bound = j[1]

          //if line from center to intersection crosses other bound, remove intersection
          return includes(i.names, name)||!intersects(bound, i.point)
        })
      })
  }

  var clamp=function(a,b,c){
    return max(b,min(c,a));
  }

  var getScale = function(L){

    L=clamp(L,.001,99.999)

    var lengths=getIntersections(L)
      .map(function(a){
        return distanceFromPole(a.point)
      })

    var longest = _.max(lengths);

    return 200 / longest;
  }

  $.fn.couleur = function(callback){
  
    var elements = {
      picker: $(this),
      halo:   dom("canvas",{class:"couleur-wheel-halo",height:"50",width:"50"}),
      wheel:  dom("canvas",{class:"couleur-wheel",height:"50",width:"50"}),
      cursor: dom("div",{class:"couleur-wheel-cursor"})
    }

    elements.picker.addClass("couleur")

    elements.wheelWrap = 
      dom("div",{class:"couleur-wheel-wrap"},
        elements.halo,
        elements.wheel,
        elements.cursor
      );

    [
      {channel:"h",range:"359"},
      {channel:"s",range:"100"},
      {channel:"l",range:"100"},
      {channel:"r",range:"255"},
      {channel:"g",range:"255"},
      {channel:"b",range:"255"}
    ].forEach(function(a){
      elements["label"+a.channel.toUpperCase()] = dom("label",{class:"couleur-label couleur-label-"+a.channel})
      elements["input"+a.channel.toUpperCase()] = dom("input",{type:"text",value:"100",class:"couleur-input-"+a.channel})
      elements["range"+a.channel.toUpperCase()+"Input"] = dom("input",{type:"range",min:"0",max:a.range,step:"1",class:"couleur-range-"+a.channel+"-input"})
      elements["range"+a.channel.toUpperCase()] = dom("div",{class:"couleur-range-wrap couleur-range-"+a.channel},elements["range"+a.channel.toUpperCase()+"Input"])
    })

    var pickerInputGroupHSL = dom("div",{class:"couleur-input-group"},
      elements.labelH, elements.inputH, elements.rangeH,
      elements.labelS, elements.inputS, elements.rangeS,
      elements.labelL, elements.inputL, elements.rangeL
    );

    var pickerInputGroupRGB = dom("div",{class:"couleur-input-group"},
      elements.labelR, elements.inputR, elements.rangeR,
      elements.labelG, elements.inputG, elements.rangeG,
      elements.labelB, elements.inputB, elements.rangeB
    );

    elements.inputHex = dom("input",{type:"text",value:"#ffffff",class:"couleur-input-hex"})

    elements.picker.append([
       elements.wheelWrap
      ,pickerInputGroupHSL
      ,dom("div",{class:"couleur-spacer"}) 
      ,pickerInputGroupRGB
      ,dom("div",{class:"couleur-spacer"}) 
      ,elements.inputHex
    ])

    var ctx = elements.wheel.getContext('2d');
    var haloCtx = elements.halo.getContext('2d');

    var size = $(elements.wheel).width()|0;

    var color = new Color

    color.l = 50;

    var scale;

    var cursorX=0
    var cursorY=0

    var pickerDark = true

    var pickerContrast = function(){
      var dark = color.l>50;
      if(dark!==pickerDark){
        pickerDark = dark
        $(elements.cursor).css("color",dark?"#000":"inherit")
      }
    }


    var slidersUpdate = function(){
      $(elements.cursor).css("transform","translate3d("+(cursorX*(size/2)+size/2)+"px,"+(cursorY*(size/2)+size/2)+"px,0)")

      pickerContrast()

      var hex = color.hex
      
      callback(hex,[max(color.r,0),max(color.g,0),max(color.b,0)]);

      elements.rangeH.style.background = programmaticGradient(function(i){return new Color (color,{h:i*36}).hex},10)
      elements.rangeS.style.background = programmaticGradient(function(i){return new Color (color,{s:i*10}).hex},10)
      elements.rangeL.style.background = programmaticGradient(function(i){return new Color (color,{l:i*10}).hex},10)
      elements.rangeR.style.background = programmaticGradient(function(i){return new Color (color,{r:i/10}).hex},10)
      elements.rangeG.style.background = programmaticGradient(function(i){return new Color (color,{g:i/10}).hex},10)
      elements.rangeB.style.background = programmaticGradient(function(i){return new Color (color,{b:i/10}).hex},10)

      var labelColor = new Color

      labelColor.h = color.h
      labelColor.s = 180
      labelColor.l = 60

      var labelColor2 = new Color

      labelColor2.h = (color.h+180)%360
      labelColor2.s = 180
      labelColor2.l = 60

      elements.labelH.style.background = "linear-gradient("+labelColor.hex+" 0,"+labelColor.hex+" 3px ,transparent 3px,transparent 4px,"+labelColor2.hex+" 4px,"+labelColor2.hex+" 7px)"
      elements.labelS.style.background = "linear-gradient("+labelColor.hex+" 0,"+labelColor.hex+" 3px ,transparent 3px,transparent 4px,#919191 4px,#919191 7px)"
      elements.labelL.style.background = "linear-gradient("+labelColor.hex+" 0,"+labelColor.hex+" 3px ,transparent 3px,transparent 4px,#ffffff 4px,#ffffff 7px)"

      var red=round(color.r*255)
      elements.rangeRInput.value = red
      elements.inputR.value = red

      var green=round(color.g*255)
      elements.rangeGInput.value = green
      elements.inputG.value = green

      var blue=round(color.b*255)
      elements.rangeBInput.value = blue
      elements.inputB.value = blue
      
      var maxChoma = husl._maxChromaForLH(color.l,color.h)
      elements.rangeLInput .value = color.l
      elements.inputL      .value = round(color.l)
      elements.rangeSInput .value = (color.s/maxChoma)*100
      elements.inputS      .value = round((color.s/maxChoma)*100) 
      elements.rangeHInput .value = (color.h+360)%360
      elements.inputH      .value = round((color.h+360)%360)
      elements.inputHex    .value = hex
    }


    var pickerUpdate = function(){

      color.h = dir(0,0,cursorX / scale*200,cursorY / scale*200)
      color.s = distanceFromPole([cursorX / scale*200,cursorY / scale*200])

      slidersUpdate()
    }

    var pickerMove = function(){

      cursorX = color.s*cos(color.h* Math.PI / 180)*scale/200
      cursorY = color.s*sin(color.h* Math.PI / 180)*scale/200

      slidersUpdate()
    }


    $(elements.rangeLInput,elements.inputL).on("input",function(){
      color.l=Number( $(this).val() )||0
      scale=getScale(color.l)
      pickerUpdate()
      redrawCanvas()
    })
    $(elements.rangeSInput,elements.inputS).on("input",function(){
      var maxChoma = husl._maxChromaForLH(color.l,color.h)
      color.s=maxChoma*((Number($(this).val())||0)/100)
      pickerMove()
    })

    $(elements.rangeHInput,elements.inputH).on("input",function(){
      color.h=Number($(this).val())||0
      pickerMove()
    })
    $(elements.rangeRInput,elements.inputR).on("input",function(){
      color.r=(Number( $(this).val() )||0)/255
      scale=getScale(color.l)
      pickerMove()
      redrawCanvas()
    })
    $(elements.rangeGInput,elements.inputG).on("input",function(){
      color.g=(Number( $(this).val() )||0)/255
      scale=getScale(color.l)
      pickerMove()
      redrawCanvas()
    })
    $(elements.rangeBInput,elements.inputB).on("input",function(){
      color.b=(Number( $(this).val() )||0)/255
      scale=getScale(color.l)
      pickerMove()
      redrawCanvas()
    })

    var mousePressed = false

    $(window).on("mousedown",function(){mousePressed = true })
    $(window).on("mouseup",  function(){mousePressed = false})

    $(elements.wheel).on("mousemove",function(e) {
      if(mousePressed){
        cursorX = (e.pageX-$(this).offset().left-size/2)/(size/2)
        cursorY = (e.pageY-$(this).offset().top -size/2)/(size/2)
        pickerUpdate()
      }
    })
    $(elements.wheel).on("mousedown",function(e){
      cursorX = (e.pageX-$(this).offset().left-size/2)/(size/2)
      cursorY = (e.pageY-$(this).offset().top -size/2)/(size/2)
      pickerUpdate()
    })

    var redrawHaloSquare = function(x, y) {

        var scale=getScale(10)

        var c = new Color

        c.l=10
        c.s=distanceFromPole([(x - 25) / (scale/8),(y - 25) / (scale/8)])
        c.h=(dir(0,0,(x - 25) / (scale/8),(y - 25) / (scale/8))+180)%360

        haloCtx.fillStyle = c.hex;
        return haloCtx.fillRect(x, y, 1, 1);
    };

    var redrawSquare = function(x, y) {

        var c = new Color

        c.l=color.l
        c.s=distanceFromPole([(x - 25) / (scale/8),(y - 25) / (scale/8)])
        c.h=dir(0,0,(x - 25) / (scale/8),(y - 25) / (scale/8))

        ctx.fillStyle = c.hex;
        return ctx.fillRect(x, y, 1, 1);
    };

    var redrawHaloCanvas = function() {
      
        var pixelSize = 50;
        for(var i=0;i<pixelSize*pixelSize;i++){
          redrawHaloSquare((i%(pixelSize)), ((i/(pixelSize))|0));
        }
      
    }

    redrawHaloCanvas()

    var canvasAnimating = false

    var redrawCanvas = function() {
      if(canvasAnimating === false){
        canvasAnimating = true
        window.requestAnimationFrame(function() {
          var pixelSize = 50;
          
          for(var i=0;i<pixelSize*pixelSize;i++){
            redrawSquare((i%(pixelSize)), ((i/(pixelSize))|0));
          }

          elements.halo.style.opacity=min(color.l/50,1)
          canvasAnimating = false
        })
      }
    };


    scale=getScale(color.l)

    pickerUpdate()
    window.requestAnimationFrame(function(){
      size = $(elements.wheel).width()|0;
      pickerUpdate()
    })

    redrawCanvas();
  }

})()
