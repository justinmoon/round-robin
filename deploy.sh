cd common 
npm install
npm run build

cd ../web
npm install
cp -r ../common node_modules/
echo 'listinggg'
ls node_modules/common/
npm run build
cp _redirects build/_redirects
