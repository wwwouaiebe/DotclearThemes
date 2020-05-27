module.exports = function(grunt) {
	let banner = 
		'/**\n * ' +
		'\n * @source: <%= pkg.sources %>\n * ' + 
		'\n * @licstart  The following is the entire license notice for the' +
		'\n * JavaScript code in this page.\n * \n * <%= pkg.name %> - version <%= pkg.version %>' + 
		'\n * Build <%= pkg.buildNumber %> - <%= grunt.template.today("isoDateTime") %> ' + 
		'\n * Copyright 2017 <%= grunt.template.today("yyyy") %> wwwouaiebe ' + 
		'\n * Contact: https://www.ouaie.be/' + 
		'\n * License: <%= pkg.license %>' +
		'\n * \n * The JavaScript code in this page is free software: you can' +
		'\n * redistribute it and/or modify it under the terms of the GNU' +
		'\n * General Public License (GNU GPL) as published by the Free Software' +
		'\n * Foundation, either version 3 of the License, or (at your option)' +
		'\n * any later version.  The code is distributed WITHOUT ANY WARRANTY;' +
		'\n * without even the implied warranty of MERCHANTABILITY or FITNESS' +
		'\n * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.' +
		'\n * \n * As additional permission under GNU GPL version 3 section 7, you' +
		'\n * may distribute non-source (e.g., minimized or compacted) forms of' +
		'\n * that code without the copy of the GNU GPL normally required by' +
		'\n * section 4, provided you include this license notice and a URL' +
		'\n * through which recipients can access the Corresponding Source.' +
		'\n * \n * @licend  The above is the entire license notice' +
		'\n * for the JavaScript code in this page.' +
		'\n * \n */\n\n';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		eslint: {
			options: {
				fix: true,
				configFile: '.eslintrc.json'
			},				
			target: ['src/common/sharedscripts/*.js']
		},	
		rollup : {
			Default : {
				options : {
					format : 'iife'
				},
				files: {
				  'src/common/tmp/starter.js': ['src/common/sharedscripts/starter.js']
				}
			}
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/ouaie/sharedstyles/presentationScheme.css': ['src/common/sharedstyles/presentationScheme.css'],
					'dist/anthisnes/sharedstyles/presentationScheme.css': ['src/common/sharedstyles/presentationScheme.css'],
				}
			}
		},
		uglify: {
			options: {
				banner: banner
			},
			build: {
				src: 'src/common/tmp/starter.js',
				dest: 'src/common/tmp/starter.min.js'
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'src/common/sharedpictures/',
						src: ['**'],
						dest: 'dist/anthisnes/sharedpictures/'
					},
					{
						expand: true,
						cwd: 'src/common/sharedpictures/',
						src: ['**'],
						dest: 'dist/ouaie/sharedpictures/'
					},
					{
						expand: true,
						cwd: 'src/common/tmp/',
						src: ['**'],
						dest: 'dist/anthisnes/sharedscripts/'
					},
					{
						expand: true,
						cwd: 'src/common/tmp/',
						src: ['**'],
						dest: 'dist/ouaie/sharedscripts/'
					},
					{
						expand: true,
						cwd: 'src/common/tpl/',
						src: ['**'],
						dest: 'dist/anthisnes/tpl/'
					},
					{
						expand: true,
						cwd: 'src/common/tpl/',
						src: ['**'],
						dest: 'dist/ouaie/tpl/'
					},
					{
						expand: true,
						cwd: 'src/common/',
						src: ['*'],
						dest: 'dist/anthisnes/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'src/common/',
						src: ['*'],
						dest: 'dist/ouaie/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'src/anthisnes/',
						src: ['**'],
						dest: 'dist/anthisnes/'
					},
					{
						expand: true,
						cwd: 'src/ouaie/',
						src: ['**'],
						dest: 'dist/ouaie/'
					},
				],
			}
		}
	});
	grunt.config.data.pkg.buildNumber = grunt.file.readJSON('buildNumber.json').buildNumber;
	grunt.config.data.pkg.buildNumber = ("00000" + ( Number.parseInt ( grunt.config.data.pkg.buildNumber ) + 1 )).substr ( -5, 5 ) ;
	grunt.file.write ( 'buildNumber.json', '{ "buildNumber" : "' + grunt.config.data.pkg.buildNumber + '"}'  );
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-rollup');
	grunt.loadNpmTasks('grunt-contrib-cssmin');	
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', ['eslint', 'rollup', 'uglify', 'copy', 'cssmin']);
	console.log ( '---------------------------------------------------------------------------------------------------------------------------------------------');
	console.log ( '\n                                     ' + grunt.config.data.pkg.name + ' - ' + grunt.config.data.pkg.version +' - build: '+ grunt.config.data.pkg.buildNumber + ' - ' + grunt.template.today("isoDateTime") +'\n' );
	console.log ( '---------------------------------------------------------------------------------------------------------------------------------------------');
};