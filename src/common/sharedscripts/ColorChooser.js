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

export { colorChooser };

/*
--- End of ColorChooser.js file ---------------------------------------------------------------------------------------
*/