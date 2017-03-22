cd common
yarn install

cd ../web
yarn
yarn build
rm -rf ../backend/rr/build
cp -r build ../backend/rr
cd ..

cd backend
PYTHONPATH=. venv/bin/pytest tests
if [ $? -eq 0 ]
then
    gcloud app deploy app.yaml
    echo "$(date) | $(git rev-parse --short HEAD)" >> deploy-history.txt
else
    echo 'Tests failed. Deployment aborted'
fi
