cd ../common 
npm install
npm run build

cd ../web
npm install
cp -r ../common node_modules/
ls node_modules/common/

REACT_APP_BASE_URL=/api react-scripts build
cp _redirects build/_redirects"
