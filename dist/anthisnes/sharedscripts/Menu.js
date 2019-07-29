/* ---------------------------------------------------------------------------- */


/*
Copyright - 2019 - Christian Guyette Contact: http//www.ouaie.be/

This  program is free software;
you can redistribute it and/or modify it under the terms of the 
GNU General Public License as published by the Free Software Foundation;
either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

/* ---------------------------------------------------------------------------- */


/* 
--- removeClass function ---
*/

function removeClass ( menuPart, className ) {
	document.getElementById ( menuPart ).classList.remove ( className );
}

/* 
--- addClassAll function ---
*/

function addClassAll ( className ) {
	[ 'cyCategoriesMenuTop', 'cyTagsMenuTop', 'cyArchivesMenuTop', 'cyPagesMenuTop'].forEach  (
		function ( menuPart ) { document.getElementById ( menuPart ).classList.add ( className );}
	);
}

/* 
--- cyStorageAvailable function ---
*/

function cyStorageAvailable ( type ) {
	try {
		var storage = window [ type ];
		var	x = '__storage_test__';
		storage.setItem ( x, x );
		storage.removeItem ( x );
		return true;
	}
	catch ( e ) {
		return false;
	}				
}

/* 
--- toggleMenuPart function ---
*/

function toggleMenuPart ( menuPart ) {
	var currentMenu = '';
	if ( cyStorageAvailable ( 'localStorage' ) ) {
		currentMenu = localStorage.getItem ( 'currentMenu' );
	}
	addClassAll ( 'cyHiddenMenuPart' );
	if ( currentMenu === menuPart ) {
		currentMenu = '';
	}
	else {
		removeClass ( menuPart, 'cyHiddenMenuPart' );
		currentMenu = menuPart;
	}
	if ( cyStorageAvailable ( 'localStorage' ) ) {
		localStorage.setItem ( 'currentMenu', currentMenu );
	}
}	
/* 
--- toggleMenuPart function ---
*/

function resizeCurrentPost ( ) {
	var screenHeight = window.screen.availHeight;
	var clientRect = g_posts [ g_currentPost ].getBoundingClientRect ( );
	var top = clientRect.y - document.documentElement.getBoundingClientRect ( ).y;
	if (  top + clientRect.height > screenHeight ) {
		var imgElement = null;
		var postContent = g_posts [ g_currentPost ].children [ 1 ];
		
		for (var counter = 0; counter < postContent.children.length; counter ++ ) {
			if ( postContent.children [ counter ].classList.contains ( 'cyPostMedias' ) ) {
				imgElement = postContent.children [ counter ].firstElementChild.firstElementChild;
				if ( imgElement.tagName !== 'IMG' ) {
					imgElement = null;
				}
				break;
			}
		}
		if ( imgElement ) {
			var imgScale = ( imgElement.height  - top - clientRect.height + screenHeight - 20 ) / imgElement.height;
			console.log ( imgScale );
			console.log ( '' + Number.parseInt ( imgScale * imgElement.width ) +'px' );
			imgElement.style.width = '' + Number.parseInt ( imgScale * imgElement.width ) +'px';
		}
	}
}

/* 
--- getClientRect function ---
*/

function getClientRect ( ) {
	if ( -1 !== g_posts [ g_currentPost ].haveMedia ) {
		return g_posts [ g_currentPost ].children [ 1 ].children [ g_posts [ g_currentPost ].haveMedia ].firstElementChild.firstElementChild.getBoundingClientRect ( );
	}
	else if ( -1 !== g_posts [ g_currentPost ].haveText ) {
		return g_posts [ g_currentPost ].children [ 1 ].children [ g_posts [ g_currentPost ].haveText ].getBoundingClientRect ( );
	}
	else if ( -1 !== g_posts [ g_currentPost ].haveExcerpt ) {
		return g_posts [ g_currentPost ].children [ 1 ].children [ g_posts [ g_currentPost ].haveExcerpt ].getBoundingClientRect ( );
	}
	return null;
}

/* 
--- onPostMouseClick function ---
*/

function onPostMouseClick ( mouseEvent ) {
	var clientRect = getClientRect ( );
	if ( clientRect ) {
		var previousPost = g_currentPost;
		g_currentPost += ( clientRect.width / 2 > mouseEvent.offsetX ) ? -1 : 1;
		if ( -1 === g_currentPost )
		{
			if ( g_hasNextPage ) {
				localStorage.setItem ( 'postDirection', 'backward' );
				document.getElementsByClassName ( 'cyPaginationNext' ) [ 0 ].click ( );
			}
			g_currentPost = 0;
			return;
		}
		if ( g_posts.length === g_currentPost )
		{
			if ( g_hasPreviousPage ){
				localStorage.setItem ( 'postDirection', 'forward' );
				document.getElementsByClassName ( 'cyPaginationPrevious' ) [ 0 ].click ( );
			}
			g_currentPost --;
			return;
		}
		
		g_posts [ previousPost ].classList.add ( 'cyHidden' );
		g_posts [ g_currentPost ].classList.remove ( 'cyHidden' );
		
		resizeCurrentPost ( );		
	}
}

/* 
--- onPostMouse function ---
*/

function onPostMouse ( mouseEvent ) {
	var clientRect = getClientRect ( );
	if ( clientRect ) {
		if ( clientRect.width  < mouseEvent.clientX - clientRect.x )
		{
			document.body.style.cursor = 'auto';
		}
		else if ( clientRect.width / 2  < mouseEvent.clientX - clientRect.x  ) {
			document.body.style.cursor = (  g_hasPreviousPage && g_lastPost === g_currentPost ) || g_lastPost !== g_currentPost ? 'url(/blog/themes/ouaie/sharedpictures/right.png) 16 16,e-resize' : 'auto';
		}
		else {
			document.body.style.cursor = ( g_hasNextPage && 0 === g_currentPost ) || 0 !== g_currentPost  ? 'url(/blog/themes/ouaie/sharedpictures/left.png) 16 16,w-resize' : 'auto';
		}
	}
}

