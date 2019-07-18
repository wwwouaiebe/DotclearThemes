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
		return 'standard';
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
		var colorChooserTopLi = document.createElement ( 'li' );
		var colorChooserTopAnchor = document.createElement ( 'a' );
		colorChooserTopAnchor.id = 'cyColorChooserMenuTop';
		colorChooserTopLi.appendChild ( colorChooserTopAnchor );
		if ( document.getElementById ( 'cyPagesMenuTop' ) ) {
			document.getElementById ( 'cyPagesMenuTop' ).appendChild ( colorChooserTopLi );
		}
		
		var colorChooserBottomLi = document.createElement ( 'li' );
		var colorChooserBottomAnchor = document.createElement ( 'a' );
		colorChooserBottomAnchor.id = 'cyColorChooserMenuBottom';
		colorChooserBottomLi.appendChild ( colorChooserBottomAnchor );
		if ( document.getElementById ( 'cyPagesMenuBottom' ) ) {
			document.getElementById ( 'cyPagesMenuBottom' ).appendChild ( colorChooserBottomLi );
		}
		
		var strCurrentStyle = cyReadStorage ( "style" );
		localStorage.setItem ( 'style', strCurrentStyle );
	
		var outerHTML = '';
		if ( 'standard' == strCurrentStyle )
		{
			outerHTML = '<a id="cyColorChooserMenuTop" href="javascript:cyChangeStyleSheet()" title="' +
				cyLanguage.cyColorChooserNormalTitle +
				'" >' + 
				cyLanguage.cyColorChooserNormal + 
				'</a>';
		}
		else
		{
			outerHTML = '<a id="cyColorChooserMenuTop" href="javascript:cyChangeStyleSheet()" title="' +
				cyLanguage.cyColorChooserContrasteTitle +
				'" >' + 
				cyLanguage.cyColorChooserContraste + 
				'</a>';
		}
		if ( document.getElementById ( 'cyColorChooserMenuTop' ) ) 
		{
			document.getElementById ( 'cyColorChooserMenuTop' ).outerHTML = outerHTML;
		}
		if ( document.getElementById ( 'cyColorChooserMenuBottom' ) ) 
		{
			document.getElementById ( 'cyColorChooserMenuBottom' ).outerHTML = outerHTML;
		}
	}		
}

/* --- End of cySetColorChooser function --- */		

/* 
--- cySetColorStyleSheet function ------------------------------------------------------------------------------------------

This function ...

------------------------------------------------------------------------------------------------------------------------
*/

function cySetColorStyleSheet ( strPath )
{
	
	if ( cyStorageAvailable ( 'localStorage' ) )
	{
		var strCurrentStyle = cyReadStorage ( "style" );
		localStorage.setItem ( 'style', strCurrentStyle );

		var linkElement = document.getElementById ( "cyColorSchemeLink" );
		linkElement.href = strPath + strCurrentStyle + 'ColorScheme.css';
	}
}	

/* --- End of cySetColorStyleSheet function --- */		

/* 
--- cyChangeStyleSheet function ------------------------------------------------------------------------------------------

This function ...

------------------------------------------------------------------------------------------------------------------------
*/

function cyChangeStyleSheet ( )
{
	if ( cyStorageAvailable ( 'localStorage' ) )
	{
		var strCurrentStyle = cyReadStorage ( "style" );
		var strNewStyle = 'standard';
		if ( 'standard' == strCurrentStyle )
		{
			strNewStyle = 'alternate';
		}
		
		localStorage.setItem ( 'style', strNewStyle );
			
		window.location.reload ( );
	}
}

/* --- End of cyChangeStyleSheet function --- */		

