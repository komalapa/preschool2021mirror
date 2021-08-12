function loadCanvasWithInputFile(){
	// canvas
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext("2d"); 
	var fileInput = document.getElementById('new-file'); // input file
	var img = new Image();
    console.log(fileInput, canvas)
	fileInput.onchange = function(evt) {
        
	    var files = evt.target.files; // FileList object
        console.log(files[0].type)
	    var file = files[0];
	    if(file.type.match('image*')) {
	        var reader = new FileReader();
	        // Read in the image file as a data URL.
	        reader.readAsDataURL(file);
	    	reader.onload = function(evt){
                console.log('loaded')
	    		if( evt.target.readyState == FileReader.DONE) {
                    img.src = evt.target.result;
                    img.onload = () => {
						context.drawImage(img, 0, 0);
						// if (document.body.clientWidth*0.7 < img.width){
						// 	img.width = document.body.clientWidth*0.7 
						// }
                        // canvas.width = img.width;
                        // canvas.height = img.height
	    			    
						const MAX_WIDTH = 300;//canvas.clientWidth;
            			const MAX_HEIGHT = 400;//canvas.clientHeight;
            			let width = img.width;
            			let height = img.height;
						console.log(width, height,MAX_WIDTH,MAX_HEIGHT)
						if (width > height) {
							if (width > MAX_WIDTH) {
								height *= MAX_WIDTH / width;
								width = MAX_WIDTH;
							}
						} else {
							if (height > MAX_HEIGHT) {
								width *= MAX_HEIGHT / height;
								height = MAX_HEIGHT;
							}
						}
						canvas.width = width;
						canvas.height = height;
						console.log(width, height,MAX_WIDTH,MAX_HEIGHT)
						console.log('width',img.width)
                        context.drawImage(img, 0, 0, width, height);
                    }
                   // context.drawImage(img,100,100);
			    }
	    	}    

	    } else {
	        alert("not an image");
	    }
	};
}
loadCanvasWithInputFile()