/* 
--- onPostMouseLeave function ---
*/

function onPostMouseLeave ( mouseEvent ) {
	document.body.style.cursor = 'auto';
}

/* 
--- hideMenu function ---
*/

function hideMenu ( ) {
	addClassAll ( 'cyHiddenMenuPart' );
	
	var currentMenu = localStorage.getItem ( 'currentMenu' );
	if ( currentMenu && '' !== currentMenu ) {
		removeClass ( currentMenu, 'cyHiddenMenuPart' );
	}
	
	document.getElementById ( 'cyCategoriesTitleTop' ).addEventListener (
		'click',
		function ( ) { toggleMenuPart ( 'cyCategoriesMenuTop' ); }, 
		false
	);
	document.getElementById ( 'cyTagsTitleTop' ).addEventListener (
		'click',
		function ( ) { toggleMenuPart ( 'cyTagsMenuTop' ); }, 
		false
	);
	document.getElementById ( 'cyArchivesTitleTop' ).addEventListener (
		'click',
		function ( ) { toggleMenuPart ( 'cyArchivesMenuTop' ); }, 
		false
	);
	document.getElementById ( 'cyPagesTitleTop' ).addEventListener (
		'click',
		function ( ) { toggleMenuPart ( 'cyPagesMenuTop' ); }, 
		false
	);
}


/* 
--- hidePosts function ---
*/

function hidePosts ( ) {
	if ( 0 < document.getElementsByClassName ( 'cyPaginationPrevious' ).length ) {
		g_hasPreviousPage = true;
	}
	if ( 0 < document.getElementsByClassName ( 'cyPaginationNext' ).length ) {
		g_hasNextPage = true;
	}
	
	var postDirection = 'forward';
	var tmpPostDirection = localStorage.getItem ( 'postDirection' );
	if ( tmpPostDirection  && '' != tmpPostDirection) {
		postDirection = tmpPostDirection;
	}
	localStorage.setItem ( 'postDirection', '' );
	
	var postTitleDate = document.getElementsByClassName ( 'cyPostTitleDate' );
	for (var counter = 0; counter < postTitleDate.length; counter++) {
		postTitleDate [ counter ].classList.add ( 'cyHidden' );
	}
		
	g_posts = document.getElementsByClassName ( 'cyPost' );
	g_lastPost = g_posts.length - 1;
	for ( counter = 0; counter < g_posts.length; counter++) {
		g_posts [ counter ].classList.add ( 'cyHidden' );
		
		var postContent = g_posts [ counter ].children [1];
		// the 4 events are needed!!!
		postContent.addEventListener (
			'mousemove',
			onPostMouse,
			false
		);
		postContent.addEventListener (
			'mouseenter',
			onPostMouse,
			false
		);
		
		postContent.addEventListener (
			'mouseleave',
			onPostMouseLeave,
			false
		);
		postContent.addEventListener (
			'click',
			onPostMouseClick,
			false
		);

		g_posts [ counter ].haveExcerpt = -1;
		g_posts [ counter ].haveMedia = -1;
		g_posts [ counter ].haveText = -1;

		for ( var childCounter = 0; childCounter < postContent.children.length ; childCounter ++ ) {
			if ( postContent.children [ childCounter ].classList.contains ( 'cyPostExcerpt' ) ) {
				g_posts [ counter ].haveExcerpt = childCounter;
			}
			if ( postContent.children [ childCounter ].classList.contains ( 'cyPostMedias' ) ) {
				g_posts [ counter ].haveMedia = childCounter;
			}
			if ( postContent.children [ childCounter ].classList.contains ( 'cyPostText' ) ) {
				g_posts [ counter ].haveText = childCounter;
			}
		}
	}
	
	g_currentPost = ( 'forward' === postDirection ) ?  0 : g_lastPost;
	
	if ( g_posts [ g_currentPost ] ) {
		g_posts [ g_currentPost ].classList.remove ( 'cyHidden' );
		resizeCurrentPost ( );
	}
}
/* 
--- global variables ---
*/

var g_currentPost = null;
var g_lastPost = null;
var g_hasPreviousPage = false;
var g_hasNextPage = false;
var g_posts = null;

/* 
--- cyStartMenu function ---
*/

function cyStartMenu ( ) {
	
	if ( ! cyStorageAvailable ( 'localStorage' ) ) {
		return;
	}
	
	document.getElementsByTagName ( 'body' ) [0].classList.add ( 'cyJSPage' );

	hideMenu ( );
	hidePosts ( );
	
	if ( document.getElementById ( 'cyPagination' ) ) {
		document.getElementById ( 'cyPagination' ).classList.add ( 'cyHidden' );
	}
	
	if ( document.getElementById ( 'cyPageCounter' ) ) {
		document.getElementById ( 'cyPageCounter' ).classList.add ( 'cyHidden' );
	}
	
	if ( document.getElementById ( 'cyCopyright' ) ) {
		document.getElementById ( 'cyCopyright' ).classList.add ( 'cyHidden' );
	}
	
	if ( document.getElementById ( 'cyMenuBottom' ) ) {
		document.getElementById ( 'cyMenuBottom' ).classList.add ( 'cyHidden' );
	}
	
	if ( document.getElementById ( 'cyFooter' ) ) {
		document.getElementById ( 'cyFooter' ).classList.add ( 'cyHidden' );
	}
}
