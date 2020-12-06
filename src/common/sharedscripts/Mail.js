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

export { computeFR, computeEN };