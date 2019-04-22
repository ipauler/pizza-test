#!/usr/bin/env bash
npx sequelize db:migrate
pm2-runtime index.js