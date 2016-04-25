var WCollision,ᑎ;
(function(){
	var max=Math.max
	var min=Math.min

	var collidesMapMap = function(o1x,o1y,o1w,o1h,o2x,o2y,o2w,o2h,o1m,o2m){

		var ᑎx, ᑎy, ᑎx2, ᑎy2, ᑎw, ᑎh, ᑎA, i, ix, iy, ix1, iy1, ix2, iy2;
	    
	    // check if two objects intersect (ᑎ)
		ᑎx  = max(    o1x     ,    o2x    );
		ᑎy  = max(    o1y     ,    o2y    );
		ᑎx2 = min( o1x + o1w  , o2x + o2w );
	    ᑎy2 = min( o1y + o1h  , o2y + o2h );

	    if (ᑎx2 > ᑎx && ᑎy2 > ᑎy) {

	        ᑎw = ᑎx2 - ᑎx;
	        ᑎh = ᑎy2 - ᑎy;
	        ᑎA = ᑎw  * ᑎh;

			for(i=0;i<ᑎA;i++){// check every pixel inside ᑎ for collision

				// position of iterator
				ix = ( i%ᑎw )
				iy = (i/ᑎw|0)
				// position of iterator inside o1
				ix1 = ix - (o1x - ᑎx);
				iy1 = iy - (o1y - ᑎy);
				// position of iterator inside o2
				ix2 = ix - (o2x - ᑎx);
				iy2 = iy - (o2y - ᑎy);

				if( o1m[ iy1*o1w+ix1 ] & o2m[ iy2*o2w+ix2 ] ) return 1

			}
	    }
	    return 0;

	}

	var collidesMapBox = function(o1x,o1y,o1w,o1h,o2x,o2y,o2w,o2h,o1m){

		var ᑎx, ᑎy, ᑎx2, ᑎy2, ᑎw, ᑎh, ᑎA, i, ix, iy, ix1, iy1, ix2, iy2;
	    
	    // check if two objects intersect (ᑎ)
		ᑎx  = max(    o1x     ,    o2x    );
		ᑎy  = max(    o1y     ,    o2y    );
		ᑎx2 = min( o1x + o1w  , o2x + o2w );
	    ᑎy2 = min( o1y + o1h  , o2y + o2h );

	    if (ᑎx2 > ᑎx && ᑎy2 > ᑎy) {

	        ᑎw = ᑎx2 - ᑎx;
	        ᑎh = ᑎy2 - ᑎy;
	        ᑎA = ᑎw  * ᑎh;

			for(i=0;i<ᑎA;i++){// check every pixel inside ᑎ for collision

				// position of iterator
				ix = ( i%ᑎw )
				iy = (i/ᑎw|0)
				// position of iterator inside o1
				ix1 = ix - (o1x - ᑎx);
				iy1 = iy - (o1y - ᑎy);

				if( o1m[ iy1*o1w+ix1 ] ) return 1

			}
	    }
	    return 0;

	}

	var collidesBoxMap = function(o1x,o1y,o1w,o1h,o2x,o2y,o2w,o2h,o2m){

		var ᑎx, ᑎy, ᑎx2, ᑎy2, ᑎw, ᑎh, ᑎA, i, ix, iy, ix1, iy1, ix2, iy2;
	    
	    // check if two objects intersect (ᑎ)
		ᑎx  = max(    o1x     ,    o2x    );
		ᑎy  = max(    o1y     ,    o2y    );
		ᑎx2 = min( o1x + o1w  , o2x + o2w );
	    ᑎy2 = min( o1y + o1h  , o2y + o2h );

	    if (ᑎx2 > ᑎx && ᑎy2 > ᑎy) {

	        ᑎw = ᑎx2 - ᑎx;
	        ᑎh = ᑎy2 - ᑎy;
	        ᑎA = ᑎw  * ᑎh;

			for(i=0;i<ᑎA;i++){// check every pixel inside ᑎ for collision

				// position of iterator
				ix = ( i%ᑎw )
				iy = (i/ᑎw|0)
				// position of iterator inside o2
				ix2 = ix - (o2x - ᑎx);
				iy2 = iy - (o2y - ᑎy);

				if( o2m[ iy2*o2w+ix2 ] ) return 1

			}
	    }
	    return 0;

	}

	var collidesBoxBox = function(o1x,o1y,o1w,o1h,o2x,o2y,o2w,o2h){
		return(o1x<o2x+o2w && o1x+o1w>o2x && o1y<o2y+o2h && o1y+o1h>o2y)|0
	}

	WCollision = {
		boxBox: collidesBoxBox,
		boxMap: collidesBoxMap,
		mapBox: collidesMapBox,
		mapMap: collidesMapMap
	}

	ᑎ = WCollision;

})()