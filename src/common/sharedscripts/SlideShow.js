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

( function ( ){
	
	'use strict';
	

	var slideShow = function ( ) {
		
		var m_currentPost = null;
		var m_lastPost = null;
		var m_hasPreviousPage = false;
		var m_hasNextPage = false;
		var m_posts = null;
		var m_timeOutId = null;
		var m_timeOutDuration = 5000;
		var m_blogThemeUrl = '';
		
		var m_onKeyDown = function ( keyBoardEvent ) {
			switch ( keyBoardEvent.key ) {
				case 'Escape':
				case 'Esc':
					if ( m_timeOutId ) {
						window.clearTimeout ( m_timeOutId );
						m_timeOutId = null;
						localStorage.setItem ( 'timeOut', 'no' );
					}
					else {
						localStorage.setItem ( 'timeOut', 'yes' );
						m_showNextPreviousPost ( 1 );
						m_timeOutId = window.setTimeout ( m_showNextPreviousPost, m_timeOutDuration);
					}
					break;
				case '+':
					m_timeOutDuration = m_timeOutDuration === 30000 ? 30000 : m_timeOutDuration + 1000;
					localStorage.setItem ( 'timeOutDuration', m_timeOutDuration );
					break;
				case '-':
					m_timeOutDuration = m_timeOutDuration === 2000 ? 2000 : m_timeOutDuration - 1000;
					localStorage.setItem ( 'timeOutDuration', m_timeOutDuration );
					break;
				case 'ArrowRight':
					m_showNextPreviousPost ( 1 );
					break;
				case 'ArrowLeft':
					m_showNextPreviousPost ( -1 );
					break;
				default:
					break;
			}
		};
		
		/* 
		--- onPostMouseLeave function ---
		*/

		var m_onPostMouseLeave = function( mouseEvent ) {
			if ( window.innerWidth < 1281 ) {
				return;
			}
			document.body.style.cursor = 'auto';
		};

		/* 
		--- onPostMouse function ---
		*/

		var m_onPostMouse = function ( mouseEvent ) {
			if ( window.innerWidth < 1281 ) {
				return;
			}
			var clientRect = m_getClientRect ( );
			if ( clientRect ) {
				if ( clientRect.width  < mouseEvent.clientX - clientRect.x )
				{
					document.body.style.cursor = 'auto';
				}
				else if ( clientRect.width / 2  < mouseEvent.clientX - clientRect.x  ) {
					document.body.style.cursor = (  m_hasPreviousPage && m_lastPost === m_currentPost ) || m_lastPost !== m_currentPost ? 'url(' + m_blogThemeUrl + '/sharedpictures/right.png) 16 16,e-resize' : 'auto';
				}
				else {
					document.body.style.cursor = ( m_hasNextPage && 0 === m_currentPost ) || 0 !== m_currentPost  ? 'url(' + m_blogThemeUrl + '/sharedpictures/left.png) 16 16,w-resize' : 'auto';
				}
			}
		};

		/* 
		--- m_onPostMouseClick function ---
		*/

		var m_onPostMouseClick = function ( mouseEvent ) {
			if ( window.innerWidth < 1281 ) {
				return;
			}
			
			m_showNextPreviousPost ( ( m_getClientRect ( ).width / 2 > mouseEvent.offsetX ) ? -1 : 1 );
		};
		
		/* 
		--- m_resizeCurrentPost function ---
		*/
		
		var m_resizeCurrentPost = function ( ) {
			if ( window.innerWidth < 1281 ) {
				return;
			}
			var screenHeight = window.innerHeight;
			var clientRect = m_posts [ m_currentPost ].getBoundingClientRect ( );
			var top = clientRect.y - document.documentElement.getBoundingClientRect ( ).y;
			if (  top + clientRect.height > screenHeight ) {
				var imgElement = null;
				var postContent = m_posts [ m_currentPost ].children [ 1 ];
				
				for (var counter = 0; counter < postContent.children.length; counter ++ ) {
					if ( postContent.children [ counter ].classList.contains ( 'cyPostMedias' ) ) {
						imgElement = postContent.children [ counter ].firstElementChild.firstElementChild;
						if ( imgElement.tagName !== 'IMG' ) {
							imgElement = null;
						}
						break;
					}
				}
				if ( imgElement && ! imgElement.classList.contains ( 'cyPictureLandscape' ) ) {
					var imgScale = ( imgElement.height  - top - clientRect.height + screenHeight - 20 ) / imgElement.height;
					imgElement.style.width = '' + Number.parseInt ( imgScale * imgElement.width ) + 'px';
					/*imgElement.style.height = '' + Number.parseInt ( imgScale * imgElement.height ) + 'px';*/
				}
			}
		};		

		/* 
		--- m_getClientRect function ---
		*/

		var m_getClientRect = function ( ) {
			if ( -1 !== m_posts [ m_currentPost ].haveMedia ) {
				return m_posts [ m_currentPost ].children [ 1 ].children [ m_posts [ m_currentPost ].haveMedia ].firstElementChild.firstElementChild.getBoundingClientRect ( );
			}
			else if ( -1 !== m_posts [ m_currentPost ].haveText ) {
				return m_posts [ m_currentPost ].children [ 1 ].children [ m_posts [ m_currentPost ].haveText ].getBoundingClientRect ( );
			}
			else if ( -1 !== m_posts [ m_currentPost ].haveExcerpt ) {
				return m_posts [ m_currentPost ].children [ 1 ].children [ m_posts [ m_currentPost ].haveExcerpt ].getBoundingClientRect ( );
			}
			return null;
		};
		
		/* 
		--- m_showNextPreviousPost function ---
		*/

		var m_showNextPreviousPost = function ( delta ) {
			if ( ! delta ) {
				delta = 1;
			}
			
			var previousPost = m_currentPost;
			m_currentPost += delta;

			if ( -1 === m_currentPost )
			{
				if ( m_hasNextPage ) {
					localStorage.setItem ( 'postDirection', 'backward' );
					document.getElementsByClassName ( 'cyPaginationNext' ) [ 0 ].click ( );
				}
				m_currentPost = 0;
				return;
			}
			if ( m_posts.length === m_currentPost )
			{
				if ( m_hasPreviousPage ){
					localStorage.setItem ( 'postDirection', 'forward' );
					document.getElementsByClassName ( 'cyPaginationPrevious' ) [ 0 ].click ( );
				}
				m_currentPost --;
				return;
			}
			
			m_posts [ previousPost ].classList.add ( 'cyHidden' );
			m_posts [ m_currentPost ].classList.remove ( 'cyHidden' );
			
			m_resizeCurrentPost ( );	
			
			if ( 'yes' === localStorage.getItem ( 'timeOut' ) )
			{
				if ( m_timeOutId ) {
					window.clearTimeout ( m_timeOutId );
				}
				m_timeOutId = window.setTimeout ( m_showNextPreviousPost, m_timeOutDuration);
			}
		};		
		

		/* 
		--- m_hidePosts function ---
		*/

		var m_hidePosts = function ( ) {
			if ( 0 < document.getElementsByClassName ( 'cyPaginationPrevious' ).length ) {
				m_hasPreviousPage = true;
			}
			if ( 0 < document.getElementsByClassName ( 'cyPaginationNext' ).length ) {
				m_hasNextPage = true;
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
				
			m_posts = document.getElementsByClassName ( 'cyPost' );
			m_lastPost = m_posts.length - 1;
			for ( counter = 0; counter < m_posts.length; counter++) {
				m_posts [ counter ].classList.add ( 'cyHidden' );
				
				var postContent = m_posts [ counter ].children [1];
				// the 4 events are needed!!!
				postContent.addEventListener (
					'mousemove',
					m_onPostMouse,
					false
				);
				postContent.addEventListener (
					'mouseenter',
					m_onPostMouse,
					false
				);
				postContent.addEventListener (
					'mouseleave',
					m_onPostMouseLeave,
					false
				);
				postContent.addEventListener (
					'click',
					m_onPostMouseClick,
					false
				);

				m_posts [ counter ].haveExcerpt = -1;
				m_posts [ counter ].haveMedia = -1;
				m_posts [ counter ].haveText = -1;

				for ( var childCounter = 0; childCounter < postContent.children.length ; childCounter ++ ) {
					if ( postContent.children [ childCounter ].classList.contains ( 'cyPostExcerpt' ) ) {
						m_posts [ counter ].haveExcerpt = childCounter;
					}
					if ( postContent.children [ childCounter ].classList.contains ( 'cyPostMedias' ) ) {
						m_posts [ counter ].haveMedia = childCounter;
					}
					if ( postContent.children [ childCounter ].classList.contains ( 'cyPostText' ) ) {
						m_posts [ counter ].haveText = childCounter;
					}
				}
			}
			
			m_currentPost = ( 'forward' === postDirection ) ?  0 : m_lastPost;
			
			if ( m_posts [ m_currentPost ] ) {
				m_posts [ m_currentPost ].classList.remove ( 'cyHidden' );
				m_resizeCurrentPost ( );
			}
		};

		/* 
		--- m_hideFooter function ---
		*/

		var m_hideFooter = function  ( ) {
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
		};

		/* 
		--- m_parse function ---
		*/

		var m_parse = function ( ) {
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(document.getElementById ( "cyDotclearVars" ).childNodes[ 0 ].data,"text/xml");
			m_blogThemeUrl = xmlDoc.getElementsByTagName ( "cyBlogThemeURL" ) [ 0 ].attributes.getNamedItem ( "value" ).nodeValue;
		};

		/* 
		--- m_hideFooter function ---
		*/
		
		var m_setTimer = function ( ) {
			m_timeOutDuration = localStorage.getItem ( 'timeOutDuration' ) || m_timeOutDuration;
			m_timeOutDuration = Number.parseInt ( m_timeOutDuration );
			
			var timeOut = localStorage.getItem ( 'timeOut' ) || 'yes';
			localStorage.setItem ( 'timeOut', timeOut );
			if ( 'yes' === timeOut ) {
				m_timeOutId = window.setTimeout ( m_showNextPreviousPost, m_timeOutDuration);
			}
		};

		m_parse ( );
		m_setTimer ( );
		
		document.addEventListener ( 'keydown', m_onKeyDown, true );
		
		m_hidePosts ( );
		m_hideFooter ( );
		
	};

	/*
	--- Exports -------------------------------------------------------------------------------------------------------
	*/

	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = slideShow;
	}
	
}());
