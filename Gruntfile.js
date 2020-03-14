module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js', 'src/common/sharedscripts/*.js' ],
		},
		browserify: {
			control: {
				src: ['src/common/sharedscripts/*.js'],
				dest: 'src/common/tmp/starter.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - version <%= pkg.version %> - build <%= pkg.build %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %> - Copyright 2017 <%= grunt.template.today("yyyy") %> Christian Guyette - Contact: http//www.ouaie.be/ - This  program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or any later version.*/\n\n'
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
		}
	});
	grunt.config.data.pkg.buildNumber = grunt.file.readJSON('buildNumber.json').buildNumber;
	grunt.config.data.pkg.buildNumber = ("00000" + ( Number.parseInt ( grunt.config.data.pkg.buildNumber ) + 1 )).substr ( -5, 5 ) ;
	grunt.file.write ( 'buildNumber.json', '{ "buildNumber" : "' + grunt.config.data.pkg.buildNumber + '"}'  );
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');	
	grunt.registerTask('default', ['jshint', 'browserify', 'uglify', 'copy', 'cssmin']);
	console.log ( '---------------------------------------------------------------------------------------------------------------------------------------------');
	console.log ( '\n                                     ' + grunt.config.data.pkg.name + ' - ' + grunt.config.data.pkg.version +' - build: '+ grunt.config.data.pkg.buildNumber + ' - ' + grunt.template.today("isoDateTime") +'\n' );
	console.log ( '---------------------------------------------------------------------------------------------------------------------------------------------');
};