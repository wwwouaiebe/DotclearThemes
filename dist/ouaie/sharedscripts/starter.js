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

	function colorChooser ( ) {

		const ZERO = 0;

		let myLanguage = {};

		/*
		--- myParse function ----------------------------------------------------------------------------------------------

		-------------------------------------------------------------------------------------------------------------------
		*/

		function myParse ( ) {
			let parser = new DOMParser ();
			let xmlDoc =
				parser.parseFromString ( document.getElementById ( 'cyDotclearVars' ).childNodes[ ZERO ].data, 'text/xml' );
			myLanguage = {
				colorChooserContraste :
					xmlDoc.getElementsByTagName ( 'cyColorChooserContraste' ) [ ZERO ]
						.attributes.getNamedItem ( 'value' ).nodeValue,
				colorChooserNormal :
					xmlDoc.getElementsByTagName ( 'cyColorChooserNormal' ) [ ZERO ]
						.attributes.getNamedItem ( 'value' ).nodeValue,
				colorChooserContrasteTitle :
					xmlDoc.getElementsByTagName ( 'cyColorChooserContrasteTitle' ) [ ZERO ]
						.attributes.getNamedItem ( 'value' ).nodeValue,
				colorChooserNormalTitle :
					xmlDoc.getElementsByTagName ( 'cyColorChooserNormalTitle' ) [ ZERO ]
						.attributes.getNamedItem ( 'value' ).nodeValue
			};
		}

		/*
		--- myChangeColorStyle function -----------------------------------------------------------------------------------

		-------------------------------------------------------------------------------------------------------------------
		*/

		function myChangeColorStyle ( ) {
			let currentStyle = localStorage.getItem ( 'style' );

			let colorChooserTopAnchor = document.getElementById ( 'cyColorChooserMenuTop' );
			let colorChooserBottomAnchor = document.getElementById ( 'cyColorChooserMenuBottom' );

			if ( 'cyStandardColor' === currentStyle ) {

				colorChooserTopAnchor.innerHTML = myLanguage.colorChooserContraste;
				colorChooserTopAnchor.title = myLanguage.colorChooserContrasteTitle;
				if ( colorChooserBottomAnchor ) {
					colorChooserBottomAnchor.innerHTML = myLanguage.colorChooserContraste;
					colorChooserBottomAnchor.title = myLanguage.colorChooserContrasteTitle;
				}
				document.body.classList.add ( 'cyAlternateColor' );
				document.body.classList.remove ( 'cyStandardColor' );
				localStorage.setItem ( 'style', 'cyAlternateColor' );
			}
			else {
				colorChooserTopAnchor.innerHTML = myLanguage.colorChooserNormal;
				colorChooserTopAnchor.title = myLanguage.colorChooserNormalTitle;
				if ( colorChooserBottomAnchor ) {
					colorChooserBottomAnchor.innerHTML = myLanguage.colorChooserNormal;
					colorChooserBottomAnchor.title = myLanguage.colorChooserNormalTitle;
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
				colorChooserTopAnchor.innerHTML = myLanguage.colorChooserNormal;
				colorChooserTopAnchor.title = myLanguage.colorChooserNormalTitle;
				if ( colorChooserBottomAnchor ) {
					colorChooserBottomAnchor.innerHTML = myLanguage.colorChooserNormal;
					colorChooserBottomAnchor.title = myLanguage.colorChooserNormalTitle;
				}
			}
			else {
				colorChooserTopAnchor.innerHTML = myLanguage.colorChooserContraste;
				colorChooserTopAnchor.title = myLanguage.colorChooserContrasteTitle;
				if ( colorChooserBottomAnchor ) {
					colorChooserBottomAnchor.innerHTML = myLanguage.colorChooserContraste;
					colorChooserBottomAnchor.title = myLanguage.colorChooserContrasteTitle;
				}
				document.body.classList.add ( 'cyAlternateColor' );
				document.body.classList.remove ( 'cyStandardColor' );
			}
		}

		/*
		--- main ----------------------------------------------------------------------------------------------------------

		-------------------------------------------------------------------------------------------------------------------
		*/

		myParse ( );

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

	-----------------------------------------------------------------------------------------------------------------------
	*/

	function slideShow ( ) {

		const MY_MIN_SLIDE_SHOW_WIDTH = 1280;
		const MY_MIN_SLIDE_SHOW_DURATION = 2000;
		const MY_MAX_SLIDE_SHOW_DURATION = 30000;
		const MY_SLIDE_SHOW_INTERVAL = 1000;

		const NOT_FOUND = -1;
		const PREVIOUS = -1;

		const ZERO = 0;
		const MY_FIRST_POST_INDEX = 0;

		const ONE = 1;
		const NEXT = 1;

		const TWO = 2;

		const MY_IMG_MARGIN = 20;

		let myCurrentPostIndex = null;
		let myCurrentPost = null;
		let myLastPostIndex = null;
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
			if ( MY_MIN_SLIDE_SHOW_WIDTH < window.innerWidth ) {
				let screenHeight = window.innerHeight;
				let clientRect = myCurrentPost.getBoundingClientRect ( );
				let topHeight = clientRect.y - document.documentElement.getBoundingClientRect ( ).y;
				if ( topHeight + clientRect.height > screenHeight ) {
					let imgElement = null;
					let postContent = myCurrentPost.children [ ONE ];

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
		}

		/*
		--- myShowNextPreviousPost function -------------------------------------------------------------------------------

		-------------------------------------------------------------------------------------------------------------------
		*/

		function myShowNextPreviousPost ( delta ) {
			if ( MY_MIN_SLIDE_SHOW_WIDTH < window.innerWidth ) {

				if ( myCurrentPostIndex !== myLastPostIndex ) {
					myCurrentPost.classList.add ( 'cyHidden' );
				}

				myCurrentPostIndex += ( delta || NEXT );

				if ( NOT_FOUND === myCurrentPostIndex ) {
					if ( myHasNextPage ) {
						localStorage.setItem ( 'postDirection', 'backward' );
						document.querySelector ( '.cyPaginationNext' ).click ( );
					}
					myCurrentPostIndex = MY_FIRST_POST_INDEX;
					return;
				}
				if ( myPosts.length === myCurrentPostIndex ) {
					if ( myHasPreviousPage ) {
						localStorage.setItem ( 'postDirection', 'forward' );
						document.querySelector ( '.cyPaginationPrevious' ).click ( );
					}
					myCurrentPostIndex = myLastPostIndex;
					return;
				}
				myCurrentPost = myPosts.item ( myCurrentPostIndex );
				myCurrentPost.classList.remove ( 'cyHidden' );

				myResizeCurrentPost ( );

				if ( 'yes' === localStorage.getItem ( 'timeOut' ) ) {
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
			if ( MY_MIN_SLIDE_SHOW_WIDTH < window.innerWidth ) {
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
						myShowNextPreviousPost ( NEXT );
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
							( myHasPreviousPage && myLastPostIndex === myCurrentPostIndex ) || myLastPostIndex !== myCurrentPostIndex
								?
								'url(' + myBlogThemeUrl + '/sharedpictures/right.png) 16 16,e-resize'
								:
								'auto';
					}
					else {
						document.body.style.cursor =
							( myHasNextPage && MY_FIRST_POST_INDEX === myCurrentPostIndex ) || MY_FIRST_POST_INDEX !== myCurrentPostIndex
								?
								'url(' + myBlogThemeUrl + '/sharedpictures/left.png) 16 16,w-resize'
								:
								'auto';
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
				if ( document.querySelector ( '.cyPaginationPrevious' ) ) {
					myHasPreviousPage = true;
				}
				if ( document.querySelector ( 'cyPaginationNext' ) ) {
					myHasNextPage = true;
				}

				let postDirection = 'forward';
				let tmpPostDirection = localStorage.getItem ( 'postDirection' );
				if ( tmpPostDirection && '' !== tmpPostDirection ) {
					postDirection = tmpPostDirection;
				}
				localStorage.setItem ( 'postDirection', '' );

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

				myCurrentPostIndex = ( 'forward' === postDirection ) ? MY_FIRST_POST_INDEX : myLastPostIndex;
				myCurrentPost = myPosts.item ( myCurrentPostIndex );

				if ( myCurrentPost ) {
					myCurrentPost.classList.remove ( 'cyHidden' );
					myResizeCurrentPost ( );
				}
			}
		}

		/*
		--- myHideFooter function -----------------------------------------------------------------------------------------

		-------------------------------------------------------------------------------------------------------------------
		*/

		function myHideFooter ( ) {
			if ( MY_MIN_SLIDE_SHOW_WIDTH < window.innerWidth ) {
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

	const ZERO = 0;

	if ( haveLocalStorage ( ) ) {
		colorChooser ( );

		if ( document.getElementById ( 'cyMainMenu' ) ) {
			document.getElementsByTagName ( 'body' ) [ ZERO ].classList.add ( 'cyJSPage' );
			menuModifier ( );
			slideShow ( );
		}
	}

	/*
	--- End of starter.js file --------------------------------------------------------------------------------------------
	*/

}());
