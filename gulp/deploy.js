'use strict';

import path from 'path';
import del from 'del';

const deploy = ({
  gulp,
  config,
  plugins
}) => {
  const dir = config.directory;

  // deploy
  gulp.task('deploy', () => {
    return gulp.src(path.join(dir.production, '**/*'))
      // fix #4 the "dir.production" folder being published into gh-pages branch
      .pipe(plugins.rename(file => {
        let pathPartList = file.dirname.split(path.sep);
        if (pathPartList[0] === dir.production) {
          pathPartList.shift();
          file.dirname = pathPartList.join(path.sep);
        }
      }))
      .pipe(plugins.ghPages())
      .pipe(() => {
        process.exit(0)
      });
  });
};

export default deploy;
