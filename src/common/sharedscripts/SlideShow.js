/*
Copyright - 2019 - wwwouaiebe - Contact: http//www.ouaie.be/

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

/*
--- SlideShow.js file -------------------------------------------------------------------------------------------------
This file contains:
	- the slideShow function
Changes:
	- v1.4.0:
		- Migration to ES6, esLint and Rollup
Doc reviewed 20200527

-----------------------------------------------------------------------------------------------------------------------
*/

/*
--- slideShow function ------------------------------------------------------------------------------------------------

-----------------------------------------------------------------------------------------------------------------------
*/

function slideShow ( ) {

	const MY_MIN_SLIDE_SHOW_WIDTH = 1281;
	const MY_MAX_SLIDE_SHOW_DURATION = 30000;
	const MY_MIN_SLIDE_SHOW_DURATION = 2000;
	const MY_SLIDE_SHOW_INTERVAL = 1000;

	const MY_NOT_FOUND = -1;
	const PREVIOUS_POST = -1;

	const ZERO = 0;
	const MY_FIRST_POST = 0;

	const ONE = 1;
	const MY_NEXT_POST = 1;

	const TWO = 2;

	const MY_IMG_MARGIN = 20;

	let myCurrentPost = null;
	let myLastPost = null;
	let myHasPreviousPage = false;
	let myHasNextPage = false;
	let myPosts = null;
	let myTimeOutId = null;
	let myTimeOutDuration = 10000;
	let myBlogThemeUrl = '';

	/*
	--- myResizeCurrentPost function ----------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myResizeCurrentPost ( ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH > window.innerWidth ) {
			return;
		}
		let screenHeight = window.innerHeight;
		let clientRect = myPosts [ myCurrentPost ].getBoundingClientRect ( );
		let topHeight = clientRect.y - document.documentElement.getBoundingClientRect ( ).y;
		if ( topHeight + clientRect.height > screenHeight ) {
			let imgElement = null;
			let postContent = myPosts [ myCurrentPost ].children [ ONE ];

			for ( let counter = ZERO; counter < postContent.children.length; counter ++ ) {
				if ( postContent.children [ counter ].classList.contains ( 'cyPostMedias' ) ) {
					imgElement = postContent.children [ counter ].firstElementChild.firstElementChild;
					if ( 'IMG' !== imgElement.tagName ) {
						imgElement = null;
					}
					break;
				}
			}
			if ( imgElement && ! imgElement.classList.contains ( 'cyPictureLandscape' ) ) {
				let imgScale =
					( imgElement.height - topHeight - clientRect.height + screenHeight - MY_IMG_MARGIN ) / imgElement.height;
				imgElement.style.width = String ( Number.parseInt ( imgScale * imgElement.width ) ) + 'px';
			}
		}
	}

	/*
	--- myShowNextPreviousPost function -------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myShowNextPreviousPost ( delta ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH > window.innerWidth ) {
			return;
		}

		let previousPost = myCurrentPost;
		myCurrentPost += ( delta || MY_NEXT_POST );

		if ( MY_NOT_FOUND === myCurrentPost ) {
			if ( myHasNextPage ) {
				localStorage.setItem ( 'postDirection', 'backward' );
				document.getElementsByClassName ( 'cyPaginationNext' ) [ ZERO ].click ( );
			}
			myCurrentPost = MY_FIRST_POST;
			return;
		}
		if ( myPosts.length === myCurrentPost ) {
			if ( myHasPreviousPage ) {
				localStorage.setItem ( 'postDirection', 'forward' );
				document.getElementsByClassName ( 'cyPaginationPrevious' ) [ ZERO ].click ( );
			}
			myCurrentPost --;
			return;
		}

		myPosts [ previousPost ].classList.add ( 'cyHidden' );
		myPosts [ myCurrentPost ].classList.remove ( 'cyHidden' );

		myResizeCurrentPost ( );

		if ( 'yes' === localStorage.getItem ( 'timeOut' ) ) {
			if ( myTimeOutId ) {
				window.clearTimeout ( myTimeOutId );
			}
			myTimeOutId = window.setTimeout ( myShowNextPreviousPost, myTimeOutDuration );
		}
	}

	/*
	--- myOnKeyDown function ------------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myOnKeyDown ( keyBoardEvent ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH > window.innerWidth ) {
			return;
		}
		switch ( keyBoardEvent.key ) {
		case 'Escape' :
		case 'Esc' :
			if ( myTimeOutId ) {
				window.clearTimeout ( myTimeOutId );
				myTimeOutId = null;
				localStorage.setItem ( 'timeOut', 'no' );
			}
			else {
				localStorage.setItem ( 'timeOut', 'yes' );
				myShowNextPreviousPost ( MY_NEXT_POST );
				myTimeOutId = window.setTimeout ( myShowNextPreviousPost, myTimeOutDuration );
			}
			break;
		case '+' :
			myTimeOutDuration =
				MY_MAX_SLIDE_SHOW_DURATION === myTimeOutDuration
					?
					MY_MAX_SLIDE_SHOW_DURATION
					: myTimeOutDuration + MY_SLIDE_SHOW_INTERVAL;
			localStorage.setItem ( 'timeOutDuration', myTimeOutDuration );
			break;
		case '-' :
			myTimeOutDuration =
				MY_MIN_SLIDE_SHOW_DURATION === myTimeOutDuration
					?
					MY_MIN_SLIDE_SHOW_DURATION
					:
					myTimeOutDuration - MY_SLIDE_SHOW_INTERVAL;
			localStorage.setItem ( 'timeOutDuration', myTimeOutDuration );
			break;
		case 'ArrowRight' :
			myShowNextPreviousPost ( MY_NEXT_POST );
			break;
		case 'ArrowLeft' :
			myShowNextPreviousPost ( PREVIOUS_POST );
			break;
		default :
			break;
		}
	}

	/*
	--- myOnPostMouseLeave function -----------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myOnPostMouseLeave ( ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH > window.innerWidth ) {
			return;
		}
		document.body.style.cursor = 'auto';
	}

	/*
	--- myGetClientRect function --------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myGetClientRect ( ) {
		if ( MY_NOT_FOUND !== myPosts [ myCurrentPost ].haveMedia ) {
			return myPosts [ myCurrentPost ]
				.children [ ONE ]
				.children [ myPosts [ myCurrentPost ].haveMedia ]
				.firstElementChild
				.firstElementChild
				.getBoundingClientRect ( );
		}
		else if ( MY_NOT_FOUND !== myPosts [ myCurrentPost ].haveText ) {
			return myPosts [ myCurrentPost ]
				.children [ ONE ]
				.children [ myPosts [ myCurrentPost ].haveText ]
				.getBoundingClientRect ( );
		}
		else if ( MY_NOT_FOUND !== myPosts [ myCurrentPost ].haveExcerpt ) {
			return myPosts [ myCurrentPost ]
				.children [ ONE ]
				.children [ myPosts [ myCurrentPost ].haveExcerpt ]
				.getBoundingClientRect ( );
		}
		return null;
	}

	/*
	--- myOnPostMouse function ----------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myOnPostMouse ( mouseEvent ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH > window.innerWidth ) {
			return;
		}
		let clientRect = myGetClientRect ( );
		if ( clientRect ) {
			if ( clientRect.width < mouseEvent.clientX - clientRect.x ) {
				document.body.style.cursor = 'auto';
			}
			else if ( clientRect.width / TWO < mouseEvent.clientX - clientRect.x ) {
				document.body.style.cursor =
					( myHasPreviousPage && myLastPost === myCurrentPost ) || myLastPost !== myCurrentPost
						?
						'url(' + myBlogThemeUrl + '/sharedpictures/right.png) 16 16,e-resize'
						:
						'auto';
			}
			else {
				document.body.style.cursor =
					( myHasNextPage && MY_FIRST_POST === myCurrentPost ) || MY_FIRST_POST !== myCurrentPost
						?
						'url(' + myBlogThemeUrl + '/sharedpictures/left.png) 16 16,w-resize'
						:
						'auto';
			}
		}
	}

	/*
	--- myOnPostMouseClick function -----------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myOnPostMouseClick ( mouseEvent ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH > window.innerWidth ) {
			return;
		}

		myShowNextPreviousPost ( ( myGetClientRect ( ).width / TWO > mouseEvent.offsetX ) ? PREVIOUS_POST : MY_NEXT_POST );
	}

	/*
	--- myHidePosts function ------------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myHidePosts ( ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH > window.innerWidth ) {
			return;
		}
		if ( ZERO < document.getElementsByClassName ( 'cyPaginationPrevious' ).length ) {
			myHasPreviousPage = true;
		}
		if ( ZERO < document.getElementsByClassName ( 'cyPaginationNext' ).length ) {
			myHasNextPage = true;
		}

		let postDirection = 'forward';
		let tmpPostDirection = localStorage.getItem ( 'postDirection' );
		if ( tmpPostDirection && '' !== tmpPostDirection ) {
			postDirection = tmpPostDirection;
		}
		localStorage.setItem ( 'postDirection', '' );

		let postTitleDate = document.getElementsByClassName ( 'cyPostTitleDate' );
		for ( let counter = ZERO; counter < postTitleDate.length; counter ++ ) {
			postTitleDate [ counter ].classList.add ( 'cyHidden' );
		}

		myPosts = document.getElementsByClassName ( 'cyPost' );
		myLastPost = myPosts.length - ONE;
		for ( let counter = ZERO; counter < myPosts.length; counter ++ ) {
			myPosts [ counter ].classList.add ( 'cyHidden' );

			let postContent = myPosts [ counter ].children [ ONE ];

			// the 4 events are needed!!!
			postContent.addEventListener (
				'mousemove',
				myOnPostMouse,
				false
			);
			postContent.addEventListener (
				'mouseenter',
				myOnPostMouse,
				false
			);
			postContent.addEventListener (
				'mouseleave',
				myOnPostMouseLeave,
				false
			);
			postContent.addEventListener (
				'click',
				myOnPostMouseClick,
				false
			);

			myPosts [ counter ].haveExcerpt = MY_NOT_FOUND;
			myPosts [ counter ].haveMedia = MY_NOT_FOUND;
			myPosts [ counter ].haveText = MY_NOT_FOUND;

			for ( let childCounter = ZERO; childCounter < postContent.children.length; childCounter ++ ) {
				if ( postContent.children [ childCounter ].classList.contains ( 'cyPostExcerpt' ) ) {
					myPosts [ counter ].haveExcerpt = childCounter;
				}
				if ( postContent.children [ childCounter ].classList.contains ( 'cyPostMedias' ) ) {
					myPosts [ counter ].haveMedia = childCounter;
				}
				if ( postContent.children [ childCounter ].classList.contains ( 'cyPostText' ) ) {
					myPosts [ counter ].haveText = childCounter;
				}
			}
		}

		myCurrentPost = ( 'forward' === postDirection ) ? MY_FIRST_POST : myLastPost;

		if ( myPosts [ myCurrentPost ] ) {
			myPosts [ myCurrentPost ].classList.remove ( 'cyHidden' );
			myResizeCurrentPost ( );
		}
	}

	/*
	--- myHideFooter function -----------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myHideFooter ( ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH > window.innerWidth ) {
			return;
		}
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

	/*
	--- myParse function ----------------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myParse ( ) {
		let parser = new DOMParser ();
		let xmlDoc =
			parser.parseFromString ( document.getElementById ( 'cyDotclearVars' ).childNodes[ ZERO ].data, 'text/xml' );
		myBlogThemeUrl =
			xmlDoc.getElementsByTagName ( 'cyBlogThemeURL' ) [ ZERO ].attributes.getNamedItem ( 'value' ).nodeValue;
	}

	/*
	--- mySetTimer function -------------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function mySetTimer ( ) {
		document.removeEventListener ( 'load', mySetTimer, true );
		if ( myTimeOutId ) {
			window.clearTimeout ( myTimeOutId );
		}
		myTimeOutDuration = localStorage.getItem ( 'timeOutDuration' ) || myTimeOutDuration;
		myTimeOutDuration = Number.parseInt ( myTimeOutDuration );

		let timeOut = localStorage.getItem ( 'timeOut' ) || 'yes';
		localStorage.setItem ( 'timeOut', timeOut );
		if ( 'yes' === timeOut ) {
			myTimeOutId = window.setTimeout ( myShowNextPreviousPost, myTimeOutDuration );
		}
	}

	/*
	--- main ----------------------------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	myParse ( );

	document.removeEventListener ( 'keydown', myOnKeyDown, true );
	document.addEventListener ( 'keydown', myOnKeyDown, true );
	document.addEventListener ( 'load', mySetTimer, true );

	myHidePosts ( );
	myHideFooter ( );

}

export { slideShow };

/*
--- End of SlideShow.js file ------------------------------------------------------------------------------------------
*/