// ecosystem.config.js
export const apps = [
  {
    name: "next-dashboard-3002",
    script: "npm",
    args: "start",
    env: {
      PORT: 3002,
      NODE_ENV: "production"
    }
  }
];
