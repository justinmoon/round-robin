cd common 
npm install
npm run build

cd ../web
npm install
cp -r ../common node_modules/
npm run build
cp _redirects build/_redirects
cd ..
