(function(){




//	Variable decalrations
var viewerUnderlay     = document.createElement('div');
var	viewerImgContainer = document.createElement('div');
var	viewerImg          = document.createElement('img');
var viewerSpeed        = 0.5;

var imageBounds;



viewerUnderlay.className             = 'imageViewer';
viewerImgContainer.className = 'imageViewerImageContainer';
viewerImg.className          = 'imageViewerImage';




viewerImgContainer.appendChild( viewerImg );
document.body.appendChild( viewerUnderlay );
document.body.appendChild( viewerImgContainer );

viewerImgContainer.style.transitionDuration = viewerSpeed + 's';
viewerUnderlay.style.transitionDuration = viewerSpeed + 's';


//	Add viewer to all created sites
Array.prototype.forEach.call( document.querySelectorAll('.builtSite'), function( elt ){
	elt.addEventListener( 'click', openInViewer, false );
});





//	Functions

function openInViewer (e) {

	var clickedImage             = e.target;
	var imgBackgroundImage       = clickedImage.style.backgroundImage;
	var src                      = imgBackgroundImage.slice(
		imgBackgroundImage.indexOf('(') + 1,
		imgBackgroundImage.lastIndexOf(')')
	);



	imageBounds = clickedImage.getBoundingClientRect();

	viewerImgContainer.style.top        = imageBounds.top + 'px';
	viewerImgContainer.style.left       = imageBounds.left + 'px';
	viewerImgContainer.style.width      = imageBounds.width + 'px';
	viewerImgContainer.style.height     = imageBounds.height + 'px';

	viewerImg.src = src;

	viewerUnderlay.style.display = 'block';
	viewerImgContainer.style.display = 'block';
	document.body.style.overflow = 'hidden';

	setTimeout( centerViewerImage, 4 );

	viewerImgContainer.addEventListener('click', closeViewer, false);
	viewerUnderlay.addEventListener('click', closeViewer, false);

}

function centerViewerImage () {
	setTransitions();

	viewerImgContainer.style.top    = '5%';
	viewerImgContainer.style.left   = '5%';
	viewerImgContainer.style.width  = '90%';
	viewerImgContainer.style.height = '90%';

	viewerUnderlay.style.opacity = '0.9';
}

function closeViewer () {
	viewerImgContainer.removeEventListener('click', closeViewer, false);
	viewerUnderlay.removeEventListener('click', closeViewer, false);



	viewerImgContainer.scrollTop  = 0;
	viewerImgContainer.scrollLeft = 0;

	viewerImgContainer.style.top        = imageBounds.top + 'px';
	viewerImgContainer.style.left       = imageBounds.left + 'px';
	viewerImgContainer.style.width      = imageBounds.width + 'px';
	viewerImgContainer.style.height     = imageBounds.height + 'px';

	viewerUnderlay.style.opacity = 0;

	document.body.style.overflow = 'auto';



	setTimeout( hideViewer, viewerSpeed*1100 );
}

function hideViewer () {
	viewerImgContainer.style.display = 'none';
	viewerUnderlay.style.display = 'none';

	imageBounds = undefined;

	unsetTransitions();
}

function setTransitions () {
	viewerUnderlay.style.transitionProperty             = 'opacity';
	viewerImgContainer.style.transitionProperty = 'top, left, width, height, opacity';
}

function unsetTransitions () {
	viewerUnderlay.style.transitionProperty             = 'none';
	viewerImgContainer.style.transitionProperty = 'none';
}





}());