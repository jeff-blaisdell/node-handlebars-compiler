var argv  = require('optimist').argv,
    watch = require('watch'),
    exec  = require('child_process').exec,
    props = {
    'handlebars' : 'handlebars ${resource_loc} -f ${output_resource_path} -a true'
    };

var handlebars = function(f) {

    if (f.match(/\.handlebars$/)) {
      console.log('Processing file: ' + f);

      var output = f.replace(/\.handlebars/, '.js'),
          cmd    = props.handlebars.replace(/\$\{resource_loc\}/, f),
          cmd    = cmd.replace(/\$\{output_resource_path\}/, output),
          child  = exec(cmd);

      child.stderr.on('data', function(err) {
        console.log(['Error executing handlebars compile: ', err]);
      });
    }
};

var handlebarsFilter = function(f, stat) {

  if(stat.isDirectory()) {
    // Keep recursing.
    return false;
  } else if (f && f.match(/\.handlebars$/)) {
    // Found.  Do not filter.
    return false;
  } else {
    // Not a diretory or .handlbebars - filter it.
    return true;
  };
};

var dir = argv.watchdir
console.log(['Watching directory: ', dir]);

watch.createMonitor(dir, {'filter': handlebarsFilter},  function (monitor) {

    monitor.on('created', handlebars);

    monitor.on('changed', handlebars);

    monitor.on('removed', function (f, stat) {
      // Handle removed files
    });

 });
