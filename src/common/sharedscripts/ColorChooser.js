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

	var colorChooser = function ( ) {

		var m_language = {};
		
		var m_parse = function ( ) {
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(document.getElementById ( "cyDotclearVars" ).childNodes[ 0 ].data,"text/xml");
			m_language = {
				colorChooserContraste : xmlDoc.getElementsByTagName ( "cyColorChooserContraste" ) [ 0 ].attributes.getNamedItem ( "value" ).nodeValue,
				colorChooserNormal : xmlDoc.getElementsByTagName ( "cyColorChooserNormal" ) [ 0 ].attributes.getNamedItem ( "value" ).nodeValue,
				colorChooserContrasteTitle : xmlDoc.getElementsByTagName ( "cyColorChooserContrasteTitle" ) [ 0 ].attributes.getNamedItem ( "value" ).nodeValue,
				colorChooserNormalTitle : xmlDoc.getElementsByTagName ( "cyColorChooserNormalTitle" ) [ 0 ].attributes.getNamedItem ( "value" ).nodeValue
			};
		};
		
		var m_addColorMenuItem = function ( )
		{
			var currentStyle = localStorage.getItem ( "style" ) || 'cyStandardColor';
			localStorage.setItem ( 'style', currentStyle );
		
			var colorChooserTopAnchor = null;
			var colorChooserBottomAnchor = null;
			if ( document.getElementById ( "cyMainMenu" ) ) {
				var colorChooserTopLi = document.createElement ( 'li' );
				colorChooserTopLi.classList.add ( 'cyMenuItem' );
				colorChooserTopAnchor = document.createElement ( 'a' );
				colorChooserTopAnchor.addEventListener ( 'click', function ( ) {m_changeColorStyle ( );}, false );
				colorChooserTopAnchor.id = 'cyColorChooserMenuTop';
				colorChooserTopLi.appendChild ( colorChooserTopAnchor );
				if ( document.getElementById ( 'cyPagesMenuTop' ) ) {
					document.getElementById ( 'cyPagesMenuTop' ).appendChild ( colorChooserTopLi );
				}
				
				var menuBottom = document.getElementById ( 'cyPagesMenuBottom' );
				if ( menuBottom ) {
					var colorChooserBottomLi = document.createElement ( 'li' );
					colorChooserBottomLi.classList.add ( 'cyMenuItem' );
					colorChooserBottomAnchor = document.createElement ( 'a' );
					colorChooserBottomAnchor.addEventListener ( 'click', function ( ) {m_changeColorStyle ( );}, false );
					colorChooserBottomAnchor.id = 'cyColorChooserMenuBottom';
					colorChooserBottomLi.appendChild ( colorChooserBottomAnchor );
					document.getElementById ( 'cyPagesMenuBottom' ).appendChild ( colorChooserBottomLi );
				}
			}
			else if ( document.getElementById ( "cyMenu" ) ) {
				// www.ouaie.be home page
				var colorMenuItem = document.createElement ( 'div' );
				colorMenuItem.innerHTML = '<h5><a id="cyContrastViewBottom"><img src="sharedpictures/contraste.png" class="cyMenuThumbnail"  alt="Affichage" /></a></h5><div><p><a id="cyColorChooserMenuTop" title="Passer en affichage normal" >Affichage normal</a></p></div>';
				colorMenuItem.classList.add ( 'cyMenuItem' );
				colorMenuItem.classList.add ( 'cyMenuTooltip' );
				document.getElementById ( "cyMenu" ).appendChild ( colorMenuItem );
				colorChooserTopAnchor = document.getElementById ( 'cyColorChooserMenuTop' );
				colorChooserTopAnchor.addEventListener ( 'click', function ( ) {m_changeColorStyle ( );}, false );
			}
				
			if ( 'cyStandardColor' === currentStyle )
			{
				colorChooserTopAnchor.innerHTML = m_language.colorChooserNormal;
				colorChooserTopAnchor.title = m_language.colorChooserNormalTitle;
				if ( colorChooserBottomAnchor ) {
					colorChooserBottomAnchor.innerHTML = m_language.colorChooserNormal;
					colorChooserBottomAnchor.title = m_language.colorChooserNormalTitle;
				}
			}
			else
			{
				colorChooserTopAnchor.innerHTML = m_language.colorChooserContraste;
				colorChooserTopAnchor.title = m_language.colorChooserContrasteTitle;
				if ( colorChooserBottomAnchor ) {
					colorChooserBottomAnchor.innerHTML = m_language.colorChooserContraste;
					colorChooserBottomAnchor.title = m_language.colorChooserContrasteTitle;
				}
				document.body.classList.add ( 'cyAlternateColor' );
				document.body.classList.remove ( 'cyStandardColor' );
			}
		};

		var m_changeColorStyle =function ( )
		{
			var currentStyle = localStorage.getItem ( "style" );
			
			var colorChooserTopAnchor = document.getElementById ( 'cyColorChooserMenuTop' );
			var colorChooserBottomAnchor = document.getElementById ( 'cyColorChooserMenuBottom' );
			
			if ( 'cyStandardColor' === currentStyle ) {
				
				colorChooserTopAnchor.innerHTML = m_language.colorChooserContraste;
				colorChooserTopAnchor.title = m_language.colorChooserContrasteTitle;
				if ( colorChooserBottomAnchor ) {
					colorChooserBottomAnchor.innerHTML = m_language.colorChooserContraste;
					colorChooserBottomAnchor.title = m_language.colorChooserContrasteTitle;
				}
				document.body.classList.add ( 'cyAlternateColor' );
				document.body.classList.remove ( 'cyStandardColor' );
				localStorage.setItem ( 'style', 'cyAlternateColor' );
			}
			else {
				colorChooserTopAnchor.innerHTML = m_language.colorChooserNormal;
				colorChooserTopAnchor.title = m_language.colorChooserNormalTitle;
				if ( colorChooserBottomAnchor ) {
					colorChooserBottomAnchor.innerHTML = m_language.colorChooserNormal;
					colorChooserBottomAnchor.title = m_language.colorChooserNormalTitle;
				}
				document.body.classList.add ( 'cyStandardColor' );
				document.body.classList.remove ( 'cyAlternateColor' );
				localStorage.setItem ( 'style', 'cyStandardColor' );
			}
			
		};
	
		m_parse ( );
		
		m_addColorMenuItem ( );
		
		return;
	};

	
	/*
	--- Exports -------------------------------------------------------------------------------------------------------
	*/

	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = colorChooser;
	}
	
}());
