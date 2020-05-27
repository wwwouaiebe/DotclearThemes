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
--- starter.js file ---------------------------------------------------------------------------------------------------
This file contains:
	- the main function
Changes:
	- v1.4.0:
		- Migration to ES6, esLint and Rollup
Doc reviewed 20200527

-----------------------------------------------------------------------------------------------------------------------
*/

import { colorChooser } from './ColorChooser.js';
import { menuModifier } from './MenuModifier.js';
import { slideShow } from './SlideShow.js';

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