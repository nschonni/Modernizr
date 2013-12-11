/* jshint node: true */
module.exports = function(grunt) {
  // Strip define fn
  grunt.registerMultiTask('stripdefine', 'Strip define call from dist file', function() {
    this.filesSrc.forEach(function(filepath) {
      // Remove `define('modernizr-init' ...)` and `define('modernizr-build' ...)`
      var mod = grunt.file.read(filepath).replace(/define\("modernizr-(init|build)", function\(\)\{\}\);/g, '');

      // Hack the prefix into place. Anything is way too big for something so small.
      if ( grunt.modConfig && grunt.modConfig.classPrefix ) {
        mod = mod.replace('classPrefix : \'\',', 'classPrefix : \'' + grunt.modConfig.classPrefix.replace(/"/g, '\\"') + '\',');
      }
      grunt.file.write(filepath, mod);
    });
  });
};
