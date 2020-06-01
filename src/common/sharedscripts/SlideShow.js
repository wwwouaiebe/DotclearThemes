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

Reminder:
- the newest post is the first post of the first page
- the oldest post is the last post of the last page
- the slideshow go always in the forward direction ( = from the newest post to the oldest post )
  except when it's needed to go to the last post of the previous page because the user have
  asked the previous post with the mouse or the keyboard and the first post of the page was displayed

-----------------------------------------------------------------------------------------------------------------------
*/

function slideShow ( dotclearVars ) {

	const MY_MIN_SLIDE_SHOW_WIDTH = 1280;
	const NOT_FOUND = -1;
	const PREVIOUS = -1;
	const MY_FIRST_POST_INDEX = 0;
	const ONE = 1;
	const NEXT = 1;
	const TWO = 2;

	let myCurrentPostIndex = null;
	let myCurrentPost = null;
	let myLastPostIndex = null;
	let myOlderPostsLink = null;
	let myNiewerPostsLink = null;
	let myPosts = null;
	let myTimeOutId = null;
	let myTimeOutDuration = 10000;
	let mySlideShowActive = 'yes';
	let myPostDirection = 'forward';

	/*
	--- myResizeCurrentPost function ----------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myResizeCurrentPost ( ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH < window.innerWidth ) {
			const IMG_MARGIN = 20;
			let screenHeight = window.innerHeight;
			let postClientRect = myCurrentPost.getBoundingClientRect ( );
			let topPost = postClientRect.y - document.documentElement.getBoundingClientRect ( ).y;
			if ( topPost + postClientRect.height > screenHeight ) {
				let imgElement = document.querySelector ( '#' + myCurrentPost.id + ' .cyPostMedias img' );
				if ( imgElement && ! imgElement.classList.contains ( 'cyPictureLandscape' ) ) {
					let imgScale =
						( imgElement.height - topPost - postClientRect.height + screenHeight - IMG_MARGIN )
						/
						imgElement.height;
					imgElement.style.width = String ( Number.parseInt ( imgScale * imgElement.width ) ) + 'px';
				}
			}
		}
	}

	/*
	--- myStopSlideShow function --------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myStopSlideShow ( ) {
		localStorage.setItem ( 'slideShowActive', 'no' );
		mySlideShowActive = 'no';
		if ( myTimeOutId ) {
			window.clearTimeout ( myTimeOutId );
			myTimeOutId = null;
		}
	}

	/*
	--- myAppendRestartSlideShow function -----------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myAppendRestartSlideShow ( postText ) {
		if ( ! document.querySelector ( '#' + myCurrentPost.id + ' .cyRestartSlideShow' ) ) {
			let restartElement = document.createElement ( 'p' );
			restartElement.innerHTML = dotclearVars.restartSlideShow;
			restartElement.classList.add ( 'cyRestartSlideShow' );
			postText.appendChild ( restartElement );
		}
	}

	/*
	--- myIsPostText function -----------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myIsPostText ( ) {
		let postText = document.querySelector ( '#' + myCurrentPost.id + ' .cyPostText' );
		if ( postText ) {
			myStopSlideShow ( );
			myAppendRestartSlideShow ( postText );
		}
	}

	/*
	--- myShowNextPreviousPost function -------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myShowNextPreviousPost ( delta ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH < window.innerWidth ) {
			myCurrentPost.classList.add ( 'cyHidden' );
			myCurrentPostIndex += ( delta || NEXT );
			if ( NOT_FOUND === myCurrentPostIndex ) {
				if ( myNiewerPostsLink ) {
					localStorage.setItem ( 'postDirection', 'backward' );
					myNiewerPostsLink.click ( );
					return;
				}
				myCurrentPostIndex = MY_FIRST_POST_INDEX;
			}
			if ( myPosts.length === myCurrentPostIndex ) {
				if ( myOlderPostsLink ) {
					localStorage.setItem ( 'postDirection', 'forward' );
					myOlderPostsLink.click ( );
					return;
				}
				myCurrentPostIndex = myLastPostIndex;
			}
			myCurrentPost = myPosts.item ( myCurrentPostIndex );
			myCurrentPost.classList.remove ( 'cyHidden' );
			myResizeCurrentPost ( );
			myIsPostText ( );
			if ( 'yes' === mySlideShowActive ) {
				if ( myTimeOutId ) {
					window.clearTimeout ( myTimeOutId );
				}
				myTimeOutId = window.setTimeout ( myShowNextPreviousPost, myTimeOutDuration );
			}
		}
	}

	/*
	--- myOnKeyDown function ------------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myOnKeyDown ( keyBoardEvent ) {
		const MIN_SLIDE_SHOW_DURATION = 2000;
		const MAX_SLIDE_SHOW_DURATION = 30000;
		const SLIDE_SHOW_INTERVAL = 1000;
		if ( MY_MIN_SLIDE_SHOW_WIDTH < window.innerWidth ) {
			switch ( keyBoardEvent.key ) {
			case 'Escape' :
			case 'Esc' :
				if ( 'yes' === mySlideShowActive ) {
					myStopSlideShow ( );
				}
				else {
					localStorage.setItem ( 'slideShowActive', 'yes' );
					mySlideShowActive = 'yes';
					myShowNextPreviousPost ( NEXT );
				}
				break;
			case '+' :
				myTimeOutDuration =
					MAX_SLIDE_SHOW_DURATION === myTimeOutDuration
						?
						MAX_SLIDE_SHOW_DURATION
						: myTimeOutDuration + SLIDE_SHOW_INTERVAL;
				localStorage.setItem ( 'timeOutDuration', myTimeOutDuration );
				break;
			case '-' :
				myTimeOutDuration =
					MIN_SLIDE_SHOW_DURATION === myTimeOutDuration
						?
						MIN_SLIDE_SHOW_DURATION
						:
						myTimeOutDuration - SLIDE_SHOW_INTERVAL;
				localStorage.setItem ( 'timeOutDuration', myTimeOutDuration );
				break;
			case 'ArrowRight' :
				myShowNextPreviousPost ( NEXT );
				break;
			case 'ArrowLeft' :
				myShowNextPreviousPost ( PREVIOUS );
				break;
			default :
				break;
			}
		}
	}

	/*
	--- myOnPostMouseLeave function -----------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myOnPostMouseLeave ( ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH < window.innerWidth ) {
			document.body.style.cursor = 'auto';
		}
	}

	/*
	--- myGetClientRect function --------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myGetClientRect ( ) {
		let rectElement = document.querySelector ( '#' + myCurrentPost.id + ' .cyPostMedias img' );
		if ( rectElement ) {
			return rectElement.getBoundingClientRect ( );
		}
		rectElement = document.querySelector ( '#' + myCurrentPost.id + ' .cyPostText' );
		if ( rectElement ) {
			return rectElement.getBoundingClientRect ( );
		}
		rectElement = document.querySelector ( '#' + myCurrentPost.id + ' .cyPostExcerpt' );
		if ( rectElement ) {
			return rectElement.getBoundingClientRect ( );
		}
		return null;
	}

	/*
	--- myOnPostMouse function ----------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myOnPostMouse ( mouseEvent ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH < window.innerWidth ) {
			let clientRect = myGetClientRect ( );
			if ( clientRect ) {
				if ( clientRect.width < mouseEvent.clientX - clientRect.x ) {
					document.body.style.cursor = 'auto';
				}
				else if ( clientRect.width / TWO < mouseEvent.clientX - clientRect.x ) {
					document.body.style.cursor =
						( ! myOlderPostsLink && myLastPostIndex === myCurrentPostIndex )
							?
							'auto'
							:
							'url(' + dotclearVars.blogThemeUrl + '/sharedpictures/right.png) 16 16,e-resize';
				}
				else {
					document.body.style.cursor =
						( ! myNiewerPostsLink && MY_FIRST_POST_INDEX === myCurrentPostIndex )
							?
							'auto'
							:
							'url(' + dotclearVars.blogThemeUrl + '/sharedpictures/left.png) 16 16,w-resize';
				}
			}
		}
	}

	/*
	--- myOnPostMouseClick function -----------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myOnPostMouseClick ( mouseEvent ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH < window.innerWidth ) {
			myShowNextPreviousPost ( ( myGetClientRect ( ).width / TWO > mouseEvent.offsetX ) ? PREVIOUS : NEXT );
		}
	}

	/*
	--- myHidePosts function ------------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myHidePosts ( ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH < window.innerWidth ) {
			myOlderPostsLink = document.querySelector ( '.cyPaginationPrevious' );
			myNiewerPostsLink = document.querySelector ( '.cyPaginationNext' );
			document.querySelectorAll ( '.cyPostTitleDate' ).forEach (
				postTitleDate => postTitleDate.classList.add ( 'cyHidden' )
			);
			myPosts = document.querySelectorAll ( '.cyPost' );
			myLastPostIndex = myPosts.length - ONE;
			myPosts.forEach (
				post => {
					post.classList.add ( 'cyHidden' );
					let postContent = post.children [ ONE ];
					postContent.addEventListener ( 'mousemove', myOnPostMouse, false );
					postContent.addEventListener ( 'mouseenter', myOnPostMouse, false );
					postContent.addEventListener ( 'mouseleave', myOnPostMouseLeave, false );
					postContent.addEventListener ( 'click', myOnPostMouseClick, false );
				}
			);
			myCurrentPostIndex = ( 'forward' === myPostDirection ) ? MY_FIRST_POST_INDEX : myLastPostIndex;
			myCurrentPost = myPosts.item ( myCurrentPostIndex );
			if ( myCurrentPost ) {
				myCurrentPost.classList.remove ( 'cyHidden' );
				myResizeCurrentPost ( );
				myIsPostText ( );
			}
		}
	}

	/*
	--- myHideFooter function -----------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function myHideFooter ( ) {
		if ( MY_MIN_SLIDE_SHOW_WIDTH < window.innerWidth ) {
			[
				'cyPagination',
				'cyPageCounter',
				'cyCopyright',
				'cyMenuBottom',
				'cyFooter'
			].forEach (
				elementId => {
					let elem = document.getElementById ( elementId );
					if ( elem ) {
						elem.classList.add ( 'cyHidden' );
					}
				}
			);
		}
	}

	/*
	--- mySetTimer function -------------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function mySetTimer ( ) {
		if ( myTimeOutId ) {
			window.clearTimeout ( myTimeOutId );
		}
		if ( 'yes' === mySlideShowActive ) {
			myTimeOutId = window.setTimeout ( myShowNextPreviousPost, myTimeOutDuration );
		}
	}

	/*
	--- main ----------------------------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	document.removeEventListener ( 'keydown', myOnKeyDown, true );
	document.removeEventListener ( 'load', mySetTimer, true );
	document.addEventListener ( 'keydown', myOnKeyDown, true );
	document.addEventListener ( 'load', mySetTimer, true );
	myTimeOutDuration = Number.parseInt ( localStorage.getItem ( 'timeOutDuration' ) || myTimeOutDuration );
	mySlideShowActive = localStorage.getItem ( 'slideShowActive' ) || 'yes';
	myPostDirection = localStorage.getItem ( 'postDirection' ) || 'forward';
	myHidePosts ( );
	myHideFooter ( );
	if ( 'backward' === myPostDirection ) {
		myPostDirection = 'forward';
		localStorage.setItem ( 'postDirection', 'forward' );
	}
}

export { slideShow };

/*
--- End of SlideShow.js file ------------------------------------------------------------------------------------------
*/