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
