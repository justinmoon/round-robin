cd common
yarn install

cd ../web
yarn
yarn build
rm -rf ../backend/rr/build
cp -r build ../backend/rr
ls ../backend/rr
cd ..

cd backend
# gcloud app deploy app.yaml
