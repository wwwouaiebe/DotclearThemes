(function () {
	'use strict';

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
	--- ColorChooser.js file ----------------------------------------------------------------------------------------------
	This file contains:
		- the colorChooser function
	Changes:
		- v1.4.0:
			- Migration to ES6, esLint and Rollup
	Doc reviewed 20200527

	-----------------------------------------------------------------------------------------------------------------------
	*/

	/*
	--- colorChooser function ---------------------------------------------------------------------------------------------

	-----------------------------------------------------------------------------------------------------------------------
	*/

	function colorChooser ( dotclearVars ) {

		/*
		--- myChangeColorStyle function -----------------------------------------------------------------------------------

		-------------------------------------------------------------------------------------------------------------------
		*/

		function myChangeColorStyle ( ) {
			let currentStyle = localStorage.getItem ( 'style' );

			let colorChooserTopAnchor = document.getElementById ( 'cyColorChooserMenuTop' );
			let colorChooserBottomAnchor = document.getElementById ( 'cyColorChooserMenuBottom' );

			if ( 'cyStandardColor' === currentStyle ) {

				colorChooserTopAnchor.innerHTML = dotclearVars.colorChooserContraste;
				colorChooserTopAnchor.title = dotclearVars.colorChooserContrasteTitle;
				if ( colorChooserBottomAnchor ) {
					colorChooserBottomAnchor.innerHTML = dotclearVars.colorChooserContraste;
					colorChooserBottomAnchor.title = dotclearVars.colorChooserContrasteTitle;
				}
				document.body.classList.add ( 'cyAlternateColor' );
				document.body.classList.remove ( 'cyStandardColor' );
				localStorage.setItem ( 'style', 'cyAlternateColor' );
			}
			else {
				colorChooserTopAnchor.innerHTML = dotclearVars.colorChooserNormal;
				colorChooserTopAnchor.title = dotclearVars.colorChooserNormalTitle;
				if ( colorChooserBottomAnchor ) {
					colorChooserBottomAnchor.innerHTML = dotclearVars.colorChooserNormal;
					colorChooserBottomAnchor.title = dotclearVars.colorChooserNormalTitle;
				}
				document.body.classList.add ( 'cyStandardColor' );
				document.body.classList.remove ( 'cyAlternateColor' );
				localStorage.setItem ( 'style', 'cyStandardColor' );
			}

		}

		/*
		--- myAddColorMenuItem function -----------------------------------------------------------------------------------

		-------------------------------------------------------------------------------------------------------------------
		*/

		function myAddColorMenuItem ( ) {
			let currentStyle = localStorage.getItem ( 'style' ) || 'cyStandardColor';
			localStorage.setItem ( 'style', currentStyle );

			let colorChooserTopAnchor = null;
			let colorChooserBottomAnchor = null;
			if ( document.getElementById ( 'cyMainMenu' ) ) {
				let colorChooserTopLi = document.createElement ( 'li' );
				colorChooserTopLi.classList.add ( 'cyMenuItem' );
				colorChooserTopAnchor = document.createElement ( 'a' );
				colorChooserTopAnchor.addEventListener ( 'click', myChangeColorStyle, false );
				colorChooserTopAnchor.id = 'cyColorChooserMenuTop';
				colorChooserTopLi.appendChild ( colorChooserTopAnchor );
				if ( document.getElementById ( 'cyPagesMenuTop' ) ) {
					document.getElementById ( 'cyPagesMenuTop' ).appendChild ( colorChooserTopLi );
				}

				let menuBottom = document.getElementById ( 'cyPagesMenuBottom' );
				if ( menuBottom ) {
					let colorChooserBottomLi = document.createElement ( 'li' );
					colorChooserBottomLi.classList.add ( 'cyMenuItem' );
					colorChooserBottomAnchor = document.createElement ( 'a' );
					colorChooserBottomAnchor.addEventListener ( 'click', myChangeColorStyle, false );
					colorChooserBottomAnchor.id = 'cyColorChooserMenuBottom';
					colorChooserBottomLi.appendChild ( colorChooserBottomAnchor );
					document.getElementById ( 'cyPagesMenuBottom' ).appendChild ( colorChooserBottomLi );
				}
			}
			else if ( document.getElementById ( 'cyMenu' ) ) {

				// Only www.ouaie.be home page have a cyMenu id...
				let colorMenuItem = document.createElement ( 'div' );
				colorMenuItem.innerHTML =
					'<h5>\
					<a id="cyContrastViewBottom">\
						<img src="sharedpictures/contraste.png" class="cyMenuThumbnail"  alt="Affichage" />\
					</a>\
				</h5>\
				<div>\
					<p>\
						<a id="cyColorChooserMenuTop" title="Passer en affichage normal" >Affichage normal</a>\
					</p>\
				</div>';
				colorMenuItem.classList.add ( 'cyMenuItem' );
				colorMenuItem.classList.add ( 'cyMenuTooltip' );
				document.getElementById ( 'cyMenu' ).appendChild ( colorMenuItem );
				colorChooserTopAnchor = document.getElementById ( 'cyColorChooserMenuTop' );
				colorChooserTopAnchor.addEventListener ( 'click', myChangeColorStyle, false );
			}

			if ( 'cyStandardColor' === currentStyle ) {
				colorChooserTopAnchor.innerHTML = dotclearVars.colorChooserNormal;
				colorChooserTopAnchor.title = dotclearVars.colorChooserNormalTitle;
				if ( colorChooserBottomAnchor ) {
					colorChooserBottomAnchor.innerHTML = dotclearVars.colorChooserNormal;
					colorChooserBottomAnchor.title = dotclearVars.colorChooserNormalTitle;
				}
			}
			else {
				colorChooserTopAnchor.innerHTML = dotclearVars.colorChooserContraste;
				colorChooserTopAnchor.title = dotclearVars.colorChooserContrasteTitle;
				if ( colorChooserBottomAnchor ) {
					colorChooserBottomAnchor.innerHTML = dotclearVars.colorChooserContraste;
					colorChooserBottomAnchor.title = dotclearVars.colorChooserContrasteTitle;
				}
				document.body.classList.add ( 'cyAlternateColor' );
				document.body.classList.remove ( 'cyStandardColor' );
			}
		}

		/*
		--- main ----------------------------------------------------------------------------------------------------------

		-------------------------------------------------------------------------------------------------------------------
		*/

		myAddColorMenuItem ( );
	}

	/*
	--- End of ColorChooser.js file ---------------------------------------------------------------------------------------
	*/

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
	--- MenuModifier.js file ----------------------------------------------------------------------------------------------
	This file contains:
		- the menuModifier function
	Changes:
		- v1.4.0:
			- Migration to ES6, esLint and Rollup
	Doc reviewed 20200527

	-----------------------------------------------------------------------------------------------------------------------
	*/

	/*
	--- menuModifier function ---------------------------------------------------------------------------------------------

	-----------------------------------------------------------------------------------------------------------------------
	*/

	function menuModifier ( ) {

		/*
		--- myRemoveClass function ----------------------------------------------------------------------------------------

		-------------------------------------------------------------------------------------------------------------------
		*/

		function myRemoveClass ( menuPart, className ) {
			document.getElementById ( menuPart ).classList.remove ( className );
		}

		/*
		--- myAddClassAll function ----------------------------------------------------------------------------------------

		-------------------------------------------------------------------------------------------------------------------
		*/

		function myAddClassAll ( className ) {
			[
				'cyCategoriesMenuTop',
				'cyTagsMenuTop',
				'cyArchivesMenuTop',
				'cyPagesMenuTop',
				'cyNearMenuTop',
				'cyCategoriesTitleTop',
				'cyTagsTitleTop',
				'cyArchivesTitleTop',
				'cyPagesTitleTop',
				'cyNearTitleTop'
			].forEach (
				function ( item ) {
					if ( document.getElementById ( item ) ) {
						document.getElementById ( item ).classList.add ( className );
					}
				}
			);
		}

		/*
		--- myToggleMenuPart function -------------------------------------------------------------------------------------

		-------------------------------------------------------------------------------------------------------------------
		*/

		function myToggleMenuPart ( menuTitle, menuPart ) {
			let currentMenu = localStorage.getItem ( 'currentMenu' ) || '';
			let currentTitle = localStorage.getItem ( 'currentTitle' ) || '';
			myAddClassAll ( 'cyHiddenMenuPart' );
			if ( currentMenu === menuPart ) {
				currentMenu = '';
				currentTitle = '';
			}
			else {
				myRemoveClass ( menuPart, 'cyHiddenMenuPart' );
				myRemoveClass ( menuTitle, 'cyHiddenMenuPart' );
				currentMenu = menuPart;
				currentTitle = menuTitle;
			}
			localStorage.setItem ( 'currentMenu', currentMenu );
			localStorage.setItem ( 'currentTitle', currentTitle );
		}

		/*
		--- myHideMenu function -------------------------------------------------------------------------------------------

		-------------------------------------------------------------------------------------------------------------------
		*/

		function myHideMenu ( ) {
			myAddClassAll ( 'cyHiddenMenuPart' );

			let currentMenu = localStorage.getItem ( 'currentMenu' ) || '';
			if ( '' !== currentMenu ) {
				myRemoveClass ( currentMenu, 'cyHiddenMenuPart' );
			}

			let currentTitle = localStorage.getItem ( 'currentTitle' ) || '';
			if ( '' !== currentTitle ) {
				myRemoveClass ( currentTitle, 'cyHiddenMenuPart' );
			}

			document.getElementById ( 'cyCategoriesTitleTop' ).addEventListener (
				'click',
				( ) => myToggleMenuPart ( 'cyCategoriesTitleTop', 'cyCategoriesMenuTop' ),
				false
			);
			if ( document.getElementById ( 'cyNearTitleTop' ) ) {
				document.getElementById ( 'cyNearTitleTop' ).addEventListener (
					'click',
					( ) => myToggleMenuPart ( 'cyNearTitleTop', 'cyNearMenuTop' ),
					false
				);
			}
			document.getElementById ( 'cyTagsTitleTop' ).addEventListener (
				'click',
				( ) => myToggleMenuPart ( 'cyTagsTitleTop', 'cyTagsMenuTop' ),
				false
			);
			document.getElementById ( 'cyArchivesTitleTop' ).addEventListener (
				'click',
				( ) => myToggleMenuPart ( 'cyArchivesTitleTop', 'cyArchivesMenuTop' ),
				false
			);
			document.getElementById ( 'cyPagesTitleTop' ).addEventListener (
				'click',
				( ) => myToggleMenuPart ( 'cyPagesTitleTop', 'cyPagesMenuTop' ),
				false
			);
		}

		/*
		--- main ----------------------------------------------------------------------------------------------------------

		-------------------------------------------------------------------------------------------------------------------
		*/

		myHideMenu ( );

	}

	/*
	--- End of MenuModifier.js file ---------------------------------------------------------------------------------------
	*/

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

	/*
	--- End of SlideShow.js file ------------------------------------------------------------------------------------------
	*/

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
	-----------------------------------------------------------------------------------------------------------------------

	Why doing it simple when you can do it complex?

	-----------------------------------------------------------------------------------------------------------------------
	*/

	const co66 = 66;
	const co13 = 13;
	const AHAH = 186;
	const co114 = 114;
	const co117 = 117;
	const co111 = 111;
	const co106 = 106;
	const co110 = 110;
	const co98 = 98;
	const co3 = 3;
	const co205 = 2.05;
	const co1 = 1;
	const zer = 0;

	function computeFR ( ) {
		let iSum = Number.parseInt ( document.getElementById ( 'cyNumberFR' ).value );
		if ( co66 + co13 === iSum ) {
			let arr = [ co114, co117, co111, co106, co110, co111, co98 ];
			arr.reverse ( );
			let addr =
				new TextDecoder ( ).decode ( new Uint8Array ( arr.concat ( [ Math.floor ( ( AHAH / co3 ) + co205 ) ] ) ) ) +
				window.location.hostname.split ( '.' ).reverse ( ) [ co1 ] +
				'.' +
				window.location.hostname.split ( '.' ).reverse ( ) [ zer ];
			{
				let mailLink = document.createElement ( 'a' );
				mailLink.href = 'mailto:' + addr;
				mailLink.click ( );
			}
			navigator.clipboard.writeText ( addr )
				.then (
					( ) => {
						document.getElementById ( 'cyClipboardFR' ).innerHTML =
							'L\'adresse mail a également été passée dans le presse-papier de votre ordinateur.';
					}
				)
				.catch ( ( ) => console.log ( 'failed to copy to the clipboard' ) );
			document.getElementById ( 'cyMailFR' ).innerHTML =
				'Bravo! Vous êtes doué. Patientez un instant, votre mail va s\'ouvrir.';
		}
		else {
			document.getElementById ( 'cyMailFR' ).innerHTML = 'Oufti biesse. Null en math.';
		}
		document.getElementById ( 'cyButtonFR' ).style.visibility = 'hidden';
		document.getElementById ( 'cyButtonEN' ).style.visibility = 'hidden';
	}

	function computeEN ( ) {
		let iSum = Number.parseInt ( document.getElementById ( 'cyNumberEN' ).value );
		if ( co66 + co13 === iSum ) {
			let arr = [ co114, co117, co111, co106, co110, co111, co98 ];
			arr.reverse ( );
			let addr =
				new TextDecoder ( ).decode ( new Uint8Array ( arr.concat ( [ Math.floor ( ( AHAH / co3 ) + co205 ) ] ) ) ) +
				window.location.hostname.split ( '.' ).reverse ( ) [ co1 ] +
				'.' +
				window.location.hostname.split ( '.' ).reverse ( ) [ zer ];
			{
				let mailLink = document.createElement ( 'a' );
				mailLink.href = 'mailto:' + addr;
				mailLink.click ( );
			}
			navigator.clipboard.writeText ( addr )
				.then (
					( ) => {
						document.getElementById ( 'cyClipboardEN' ).innerHTML =
							'The email address has also been passed to your computer\'s clipboard.';
					}
				)
				.catch ( ( ) => console.log ( 'failed to copy to the clipboard' ) );
			document.getElementById ( 'cyMailEN' ).innerHTML =
				'Excellent! You are very good. Wait a moment, your email will open.';
		}
		else {
			document.getElementById ( 'cyMailEN' ).innerHTML = 'You are stupid.';
		}
		document.getElementById ( 'cyButtonFR' ).style.visibility = 'hidden';
		document.getElementById ( 'cyButtonEN' ).style.visibility = 'hidden';
	}

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

	const ZERO = 0;

	/*
	--- getDotclearVars function ------------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------------------------
	*/

	function getDotclearVars ( ) {
		let parser = new DOMParser ();
		let xmlDoc =
			parser.parseFromString ( document.getElementById ( 'cyDotclearVars' ).childNodes[ ZERO ].data, 'text/xml' );
		function getXmlValue ( valueTagName ) {
			return xmlDoc.getElementsByTagName ( valueTagName ) [ ZERO ].attributes.getNamedItem ( 'value' ).nodeValue;
		}
		return {
			colorChooserContraste : getXmlValue ( 'cyColorChooserContraste' ),
			colorChooserNormal : getXmlValue ( 'cyColorChooserNormal' ),
			colorChooserContrasteTitle : getXmlValue ( 'cyColorChooserContrasteTitle' ),
			colorChooserNormalTitle : getXmlValue ( 'cyColorChooserNormalTitle' ),
			restartSlideShow : getXmlValue ( 'cyRestartSlideShow' ),
			blogThemeUrl : getXmlValue ( 'cyBlogThemeURL' )
		};
	}

	/*
	--- haveLocalStorage function -----------------------------------------------------------------------------------------

	-----------------------------------------------------------------------------------------------------------------------
	*/

	function haveLocalStorage ( ) {
		try {
			let	testStorage = '__storage_test__';
			localStorage.setItem ( testStorage, testStorage );
			localStorage.removeItem ( testStorage );
			return true;
		}
		catch ( err ) {
			return false;
		}
	}

	/*
	--- main --------------------------------------------------------------------------------------------------------------

	-----------------------------------------------------------------------------------------------------------------------
	*/

	if ( haveLocalStorage ( ) ) {
		let dotclearVars = getDotclearVars ( );
		colorChooser ( dotclearVars );

		if ( document.getElementById ( 'cyMainMenu' ) ) {
			document.querySelector ( 'body' ).classList.add ( 'cyJSPage' );
			menuModifier ( );
			if ( document.getElementById ( 'cyHome' ) ) {
				slideShow ( dotclearVars );
			}
		}
	}

	let mailButtonFr = document.getElementById ( 'cyButtonFR' );
	if ( mailButtonFr ) {
		mailButtonFr.addEventListener ( 'click', computeFR );
	}

	let mailButtonEn = document.getElementById ( 'cyButtonEN' );
	if ( mailButtonEn ) {
		mailButtonEn.addEventListener ( 'click', computeEN );
	}

	/*
	--- End of starter.js file --------------------------------------------------------------------------------------------
	*/

}());
