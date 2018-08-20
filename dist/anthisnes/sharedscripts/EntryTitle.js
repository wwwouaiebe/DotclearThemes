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
--- cyEntryTitle function ------------------------------------------------------------------------------------------

This function ...

------------------------------------------------------------------------------------------------------------------------
*/

function cyEntryTitle ( strEntryTitle )
{
	if ("." !== strEntryTitle )
	{
	document.write ( "<h3 class='cyPostTitle'>" + strEntryTitle + "</h3>" );
	}
}

/* --- End of cyEntryTitle function --- */		
