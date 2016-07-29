'use strict';
module.exports = function(grunt){    
    grunt.initConfig({
        pkg:grunt.file.readJSON("package.json"),
        watch: {
            // all tasks running when less file was changed
             less: {
                files: ["src/less/*.less"],
                tasks: ['less', 'autoprefixer', 'cssmin']
            },

            //uglify js running if you change any file in src/js folder
            uglify:{
                files: ['src/js/*.js', 'src/js/thirdparty/*.js'],
                tasks: ['uglify']
            },
            
            imagemin:{
                files: ['src/img/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            htmlmin:{
                files: ['src/*.{html,php}'],
                tasks: ['htmlmin']
            },                        
            
        },
                
        // "less"-task configuration
        less: {
            // production config is also available
            development: {
                options: {
                    // Specifies directories to scan for @import directives when parsing. 
                    // Default value is the directory of the source, which is probably what you want.
                    paths: ["css"],
                },
                files: {
                    // build            :  source
                    "src/css/style.css": "src/less/style.less"
                }
            },
        },


        //Autoprefixer configuration
        autoprefixer: {
            options: {
               browers: ['> 0.5%', '>0.5% in DE', 'last 2 versions', 'Firefox >20', 'Opera >8', 'Chrome >29', 'ie >8']
            },
            build: {
                files: {
                    //build      :  source
                    'src/css/autoprefix.css': 'src/css/style.css'
                }
            }
        },

        //CSSmin
        cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          },
          target: {
            files: {
                 //build        : source
              'build/assets/css/style.min.css'  : 'src/css/autoprefix.css'
              }
            }
          },

        //uglify JavaScript
        uglify: {
            build: {
                files: {
                    //build                 : source
                    'build/assets/js/main.min.js': 'src/js/main.js'
                }
            }
      },


        imagemin: {                          // Task              
            build: { 
                options: {
                    optimizationLevel: 5
                },

              files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'src/img/',                   // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                dest: 'build/assets/img/'                  // buildination path prefix
              }]
            }
        },

        htmlmin: {                                     // Task
            build: {                                      // Target
              options: {                                 // Target options
                useShortDoctype: true,
                collapseWhitespace: true,
                html5: true

              },

              files: {                                   // Dictionary of files
                'build/index.php': 'src/index.php'     // 'buildination': 'source'
              }
            },
         },

        
        
    });
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['less', 'autoprefixer', 'cssmin', 'uglify', 'imagemin', 'htmlmin', 'watch' ]);
};
