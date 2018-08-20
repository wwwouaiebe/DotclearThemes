module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js', 'tests/*.js'],
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/ouaie/sharedstyles/presentationScheme.css': ['src/common/sharedstyles/reset.css', 'src/common/sharedstyles/presentationScheme.css', 'src/common/sharedstyles/menuScheme.css'],
					'dist/ouaie/sharedstyles/standardColorScheme.css': ['src/common/sharedstyles/standardColorScheme.css'],
					'dist/ouaie/sharedstyles/alternateColorScheme.css': ['src/common/sharedstyles/reset.css', 'src/common/sharedstyles/presentationScheme.css', 'src/common/sharedstyles/menuScheme.css'],
					'dist/anthisnes/sharedstyles/presentationScheme.css': ['src/common/sharedstyles/reset.css', 'src/common/sharedstyles/presentationScheme.css'],
					'dist/anthisnes/sharedstyles/standardColorScheme.css': ['src/common/sharedstyles/standardColorScheme.css'],
					'dist/anthisnes/sharedstyles/alternateColorScheme.css': ['src/common/sharedstyles/reset.css', 'src/common/sharedstyles/presentationScheme.css', 'src/common/sharedstyles/menuScheme.css'],
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');	
	grunt.registerTask('default', ['jshint', 'cssmin']);
};