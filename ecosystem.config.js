module.exports = {
  apps: [
    {
      name: "pvclasses.in",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3006",
      cwd: "/home/pvclasses.in/PV_Classes_Website-main",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}
