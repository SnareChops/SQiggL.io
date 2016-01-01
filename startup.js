System.config({
  packages: {
    dist: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});
System.import('dist/index.js').then(null, console.error.bind(console));