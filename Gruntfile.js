module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      options: {
        'no-write': true
      },
      release: ['dist']
    },
    'string-replace': {
      dist: {
        files: {
          'dist/index.html': 'index.html',
        },
        options: {
          replacements: [
            {
              pattern: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
              replacement: 'css/bootstrap.min.css'
            }, 
            {
              pattern: 'node_modules/jquery/dist/jquery.min.js',
              replacement: 'js/jquery.min.js'
            }, 
            {
              pattern: 'node_modules/bootstrap/dist/js/bootstrap.min.js',
              replacement: 'js/bootstrap.min.js'
            }, 
            {
              pattern: 'taskrunner',
              replacement: 'Grunt'
            }, 
            {
              pattern: 'app/app.js',
              replacement: 'app/app.min.js'
            }
          ]
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'node_modules/jquery/dist/', src: ['jquery.min.js'], dest: 'dist/js'},
          {expand: true, cwd: 'node_modules/bootstrap/dist/js/', src: ['bootstrap.min.js'], dest: 'dist/js'},
          {expand: true, cwd: 'node_modules/bootstrap/dist/css/', src: ['bootstrap.min.css'], dest: 'dist/css'},
        ],
      },
    },
    uglify: {
      dist: {
        files: {
          'dist/app/app.min.js': ['app/app.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('dist', ['clean', 'string-replace', 'copy', 'uglify']);

};