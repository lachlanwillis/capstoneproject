rm -r -f ./build
mkdir -p ./build

cd backend
rm -r node_modules -f

cd ..

cp -r backend/* ./build

cd ./apps/rubbish
rm -r node_modules -f

npm install
npm run build


cp -r ./dist/rubbish2/* ../../build/assets

cd ../..

cp ./docker/* ./build/

cd ./build
npm install

sed -i -e 's/mongodb:\/\/localhost\/rubbish/mongodb:\/\/mongodb\/rubbish/g' ./build/src/index.ts

tsc
