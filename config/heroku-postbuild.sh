yarn build
mv /app/packages/example/public /tmp/public
rm -rf /app/*
mv /tmp/public /app/public

