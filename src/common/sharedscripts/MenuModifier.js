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

	var menuModifier = function ( ) {
		

		var m_removeClass = function ( menuPart, className ) {
			document.getElementById ( menuPart ).classList.remove ( className );
		};

		/* 
		--- m_addClassAll function ---
		*/

		var m_addClassAll = function ( className ) {
			[ 'cyCategoriesMenuTop', 'cyTagsMenuTop', 'cyArchivesMenuTop', 'cyPagesMenuTop', 'cyNearMenuTop','cyCategoriesTitleTop', 'cyTagsTitleTop', 'cyArchivesTitleTop', 'cyPagesTitleTop', 'cyNearTitleTop'].forEach  (
				function ( item ) { 
					if ( document.getElementById ( item ) ) {
						document.getElementById ( item ).classList.add ( className );
					}
				}
			);
		};

		/* 
		--- m_toggleMenuPart function ---
		*/

		var  m_toggleMenuPart = function ( menuTitle, menuPart ) {
			var currentMenu = localStorage.getItem ( 'currentMenu' ) || '';
			var currentTitle = localStorage.getItem ( 'currentTitle' ) || '';
			m_addClassAll ( 'cyHiddenMenuPart' );
			if ( currentMenu === menuPart ) {
				currentMenu = '';
				currentTitle = '';
			}
			else {
				m_removeClass ( menuPart, 'cyHiddenMenuPart' );
				m_removeClass ( menuTitle, 'cyHiddenMenuPart' );
				currentMenu = menuPart;
				currentTitle = menuTitle;
			}
			localStorage.setItem ( 'currentMenu', currentMenu );
			localStorage.setItem ( 'currentTitle', currentTitle );
		};

		/* 
		--- hideMenu function ---
		*/

		var m_hideMenu = function ( ) {
			m_addClassAll ( 'cyHiddenMenuPart' );
			
			var currentMenu = localStorage.getItem ( 'currentMenu' ) || '';
			if ( '' !== currentMenu ) {
				m_removeClass ( currentMenu, 'cyHiddenMenuPart' );
			}
			
			var currentTitle = localStorage.getItem ( 'currentTitle' ) || '';
			if ( '' !== currentTitle ) {
				m_removeClass ( currentTitle, 'cyHiddenMenuPart' );
			}
			
			document.getElementById ( 'cyCategoriesTitleTop' ).addEventListener (
				'click',
				function ( ) { m_toggleMenuPart ( 'cyCategoriesTitleTop', 'cyCategoriesMenuTop' ); }, 
				false
			);
			if ( document.getElementById ( 'cyNearTitleTop' ) ) {
				document.getElementById ( 'cyNearTitleTop' ).addEventListener (
					'click',
					function ( ) { m_toggleMenuPart ( 'cyNearTitleTop', 'cyNearMenuTop' ); }, 
					false
				);
			}
			document.getElementById ( 'cyTagsTitleTop' ).addEventListener (
				'click',
				function ( ) { m_toggleMenuPart ( 'cyTagsTitleTop', 'cyTagsMenuTop' ); }, 
				false
			);
			document.getElementById ( 'cyArchivesTitleTop' ).addEventListener (
				'click',
				function ( ) { m_toggleMenuPart ( 'cyArchivesTitleTop', 'cyArchivesMenuTop' ); }, 
				false
			);
			document.getElementById ( 'cyPagesTitleTop' ).addEventListener (
				'click',
				function ( ) { m_toggleMenuPart ( 'cyPagesTitleTop', 'cyPagesMenuTop' ); }, 
				false
			);
		};
		
		m_hideMenu ( );
		
		return;
	};

	
	/*
	--- Exports -------------------------------------------------------------------------------------------------------
	*/

	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = menuModifier;
	}
	
}());
