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

	try {
		var	x = '__storage_test__';
		localStorage.setItem ( x, x );
		localStorage.removeItem ( x );
	}
	catch ( e ) {
		return false;
	}		
	
	document.getElementsByTagName ( 'body' ) [0].classList.add ( 'cyJSPage' );
	
	require ( './ColorChooser' ) ( );
	require ( './MenuModifier' ) ( );
	require ( './SlideShow' ) ( );
	
}());