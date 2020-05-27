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

export { menuModifier };

/*
--- End of MenuModifier.js file ---------------------------------------------------------------------------------------
*/