#!/bin/bash

cd notion-yaml
yarn
yarn start
cat fr.yaml > ../app/langs/fr.yaml
cd ..

if [[ $1 == 'translate' ]]
then
    echo "OUI"
    cd translations
    yarn
    echo -n "DEEPL API KEY: "
    read DEEPL_KEY

    if [[ -n $DEEPL_KEY ]]; then
     export DEEPL_KEY
    fi

    node index ../notion-yaml/fr.yaml en
    node index ../notion-yaml/fr.yaml de
    cd ..
fi