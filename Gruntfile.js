module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js', 'src/common/sharedscripts/*.js' ],
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
						cwd: 'src/common/sharedscripts/',
						src: ['**'],
						dest: 'dist/anthisnes/sharedscripts/'
					},
					{
						expand: true,
						cwd: 'src/common/sharedscripts/',
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
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');	
	grunt.registerTask('default', ['jshint', 'copy', 'cssmin']);
};