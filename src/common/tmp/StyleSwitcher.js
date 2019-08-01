/* ---------------------------------------------------------------------------- */


/*
Copyright - 2015 - Christian Guyette Contact: http//www.ouaie.be/

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

/* ---------------------------------------------------------------------------- */


/* 
--- cyStorageAvailable function ------------------------------------------------------------------------------------------

This function test if the storage API is available ( the API can be deactived by user....)
Adapted from MDN :-)

------------------------------------------------------------------------------------------------------------------------
*/

function cyStorageAvailable ( type ) {
	try {
		var storage = window [ type ];
		var	x = '__storage_test__';
		storage.setItem ( x, x );
		storage.removeItem ( x );
		return true;
	}
	catch ( e ) {
		return false;
	}				
}

/* --- End of cyStorageAvailable function --- */		

/* 
--- cyReadStorage function ------------------------------------------------------------------------------------------

This function ...

------------------------------------------------------------------------------------------------------------------------
*/

function cyReadStorage ( strName )
{
	var strValue = localStorage.getItem ( strName );
	
	if ( strValue )
	{
		return strValue;
	}
	else
	{
		return '';
	}
}

/* --- End of cyReadStorage function --- */		

/* 
--- cySetColorChooser function ------------------------------------------------------------------------------------------

This function ...

------------------------------------------------------------------------------------------------------------------------
*/

function cySetColorChooser ( )
{
	if ( cyStorageAvailable ( 'localStorage' ) )
	{
		var strCurrentStyle = cyReadStorage ( "style" );
		if ( 'cyAlternateColor' !== strCurrentStyle ) {
			strCurrentStyle = 'cyStandardColor';
		}
		localStorage.setItem ( 'style', strCurrentStyle );
	
		var colorChooserTopLi = document.createElement ( 'li' );
		colorChooserTopLi.classList.add ( 'cyMenuItem' );
		var colorChooserTopAnchor = document.createElement ( 'a' );
		colorChooserTopAnchor.addEventListener ( 'click', function ( ) {cyChangeStyleSheet ( );}, false );
		colorChooserTopAnchor.id = 'cyColorChooserMenuTop';
		colorChooserTopLi.appendChild ( colorChooserTopAnchor );
		if ( document.getElementById ( 'cyPagesMenuTop' ) ) {
			document.getElementById ( 'cyPagesMenuTop' ).appendChild ( colorChooserTopLi );
		}
		
		var menuBottom = document.getElementById ( 'cyPagesMenuBottom' );
		var colorChooserBottomAnchor = null;
		if ( menuBottom ) {
			var colorChooserBottomLi = document.createElement ( 'li' );
			colorChooserBottomLi.classList.add ( 'cyMenuItem' );
			colorChooserBottomAnchor = document.createElement ( 'a' );
			colorChooserBottomAnchor.addEventListener ( 'click', function ( ) {cyChangeStyleSheet ( );}, false );
			colorChooserBottomAnchor.id = 'cyColorChooserMenuBottom';
			colorChooserBottomLi.appendChild ( colorChooserBottomAnchor );
			document.getElementById ( 'cyPagesMenuBottom' ).appendChild ( colorChooserBottomLi );
		}
		
		if ( 'cyStandardColor' === strCurrentStyle )
		{
			colorChooserTopAnchor.innerHTML = cyLanguage.cyColorChooserNormal;
			colorChooserTopAnchor.title = cyLanguage.cyColorChooserNormalTitle;
			if ( colorChooserBottomAnchor ) {
				colorChooserBottomAnchor.innerHTML = cyLanguage.cyColorChooserNormal;
				colorChooserBottomAnchor.title = cyLanguage.cyColorChooserNormalTitle;
			}
		}
		else
		{
			colorChooserTopAnchor.innerHTML = cyLanguage.cyColorChooserContraste;
			colorChooserTopAnchor.title = cyLanguage.cyColorChooserContrasteTitle;
			if ( colorChooserBottomAnchor ) {
				colorChooserBottomAnchor.innerHTML = cyLanguage.cyColorChooserContraste;
				colorChooserBottomAnchor.title = cyLanguage.cyColorChooserContrasteTitle;
			}
			document.body.classList.add ( 'cyAlternateColor' );
			document.body.classList.remove ( 'cyStandardColor' );
		}
	}		
}

/* --- End of cySetColorChooser function --- */		

/* 
--- cyChangeStyleSheet function ------------------------------------------------------------------------------------------

This function ...

------------------------------------------------------------------------------------------------------------------------
*/

function cyChangeStyleSheet ( )
{
	var strCurrentStyle = cyReadStorage ( "style" );
	
	var colorChooserTopAnchor = document.getElementById ( 'cyColorChooserMenuTop' );
	var colorChooserBottomAnchor = document.getElementById ( 'cyColorChooserMenuBottom' );
	
	if ( 'cyStandardColor' === strCurrentStyle ) {
		
		colorChooserTopAnchor.innerHTML = cyLanguage.cyColorChooserContraste;
		colorChooserTopAnchor.title = cyLanguage.cyColorChooserContrasteTitle;
		if ( colorChooserBottomAnchor ) {
			colorChooserBottomAnchor.innerHTML = cyLanguage.cyColorChooserContraste;
			colorChooserBottomAnchor.title = cyLanguage.cyColorChooserContrasteTitle;
		}
		document.body.classList.add ( 'cyAlternateColor' );
		document.body.classList.remove ( 'cyStandardColor' );
		localStorage.setItem ( 'style', 'cyAlternateColor' );
	}
	else {
		colorChooserTopAnchor.innerHTML = cyLanguage.cyColorChooserNormal;
		colorChooserTopAnchor.title = cyLanguage.cyColorChooserNormalTitle;
		if ( colorChooserBottomAnchor ) {
			colorChooserBottomAnchor.innerHTML = cyLanguage.cyColorChooserNormal;
			colorChooserBottomAnchor.title = cyLanguage.cyColorChooserNormalTitle;
		}
		document.body.classList.add ( 'cyStandardColor' );
		document.body.classList.remove ( 'cyAlternateColor' );
		localStorage.setItem ( 'style', 'cyStandardColor' );
	}
	
}

/* --- End of cyChangeStyleSheet function --- */		

