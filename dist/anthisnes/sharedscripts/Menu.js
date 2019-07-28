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
--- onPostMouseClick function ---
*/

function onPostMouseClick ( mouseEvent ) {
	console.log ( 'onPostMouseClick' );
	console.log ( currentPost );
	if ( ( mouseEvent.target.tagName === 'IMG' ) || ( mouseEvent.target.tagName === 'VIDEO' ) ) {
		var posts = document.getElementsByClassName ( 'cyPost' );
		var postContent = posts [ currentPost ].children [1];

		currentPost += ( mouseEvent.target.width / 2 > mouseEvent.offsetX ) ? -1 : 1;
		if ( -1 === currentPost )
		{
			if ( hasNextPage ) {
				if ( cyStorageAvailable ( 'localStorage' ) ) {
					localStorage.setItem ( 'postDirection', 'forward' );
				}
				document.getElementsByClassName ( 'cyPaginationNext' ) [ 0 ].click ( );
			}
			currentPost = 0;
			return;
		}
		if ( posts.length === currentPost )
		{
			if ( hasPreviousPage ){
				if ( cyStorageAvailable ( 'localStorage' ) ) {
					localStorage.setItem ( 'postDirection', 'backward' );
				}
				document.getElementsByClassName ( 'cyPaginationPrevious' ) [ 0 ].click ( );
			}
			currentPost --;
			return;
		}
		
		postContent.removeEventListener (
			'mousemove',
			onPostMouseMove,
			false
		);
		postContent.removeEventListener (
			'mouseleave',
			onPostMouseLeave,
			false
		);
		postContent.removeEventListener (
			'click',
			onPostMouseClick,
			false
		);
		
		console.log ( currentPost );
		for (var counter = 0; counter < posts.length; counter++) {
			posts [ counter ].classList.add ( 'cyHidden' );
		}
		posts [ currentPost ].classList.remove ( 'cyHidden' );
		postContent = posts [ currentPost ].children [1];
		postContent. addEventListener (
			'mousemove',
			onPostMouseMove,
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
	}
	document.body.style.cursor = 'auto';
}

/* 
--- onPostMouseLeave function ---
*/


function onPostMouseLeave ( mouseEvent ) {
	document.body.style.cursor = 'auto';
}

/* 
--- onPostMouseMove function ---
*/

function onPostMouseMove ( mouseEvent ) {
	console.log ( currentPost );
	console.log ( lastPost );
	console.log ( hasPreviousPage );
	console.log ( hasNextPage );
	if  ( ( mouseEvent.target.tagName === 'IMG' ) || ( mouseEvent.target.tagName === 'VIDEO' ) ) {
		if ( mouseEvent.target.width / 2 > mouseEvent.offsetX ) {
			document.body.style.cursor = ( hasNextPage && 0 === currentPost ) || 0 !== currentPost  ? 'url(/blog/themes/ouaie/sharedpictures/left.png) 16 16,w-resize' : 'auto';
		}
		else  {
			document.body.style.cursor = (  hasPreviousPage && lastPost === currentPost ) || lastPost !== currentPost ? 'url(/blog/themes/ouaie/sharedpictures/right.png) 16 16,e-resize' : 'auto';
		}
	}
	else {
		document.body.style.cursor = 'auto';
	}
}

/* 
--- cyStartMenu function ---
*/

var currentPost = null;
var lastPost = null;
var hasPreviousPage = false;
var hasNextPage = false;

function cyStartMenu ( ) {
	
	if ( 0 < document.getElementsByClassName ( 'cyPaginationPrevious' ).length ) {
		hasPreviousPage = true;
	}
	if ( 0 < document.getElementsByClassName ( 'cyPaginationNext' ).length ) {
		hasNextPage = true;
	}
	
	document.getElementsByTagName ( 'body' ) [0].classList.add ( 'cyJSPage' );
	addClassAll ( 'cyHiddenMenuPart' );
	
	var postDirection = 'forward';
	if ( cyStorageAvailable ( 'localStorage' ) ) {
		var currentMenu = localStorage.getItem ( 'currentMenu' );
		if ( currentMenu && '' !== currentMenu ) {
			removeClass ( currentMenu, 'cyHiddenMenuPart' );
		}
		var tmpPostDirection = localStorage.getItem ( 'postDirection' );
		if ( tmpPostDirection  && '' != tmpPostDirection) {
			postDirection = tmpPostDirection;
		}
		localStorage.setItem ( 'postDirection', '' );
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
	
	var postTitleDate = document.getElementsByClassName ( 'cyPostTitleDate' );
	for (var counter = 0; counter < postTitleDate.length; counter++) {
		postTitleDate [ counter ].classList.add ( 'cyHidden' );
	}
	
	var posts = document.getElementsByClassName ( 'cyPost' );
	lastPost = posts.length - 1;
	for ( counter = 0; counter < posts.length; counter++) {
		posts [ counter ].classList.add ( 'cyHidden' );
	}
	
	currentPost = ( 'forward' === postDirection ) ?  lastPost : 0;
	
	if ( posts [ currentPost ] ) {
		posts [ currentPost ].classList.remove ( 'cyHidden' );
		var postContent = posts [ currentPost ].children [1];
		postContent.addEventListener (
			'mousemove',
			onPostMouseMove,
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
	}
}












