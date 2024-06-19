const { execSync } = require("child_process");

// Publish canonical packages
[
  "@mayank1513\\/r18gs",
  "react18-global-store",
  "react18-store",
  "react19-global-store",
  "react19-store",
  "r19gs",
].forEach(pkg => {
  execSync(`sed -i -e "s/name.*/name\\": \\"${pkg}\\",/" lib/package.json`);
  execSync("cd lib && npm publish --provenance --access public");
});

// Mark deprecated
execSync(
  'npm deprecate @mayank1513/r18gs "Please use https://www.npmjs.com/package/r18gs instead. We initially created scoped packages to have similarities with the GitHub Public Repository (which requires packages to be scoped). We are no longer using GPR and thus deprecating all scoped packages for which corresponding un-scoped packages exist."',
);
